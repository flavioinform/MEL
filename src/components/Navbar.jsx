import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { supabase } from "../lib/supabase";

function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [empresa, setEmpresa] = useState(null);

  // Detect scroll for styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auth State
  useEffect(() => {
    const fetchEmpresa = async (userId) => {
      const { data } = await supabase
        .from("empresas")
        .select("nombre, rut_empresa")
        .eq("auth_usuario_id", userId)
        .single();
      if (data) setEmpresa(data);
    };

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) fetchEmpresa(session.user.id);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        fetchEmpresa(session.user.id);
      } else {
        setEmpresa(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setEmpresa(null);
    setIsOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Empresa", href: "#quienes-somos" },
    { name: "Por qué elegirnos", href: "#por-que-elegirnos" },
    { name: "Servicios", href: "#servicios" },
    { name: "Sectores", href: "#sectores" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-slate-200 py-3"
          : "bg-white border-transparent py-5"
        }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-sky-500 rounded-lg p-1.5 group-hover:bg-sky-600 transition-colors">
            <span className="text-white font-black text-xl tracking-tighter">M</span>
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tighter group-hover:text-sky-600 transition-colors">
            MEL
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-600 font-medium hover:text-sky-500 transition-colors text-sm uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}

          {empresa ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-slate-700 leading-none">{empresa.nombre}</p>
                <p className="text-xs text-slate-400">{empresa.rut_empresa}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Cerrar Sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2.5 bg-sky-500 text-white font-bold rounded-full shadow-md hover:bg-sky-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-slate-600 hover:text-sky-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-600 font-medium hover:text-sky-500 transition-colors text-lg"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <hr className="border-slate-100" />

          {empresa ? (
            <div className="bg-slate-50 p-4 rounded-xl space-y-3">
              <div>
                <p className="font-bold text-slate-800">{empresa.nombre}</p>
                <p className="text-sm text-slate-500">{empresa.rut_empresa}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-center px-4 py-2 bg-white border border-slate-200 text-red-500 font-bold rounded-lg shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="w-full text-center px-6 py-3 bg-sky-500 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform"
              onClick={() => setIsOpen(false)}
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;