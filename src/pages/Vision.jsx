import React from 'react';
import { Eye, TrendingUp, Award } from 'lucide-react';

function Vision() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section - Light Corporate */}
            <div className="relative pt-32 pb-20 bg-sky-50 overflow-hidden">
                <div className="absolute inset-0 bg-white/40" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[100px] opacity-60 -mr-32 -mt-32" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-2 text-slate-900">
                            <span className="block text-2xl md:text-3xl font-light text-sky-600 tracking-[0.3em] mb-2 font-sans">
                                NUESTRA
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-sky-500 to-sky-700 drop-shadow-sm">
                                VISIÓN
                            </span>
                        </h1>
                        <div className="h-1.5 w-24 bg-sky-400 mx-auto mt-6 rounded-full" />
                    </div>
                    <p className="mt-8 text-xl text-sky-900/70 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Liderar la transformación de la seguridad industrial en el norte de Chile.
                    </p>
                </div>
            </div>

            {/* Main Content - Organic Flow */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">

                        {/* Text Content */}
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
                                Ser el socio estratégico líder en <span className="text-sky-600 block">Gestión HSEQ</span>
                            </h2>

                            <p className="text-lg text-slate-600 leading-relaxed">
                                Aspiramos a ser reconocidos en la zona norte de Chile, destacando por nuestra capacidad de transformar el cumplimiento normativo en una ventaja competitiva real para nuestros clientes.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="bg-slate-50 p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-100 group">
                                    <TrendingUp className="w-8 h-8 text-sky-500 mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-slate-800 mb-2">Crecimiento</h3>
                                    <p className="text-sm text-slate-500">Impulsar el desarrollo sostenible de la industria regional.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-100 group">
                                    <Award className="w-8 h-8 text-sky-500 mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-slate-800 mb-2">Calidad</h3>
                                    <p className="text-sm text-slate-500">Estándares de clase mundial en cada proyecto.</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual/Image Area */}
                        <div className="lg:w-1/2 relative">
                            {/* Abstract Eye Icon */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-sky-200 rounded-[3rem] rotate-6 group-hover:rotate-3 transition-transform duration-500" />
                                <div className="relative bg-white border border-slate-100 rounded-[3rem] p-12 shadow-xl hover:-translate-y-2 transition-transform duration-500">
                                    <Eye className="w-24 h-24 text-sky-600 mb-8 mx-auto" strokeWidth={1.5} />

                                    <blockquote className="text-center">
                                        <p className="text-2xl font-serif italic text-slate-700 leading-relaxed mb-6">
                                            "Construimos un futuro donde la seguridad y la productividad avanzan de la mano."
                                        </p>
                                        <footer className="text-sky-500 font-bold tracking-widest text-sm uppercase">
                                            - Equipo MELS
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Vision;
