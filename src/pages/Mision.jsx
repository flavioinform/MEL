import React from 'react';
import { Target, Shield, CheckCircle } from 'lucide-react';

function Mision() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section - Light Corporate */}
            <div className="relative pt-32 pb-20 bg-slate-50 overflow-hidden">
                <div className="absolute inset-0 bg-white/50" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[100px] -mr-32 -mt-32" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-2 text-slate-900">
                            <span className="block text-2xl md:text-3xl font-light text-slate-400 tracking-[0.3em] mb-2 font-sans">
                                NUESTRA
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-blue-800 drop-shadow-sm">
                                MISIÓN
                            </span>
                        </h1>
                        <div className="h-1.5 w-24 bg-sky-500 mx-auto mt-6 rounded-full" />
                    </div>
                    <p className="mt-8 text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Transformamos la industria a través de la seguridad, la calidad y el compromiso ambiental.
                    </p>
                </div>
            </div>

            {/* Main Content - Organic Flow */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Text Content */}
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
                                Soluciones integrales para la <span className="text-sky-600 block">Industria Minera y Privada</span>
                            </h2>

                            <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-sky-500 pl-6">
                                Proporcionamos soluciones en Prevención de Riesgos, Calidad y Medio Ambiente, garantizando el cumplimiento normativo y la seguridad operacional de nuestros clientes.
                            </p>

                            <div className="space-y-6 pt-4">
                                <div className="flex items-start gap-4 group">
                                    <div className="bg-sky-50 p-3 rounded-xl group-hover:bg-sky-500 transition-colors duration-300">
                                        <Shield className="w-6 h-6 text-sky-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg">Protección Total</h3>
                                        <p className="text-slate-500 text-sm mt-1">
                                            Promovemos una cultura de seguridad que protege a las personas ante todo.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="bg-sky-50 p-3 rounded-xl group-hover:bg-sky-500 transition-colors duration-300">
                                        <CheckCircle className="w-6 h-6 text-sky-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg">Excelencia Técnica</h3>
                                        <p className="text-slate-500 text-sm mt-1">
                                            Implementamos estándares ISO y SICEP con rigor y enfoque práctico.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual/Image Area (Abstract Representation) */}
                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 bg-slate-100 rounded-[2rem] p-8 md:p-12 rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-sky-500 rounded-full opacity-20 blur-2xl" />
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-2xl" />

                                <Target className="w-20 h-20 text-sky-500 mb-6" />
                                <h3 className="text-2xl font-black text-slate-800 mb-4">
                                    Objetivo Claro
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    "Ser el aliado estratégico que permite a las empresas operar con tranquilidad, sabiendo que su gestión de riesgos y normativa está en manos expertas."
                                </p>
                                <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-200 rounded-full -z-10 animate-[spin_60s_linear_infinite]" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-slate-100 rounded-full -z-10 animate-[spin_40s_linear_infinite_reverse]" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Mision;
