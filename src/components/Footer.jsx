import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Shield } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
            {/* Top Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-sky-500 rounded-lg p-1.5">
                                <span className="text-white font-black text-xl tracking-tighter">M</span>
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter">
                                MELS
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Expertos en prevención de riesgos, gestión ambiental y cumplimiento normativo para la minería e industria.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Nosotros</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="/mision" className="hover:text-sky-400 transition-colors">Nuestra Misión</a></li>
                            <li><a href="/vision" className="hover:text-sky-400 transition-colors">Nuestra Visión</a></li>
                            <li><a href="/#quienes-somos" className="hover:text-sky-400 transition-colors">Quiénes Somos</a></li>
                            <li><a href="/#por-que-elegirnos" className="hover:text-sky-400 transition-colors">Por Qué Elegirnos</a></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Servicios</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="/#servicios" className="hover:text-sky-400 transition-colors">Certificaciones</a></li>
                            <li><a href="/#servicios" className="hover:text-sky-400 transition-colors">Seguridad y Salud</a></li>
                            <li><a href="/#servicios" className="hover:text-sky-400 transition-colors">Medio Ambiente</a></li>
                            <li><a href="/#sectores" className="hover:text-sky-400 transition-colors">Sectores</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Contacto</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-sky-500 w-5 h-5 flex-shrink-0" />
                                <span>Iquique, Región de Tarapacá, Chile</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-sky-500 w-5 h-5 flex-shrink-0" />
                                <a href="mailto:contacto@mels.cl" className="hover:text-white transition-colors">contacto@mels.cl</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-sky-500 w-5 h-5 flex-shrink-0" />
                                <a href="tel:+56912345678" className="hover:text-white transition-colors">+56 9 1234 5678</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} MELS. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-500 hover:text-sky-400 transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="text-slate-500 hover:text-sky-400 transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="text-slate-500 hover:text-sky-400 transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
