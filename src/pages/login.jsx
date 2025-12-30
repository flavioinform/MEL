import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Login exitoso
      navigate("/dashboard"); // Redirigir a dashboard
    } catch (err) {
      setError("Credenciales incorrectas o error en el servidor.");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Bienvenido</h1>
            <p className="text-slate-500">Ingresa a tu cuenta para gestionar tus servicios</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition bg-slate-50 text-slate-800 placeholder-slate-400 pr-10"
                  required
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

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-sky-500 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-sky-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-sky-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {cargando && <Loader2 className="animate-spin w-5 h-5" />}
              {cargando ? "Iniciando..." : "Ingresar"}
            </button>

            {/* <div className="text-center pt-4">
              <span className="text-slate-500 text-sm font-medium">¿No tienes cuenta? </span>
              <Link to="/register" className="text-sky-600 font-bold hover:underline hover:text-sky-700 text-sm transition">
                Regístrate aquí
              </Link>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
