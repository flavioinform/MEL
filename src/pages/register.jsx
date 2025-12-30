import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { validateRut, formatRut } from "../utils/rutValidation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-format RUT while typing
    if (name === "rut") {
      setFormData(prev => ({ ...prev, [name]: formatRut(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { nombre, rut, email, password } = formData;

    // 1. Validar RUT (Módulo 11)
    if (!validateRut(rut)) {
      setError("El RUT ingresado no es válido.");
      setLoading(false);
      return;
    }

    try {
      // 2. Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData?.user) {
        // 3. Insertar datos en la tabla 'empresas'
        const { error: dbError } = await supabase
          .from("empresas")
          .insert([
            {
              auth_usuario_id: authData.user.id,
              rut_empresa: rut,
              nombre: nombre,
              email_contacto: email,
            },
          ]);

        if (dbError) {
          // Si falla la DB, podríamos querer borrar el usuario de Auth para evitar inconsistencias,
          // pero por ahora solo mostramos el error.
          throw new Error("Error al guardar datos de la empresa: " + dbError.message);
        }

        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(err.message || "Ocurrió un error en el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Crea tu cuenta</h1>
            <p className="text-slate-500">Registra tu empresa para acceder a los servicios</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NOMBRE EMPRESA */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej. Minera Escondida Ltda."
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition bg-slate-50 text-slate-800 placeholder-slate-400"
                required
              />
            </div>

            {/* RUT */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                RUT Empresa
              </label>
              <input
                type="text"
                name="rut"
                placeholder="12.345.678-9"
                value={formData.rut}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition bg-slate-50 text-slate-800 placeholder-slate-400"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                placeholder="contacto@empresa.cl"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition bg-slate-50 text-slate-800 placeholder-slate-400"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition bg-slate-50 text-slate-800 placeholder-slate-400 pr-10"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* MENSAJES DE ESTADO */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-green-700 text-sm font-medium animate-in fade-in slide-in-from-top-1 text-center">
                ¡Registro exitoso! Redirigiendo...
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-sky-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-sky-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin w-5 h-5" />}
              {loading ? "Registrando..." : "Crear Cuenta"}
            </button>

            <div className="text-center pt-4">
              <span className="text-slate-500 text-sm font-medium">¿Ya tienes cuenta? </span>
              <Link to="/login" className="text-sky-600 font-bold hover:underline hover:text-sky-700 text-sm transition">
                Inicia sesión aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
