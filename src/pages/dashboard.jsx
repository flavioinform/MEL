import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
    Folder,
    Upload,
    FileText,
    Loader2,
    LogOut,
    Search,
    Building2,
    ChevronLeft,
    Eye,
} from "lucide-react";

const BUCKET = "documentacion-empresas";
const ROLES = { ADMIN: "administrador", NORMAL: "normal" };

function Dashboard() {
    const navigate = useNavigate();

    // Auth & Role
    const [currentUserEmpresa, setCurrentUserEmpresa] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Data
    const [carpetas, setCarpetas] = useState([]);
    const [allEmpresas, setAllEmpresas] = useState([]);
    const [files, setFiles] = useState({}); // carpetaId -> files[]

    // UI / View
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(null);
    const [message, setMessage] = useState(null);

    console.log("✅ Dashboard activo | bucket =", BUCKET);

    // Intercept Back Button
    useEffect(() => {
        // Push a state to trap the back button
        window.history.pushState(null, document.title, window.location.href);

        const handlePopState = async (event) => {
            // Prevent default back navigation momentarily
            window.history.pushState(null, document.title, window.location.href);

            const confirmExit = window.confirm("¿Quieres cerrar sesión y volver al inicio?");
            if (confirmExit) {
                await supabase.auth.signOut();
                navigate("/"); // Redirect to Home
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);

    useEffect(() => {
        checkSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedEmpresa?.id) {
            fetchFiles(selectedEmpresa.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedEmpresa?.id]);

    const checkSession = async () => {
        setLoading(true);
        setMessage(null);

        try {
            const { data: userRes, error: userErr } = await supabase.auth.getUser();
            if (userErr) throw userErr;

            const user = userRes?.user;
            if (!user) {
                navigate("/login");
                return;
            }

            // Empresa asociada al usuario logueado
            const { data: empresaData, error: e1 } = await supabase
                .from("empresas")
                .select("*")
                .eq("auth_usuario_id", user.id)
                .single();

            if (e1) throw e1;
            if (!empresaData) throw new Error("No existe empresa asociada a este usuario.");

            setCurrentUserEmpresa(empresaData);

            // ✅ CORREGIDO: enum tiene 'administrador' y 'normal'
            const adminRole = empresaData.rol === ROLES.ADMIN;
            setIsAdmin(adminRole);

            // Carpetas siempre
            await fetchCarpetas();

            if (adminRole) {
                // Admin: lista de empresas para escoger
                const { data: empresasList, error: e2 } = await supabase
                    .from("empresas")
                    .select("*")
                    .neq("id", empresaData.id);

                if (e2) throw e2;
                setAllEmpresas(empresasList || []);
                setSelectedEmpresa(null);
                setFiles({});
            } else {
                // Normal: se auto-selecciona
                setSelectedEmpresa(empresaData);
            }
        } catch (error) {
            console.error("Session Check Error:", error);
            setMessage({ type: "error", text: error?.message || "Error de sesión" });
            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    const fetchCarpetas = async () => {
        const { data, error } = await supabase
            .from("carpetas_tipo")
            .select("*")
            .eq("activo", true)
            .order("orden", { ascending: true });

        if (error) {
            console.error("fetchCarpetas error:", error);
            setMessage({ type: "error", text: error.message });
            return;
        }
        setCarpetas(data || []);
    };

    const fetchFiles = async (empresaId) => {
        const { data, error } = await supabase
            .from("documentos")
            .select("*")
            .eq("empresa_id", empresaId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("fetchFiles error:", error);
            setMessage({ type: "error", text: error.message });
            setFiles({});
            return;
        }

        const grouped = (data || []).reduce((acc, f) => {
            const k = f.carpeta_tipo_id;
            if (!acc[k]) acc[k] = [];
            acc[k].push(f);
            return acc;
        }, {});
        setFiles(grouped);
    };

    const handleFileUpload = async (e, carpetaId) => {
        const file = e.target.files?.[0];
        if (!file || !selectedEmpresa?.id) return;

        setUploading(carpetaId);
        setMessage(null);

        try {
            // Sanitize file name to avoid "Invalid Key" errors
            const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            const filePath = `${selectedEmpresa.id}/${carpetaId}/${Date.now()}_${sanitizedFileName}`;

            console.log("⬆️ Subiendo a bucket:", BUCKET, "path:", filePath);

            // 1) Storage upload
            const { data: upData, error: storageError } = await supabase.storage
                .from(BUCKET)
                .upload(filePath, file, {
                    upsert: false,
                    contentType: file.type || "application/octet-stream",
                });

            console.log("UPLOAD DATA:", upData);
            console.log("UPLOAD ERROR:", storageError);

            if (storageError) throw storageError;

            // 2) Insert metadata DB
            const { error: dbError } = await supabase.from("documentos").insert([
                {
                    empresa_id: selectedEmpresa.id,
                    carpeta_tipo_id: carpetaId,
                    nombre_archivo: file.name,
                    ruta_almacenamiento: filePath,
                    tama_bytes: file.size,
                    tipo_mime: file.type,
                },
            ]);

            if (dbError) throw dbError;

            setMessage({ type: "success", text: "Archivo subido correctamente." });
            await fetchFiles(selectedEmpresa.id);
        } catch (error) {
            console.error("Upload error FULL:", error);
            setMessage({
                type: "error",
                text: `Error: ${error?.message || "Error desconocido al subir"}`,
            });
        } finally {
            setUploading(null);
            e.target.value = null;
        }
    };

    // ✅ CORREGIDO: signed URL para bucket privado
    const handleFileView = async (filePath) => {
        try {
            const { data, error } = await supabase.storage
                .from(BUCKET)
                .createSignedUrl(filePath, 60);

            if (error) throw error;

            window.open(data.signedUrl, "_blank", "noopener,noreferrer");
        } catch (error) {
            console.error("View error:", error);
            setMessage({ type: "error", text: error?.message || "No se pudo abrir el archivo" });
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const filteredCarpetas = carpetas.filter((c) =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredEmpresas = allEmpresas.filter(
        (emp) =>
            emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (emp.rut_empresa || "").includes(searchTerm)
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sky-50">
                <Loader2 className="animate-spin text-sky-600 w-10 h-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* HEADER */}
            <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                            {isAdmin ? "Panel de Administración" : "Panel de Gestión"}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Building2 size={14} />
                            <span className="font-semibold">{currentUserEmpresa?.nombre}</span>
                            <span className="px-2 py-0.5 bg-slate-100 rounded-full text-xs font-mono">
                                {currentUserEmpresa?.rut_empresa}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors font-bold text-sm bg-slate-50 hover:bg-red-50 px-4 py-2 rounded-lg"
                    >
                        <LogOut size={18} /> Salir
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-10">
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-xl border ${message.type === "success"
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-red-50 border-red-200 text-red-700"
                            } flex items-center gap-3`}
                    >
                        <FileText size={20} />
                        <span className="font-medium">{message.text}</span>
                    </div>
                )}

                {/* ADMIN VIEW */}
                {isAdmin && !selectedEmpresa && (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-700">Empresas Registradas</h2>
                                <p className="text-slate-500">Selecciona una empresa para gestionar sus archivos.</p>
                            </div>
                            <div className="relative w-full md:w-72">
                                <input
                                    type="text"
                                    placeholder="Buscar empresa o RUT..."
                                    value={searchTerm}
                                    onChange={(ev) => setSearchTerm(ev.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEmpresas.map((emp) => (
                                <div
                                    key={emp.id}
                                    onClick={() => {
                                        setSelectedEmpresa(emp);
                                        setSearchTerm("");
                                    }}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-sky-300 cursor-pointer transition-all group"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="bg-sky-100 p-3 rounded-full text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                            <Building2 size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                                                {emp.nombre}
                                            </h3>
                                            <p className="text-xs text-slate-400 font-mono">{emp.rut_empresa}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-slate-500 border-t border-slate-100 pt-3">
                                        <span>Ver archivos</span>
                                        <ChevronLeft className="rotate-180 w-4 h-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FOLDER VIEW */}
                {selectedEmpresa && (
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div>
                                {isAdmin && (
                                    <button
                                        onClick={() => {
                                            setSelectedEmpresa(null);
                                            setFiles({});
                                        }}
                                        className="flex items-center gap-1 text-sky-500 hover:text-sky-700 font-bold text-sm mb-2"
                                    >
                                        <ChevronLeft size={16} /> Volver a lista
                                    </button>
                                )}

                                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                    <Folder className="text-sky-500" />
                                    Archivos de {selectedEmpresa.nombre}
                                </h2>
                                <p className="text-slate-500 text-sm">Gestiona la documentación por categorías.</p>
                            </div>

                            <div className="relative w-full md:w-72">
                                <input
                                    type="text"
                                    placeholder="Filtrar carpetas..."
                                    value={searchTerm}
                                    onChange={(ev) => setSearchTerm(ev.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredCarpetas.map((carpeta) => (
                                <div
                                    key={carpeta.id}
                                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
                                >
                                    <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                            <Folder size={20} className="text-sky-500" />
                                            {carpeta.nombre}
                                        </h3>

                                        <div className="relative">
                                            <input
                                                type="file"
                                                id={`upload-${carpeta.id}`}
                                                className="hidden"
                                                onChange={(ev) => handleFileUpload(ev, carpeta.id)}
                                                disabled={uploading === carpeta.id}
                                            />
                                            <label
                                                htmlFor={`upload-${carpeta.id}`}
                                                className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${uploading === carpeta.id
                                                    ? "bg-slate-200 text-slate-500"
                                                    : "bg-sky-500 text-white hover:bg-sky-600"
                                                    }`}
                                            >
                                                {uploading === carpeta.id ? (
                                                    <Loader2 className="animate-spin w-3 h-3" />
                                                ) : (
                                                    <Upload size={14} />
                                                )}
                                                {uploading === carpeta.id ? "..." : "Subir"}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="p-0 flex-1 bg-slate-50 min-h-[150px]">
                                        {files[carpeta.id]?.length ? (
                                            <ul className="divide-y divide-slate-200">
                                                {files[carpeta.id].map((file) => (
                                                    <li
                                                        key={file.id}
                                                        className="p-3 hover:bg-white transition-colors flex items-center justify-between gap-3 group"
                                                    >
                                                        <div className="flex items-center gap-3 overflow-hidden">
                                                            <div className="bg-white p-2 rounded-lg border border-slate-200 text-slate-400 group-hover:text-sky-500 transition-colors">
                                                                <FileText size={18} />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-medium text-slate-700 truncate group-hover:text-sky-600 transition-colors">
                                                                    {file.nombre_archivo}
                                                                </p>
                                                                <p className="text-xs text-slate-400">
                                                                    {new Date(file.created_at).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <button
                                                            onClick={() => handleFileView(file.ruta_almacenamiento)}
                                                            className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all"
                                                            title="Ver / Descargar"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-6">
                                                <Folder size={32} className="opacity-20 mb-2" />
                                                <p className="text-xs">Carpeta vacía</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
