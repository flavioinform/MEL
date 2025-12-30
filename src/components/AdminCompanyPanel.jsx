import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { generatePassword, copyToClipboard } from '../utils/passwordGenerator';
import { validateRut, formatRut } from '../utils/rutValidation';
import {
    Building2,
    Plus,
    Trash2,
    RefreshCw,
    Copy,
    Check,
    Loader2,
    Search,
    AlertCircle,
    Key,
    Users,
    Shield,
    ArrowLeft,
} from 'lucide-react';

const TABS = {
    CREATE: 'create',
    MANAGE: 'manage',
};

function AdminCompanyPanel() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(TABS.CREATE);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [empresas, setEmpresas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedPassword, setCopiedPassword] = useState(false);

    // Form state para crear empresa
    const [formData, setFormData] = useState({
        nombre: '',
        rut: '',
        email: '',
        password: generatePassword(8),
    });

    // Estado para confirmación de eliminación
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        if (activeTab === TABS.MANAGE) {
            fetchEmpresas();
        }
    }, [activeTab]);

    const fetchEmpresas = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('empresas')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setEmpresas(data || []);
        } catch (error) {
            console.error('Error fetching empresas:', error);
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Auto-format RUT while typing
        if (name === 'rut') {
            setFormData((prev) => ({ ...prev, [name]: formatRut(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleGeneratePassword = () => {
        const newPassword = generatePassword(8);
        setFormData((prev) => ({ ...prev, password: newPassword }));
        setCopiedPassword(false);
    };

    const handleCopyPassword = async () => {
        const success = await copyToClipboard(formData.password);
        if (success) {
            setCopiedPassword(true);
            setTimeout(() => setCopiedPassword(false), 2000);
        }
    };

    const handleCreateCompany = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Validaciones
            if (!formData.nombre.trim()) {
                throw new Error('El nombre de la empresa es requerido');
            }
            if (!validateRut(formData.rut)) {
                throw new Error('RUT inválido');
            }
            if (!formData.email.includes('@')) {
                throw new Error('Email inválido');
            }

            // 1. Crear usuario en Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        empresa_nombre: formData.nombre,
                        empresa_rut: formData.rut,
                    },
                },
            });

            if (authError) throw authError;

            if (!authData.user) {
                throw new Error('No se pudo crear el usuario');
            }

            // 2. Crear registro en tabla empresas
            const { error: empresaError } = await supabase.from('empresas').insert([
                {
                    auth_usuario_id: authData.user.id,
                    nombre: formData.nombre.trim(),
                    rut_empresa: formData.rut,
                    email_contacto: formData.email, // ✅ Guardar email de contacto
                    rol: 'normal', // Por defecto es usuario normal
                },
            ]);

            if (empresaError) {
                // Si falla la creación de la empresa, intentar eliminar el usuario creado
                console.error('Error creando empresa, limpiando usuario...', empresaError);
                throw empresaError;
            }

            setMessage({
                type: 'success',
                text: `✅ Empresa "${formData.nombre}" creada exitosamente. Asegúrate de copiar la contraseña antes de continuar.`,
            });

            // Limpiar formulario pero mantener la contraseña visible
            setFormData({
                nombre: '',
                rut: '',
                email: '',
                password: formData.password, // Mantener para que puedan copiarla
            });

            // Refrescar lista si estamos en la pestaña de gestión
            if (activeTab === TABS.MANAGE) {
                fetchEmpresas();
            }
        } catch (error) {
            console.error('Error creating company:', error);
            setMessage({
                type: 'error',
                text: error.message || 'Error al crear la empresa',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (empresa) => {
        const newPassword = generatePassword(8);

        // Copiar la contraseña primero
        await copyToClipboard(newPassword);

        const confirmReset = window.confirm(
            `¿Estás seguro de resetear la contraseña para "${empresa.nombre}"?\n\nNueva contraseña (copiada): ${newPassword}`
        );

        if (!confirmReset) return;

        setLoading(true);
        setMessage(null);

        try {
            const { data, error } = await supabase.functions.invoke('reset-company-password', {
                body: {
                    user_id: empresa.auth_usuario_id,
                    new_password: newPassword
                }
            });

            if (error) throw error;

            if (!data.success) {
                throw new Error(data.error || 'Error al resetear contraseña');
            }

            setMessage({
                type: 'success',
                text: `✅ Contraseña actualizada correctamente para "${empresa.nombre}".`,
            });
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage({
                type: 'error',
                text: 'Error al resetear contraseña: ' + (error.message || 'Error desconocido'),
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCompany = async (empresa) => {
        if (empresa.rol === 'administrador') {
            setMessage({
                type: 'error',
                text: '⚠️ No se puede eliminar una cuenta de administrador',
            });
            return;
        }

        setDeleteConfirm(empresa);
    };

    const confirmDelete = async () => {
        if (!deleteConfirm) return;

        setLoading(true);
        setMessage(null);

        try {
            const { data, error } = await supabase.functions.invoke('delete-company-user', {
                body: {
                    user_id: deleteConfirm.auth_usuario_id,
                    empresa_id: deleteConfirm.id
                }
            });

            if (error) throw error;

            if (!data.success) {
                throw new Error(data.error || 'Error al eliminar empresa');
            }

            setMessage({
                type: 'success',
                text: `✅ Empresa "${deleteConfirm.nombre}" eliminada correctamente`,
            });

            fetchEmpresas();
        } catch (error) {
            console.error('Error deleting company:', error);
            setMessage({
                type: 'error',
                text: 'Error al eliminar empresa: ' + (error.message || 'Error desconocido'),
            });
        } finally {
            setLoading(false);
            setDeleteConfirm(null);
        }
    };

    const filteredEmpresas = empresas.filter(
        (emp) =>
            emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (emp.rut_empresa || '').includes(searchTerm)
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-bold mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Volver al Dashboard
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-sky-500 p-3 rounded-xl">
                            <Shield className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-800">
                                Gestión de Empresas
                            </h1>
                            <p className="text-slate-500">
                                Crear, administrar y eliminar cuentas de empresas
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab(TABS.CREATE)}
                        className={`px-6 py-3 font-bold transition-all flex items-center gap-2 ${activeTab === TABS.CREATE
                            ? 'text-sky-600 border-b-2 border-sky-600'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <Plus size={18} />
                        Crear Empresa
                    </button>
                    <button
                        onClick={() => setActiveTab(TABS.MANAGE)}
                        className={`px-6 py-3 font-bold transition-all flex items-center gap-2 ${activeTab === TABS.MANAGE
                            ? 'text-sky-600 border-b-2 border-sky-600'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <Users size={18} />
                        Gestionar Empresas
                    </button>
                </div>

                {/* Messages */}
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${message.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-red-50 border-red-200 text-red-700'
                            }`}
                    >
                        <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{message.text}</span>
                    </div>
                )}

                {/* Tab Content */}
                {activeTab === TABS.CREATE && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Building2 className="text-sky-500" />
                            Nueva Empresa
                        </h2>

                        <form onSubmit={handleCreateCompany} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Nombre de la Empresa *
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    placeholder="Ej: Empresa Demo S.A."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    RUT de la Empresa *
                                </label>
                                <input
                                    type="text"
                                    name="rut"
                                    value={formData.rut}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    placeholder="12.345.678-9"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Email del Usuario *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    placeholder="usuario@empresa.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Contraseña Generada
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={formData.password}
                                        readOnly
                                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 font-mono text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleGeneratePassword}
                                        className="px-4 py-3 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
                                        title="Generar nueva contraseña"
                                    >
                                        <RefreshCw size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCopyPassword}
                                        className={`px-4 py-3 rounded-lg transition-colors ${copiedPassword
                                            ? 'bg-green-500 text-white'
                                            : 'bg-sky-500 hover:bg-sky-600 text-white'
                                            }`}
                                        title="Copiar contraseña"
                                    >
                                        {copiedPassword ? <Check size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    ⚠️ Asegúrate de copiar esta contraseña antes de crear la empresa
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        Creando...
                                    </>
                                ) : (
                                    <>
                                        <Plus size={18} />
                                        Crear Empresa
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === TABS.MANAGE && (
                    <div className="space-y-6">
                        {/* Search */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre o RUT..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            </div>
                        </div>

                        {/* Companies List */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            {loading ? (
                                <div className="p-12 flex justify-center">
                                    <Loader2 className="animate-spin text-sky-500" size={32} />
                                </div>
                            ) : filteredEmpresas.length === 0 ? (
                                <div className="p-12 text-center text-slate-500">
                                    <Building2 className="mx-auto mb-4 opacity-20" size={48} />
                                    <p>No se encontraron empresas</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                                                    Empresa
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                                                    RUT
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                                                    Rol
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                                                    Fecha Creación
                                                </th>
                                                <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {filteredEmpresas.map((empresa) => (
                                                <tr key={empresa.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-sky-100 p-2 rounded-lg">
                                                                <Building2 className="text-sky-600" size={18} />
                                                            </div>
                                                            <span className="font-semibold text-slate-800">
                                                                {empresa.nombre}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 font-mono text-sm">
                                                        {empresa.rut_empresa}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-bold ${empresa.rol === 'administrador'
                                                                ? 'bg-purple-100 text-purple-700'
                                                                : 'bg-slate-100 text-slate-700'
                                                                }`}
                                                        >
                                                            {empresa.rol}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 text-sm">
                                                        {new Date(empresa.created_at).toLocaleDateString('es-CL')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleResetPassword(empresa)}
                                                                className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                                                                title="Resetear contraseña"
                                                                disabled={loading}
                                                            >
                                                                <Key size={18} />
                                                            </button>
                                                            {empresa.rol !== 'administrador' && (
                                                                <button
                                                                    onClick={() => handleDeleteCompany(empresa)}
                                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Eliminar empresa"
                                                                    disabled={loading}
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-100 p-3 rounded-full">
                                <AlertCircle className="text-red-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Confirmar Eliminación</h3>
                        </div>

                        <p className="text-slate-600 mb-6">
                            ¿Estás seguro de que deseas eliminar la empresa{' '}
                            <strong>"{deleteConfirm.nombre}"</strong>?
                            <br />
                            <br />
                            Esta acción eliminará:
                        </p>

                        <ul className="list-disc list-inside text-sm text-slate-600 mb-6 space-y-1">
                            <li>El usuario de autenticación</li>
                            <li>Todos los documentos en la base de datos</li>
                            <li>Todos los archivos en el storage</li>
                        </ul>

                        <p className="text-red-600 font-bold text-sm mb-6">
                            ⚠️ Esta acción es IRREVERSIBLE
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition-colors"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        Eliminando...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={18} />
                                        Eliminar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminCompanyPanel;
