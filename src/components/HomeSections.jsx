import * as React from "react";
import { ArrowRight, Building2, CheckCircle, Clock, Factory, GraduationCap, HardHat, Leaf, ShieldCheck, Users, Heart, Award, FileText, MapPin, Mail, Send } from 'lucide-react';

function HomeSections() {
  return (
    <main className="font-sans text-slate-600">

      {/* ---------------------- 1. QUIÉNES SOMOS (Clean White) ---------------------- */}
      <section id="quienes-somos" className="bg-white py-24 relative overflow-hidden">
        {/* Soft Background Blob */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-sky-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-sm block mb-3">
              Nuestra Esencia
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tight">
              Quiénes <span className="text-sky-500">Somos</span>
            </h2>
            <div className="h-1.5 w-24 bg-sky-200 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-lg leading-relaxed">
              <h3 className="text-2xl font-bold text-slate-700">
                Líderes en Seguridad y Gestión Industrial.
              </h3>
              <p className="font-light text-slate-600">
                Somos un equipo multidisciplinario experto en <span className="font-semibold text-sky-600">Prevención de Riesgos</span> y cumplimiento normativo.
                Entendemos la minería y la industria desde adentro, transformando la burocracia en procesos ágiles y seguros.
              </p>
              <p className="italic text-slate-400 border-l-4 border-sky-200 pl-4 py-2 bg-sky-50/30">
                "Convertimos el cumplimiento legal en su mayor ventaja competitiva."
              </p>
            </div>

            {/* Card "Valor Diferencial" - Soft & Professional */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-sky-100 border border-sky-50 relative group hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-[80px] -mr-px -mt-px transition-colors group-hover:bg-sky-100" />

              <h4 className="text-xl font-black text-slate-800 mb-8 relative z-10 flex items-center gap-3">
                <Award className="w-6 h-6 text-sky-500" />
                Valor Diferencial
              </h4>

              <ul className="space-y-4 relative z-10">
                {[
                  "Experiencia real en faenas mineras.",
                  "Consultoría técnica, no solo administrativa.",
                  "Respuesta rápida ante fiscalizaciones.",
                  "Acompañamiento hasta la certificación."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <div className="mt-1 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                    <span className="font-medium text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------- 2. POR QUÉ ELEGIRNOS (Soft Blue Background) ---------------------- */}
      <section id="por-que-elegirnos" className="bg-sky-50/50 py-24 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-sm block mb-3">
              Ventajas Competitivas
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 uppercase">
              Por Qué <span className="text-sky-600">Elegirnos</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Equipo Senior", desc: "Profesionales con años de terreno en la gran minería." },
              { icon: Clock, title: "Agilidad", desc: "Tiempos de respuesta optimizados para no detener su operación." },
              { icon: ShieldCheck, title: "Garantía Total", desc: "Acompañamiento hasta obtener su resolución o certificado." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-10 shadow-lg shadow-sky-100/50 hover:shadow-sky-200 transition-all duration-300 border border-white hover:border-sky-200 group text-center">
                <div className="w-16 h-16 mx-auto bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:rotate-6 transition-all duration-300">
                  <item.icon className="w-8 h-8 text-sky-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------- 3. SERVICIOS (White with Blue Accents) ---------------------- */}
      <section id="servicios" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-sm block mb-3">
            Nuestras Soluciones
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 uppercase mb-4">
            Catálogo de <span className="text-sky-600">Servicios</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-16 font-light text-lg">
            Excelencia técnica al servicio de su cumplimiento normativo.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck, title: "Certificaciones", sub: "Normativa",
                desc: "Implementación ISO 9001/45001/14001 y calificación SICEP al 100%."
              },
              {
                icon: HardHat, title: "Seguridad - Ley 16.744", sub: "Prevención",
                desc: "Matrices IPER, protocolos MINSAL (RIOHS, PREXOR) y Reglamentos Internos."
              },
              {
                icon: Leaf, title: "Medio Ambiente", sub: "Sustentabilidad",
                desc: "Declaraciones SUSPEL/RESPEL (Ventanilla Única) y Resoluciones Sanitarias."
              }
            ].map((service, idx) => (
              <div key={idx} className="group relative bg-white border border-slate-100 rounded-[2rem] p-8 hover:border-sky-200 transition-colors shadow-lg shadow-slate-100 hover:shadow-sky-100 overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full opacity-50 group-hover:bg-sky-100 transition-colors" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-sky-600" />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-wider mb-4 border border-sky-100">
                    {service.sub}
                  </span>

                  <h3 className="text-2xl font-black text-slate-800 mb-4 leading-tight group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  {/* 'Ver Detalles' button removed as requested */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------- 4. CONTACTO (Corrected Form Style) ---------------------- */}
      <section id="contacto" className="bg-sky-50 py-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 text-center uppercase mb-12">
            Contáctanos
          </h2>

          <div className="flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white">

            {/* Left Side: Blue Info Card */}
            <div className="md:w-5/12 bg-sky-600 p-10 text-white flex flex-col justify-center relative overflown-hidden">
              {/* Decorative circle */}
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-sky-500 rounded-full opacity-50 blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase mb-8 tracking-wide border-b-4 border-sky-400 inline-block pb-2">
                  Información Oficial
                </h3>

                <div className="space-y-8">
                  {/* Zona de Operaciones removed as requested */}

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-sky-200 uppercase block mb-1">Email Corporativo</span>
                      <a href="mailto:mentorgestiones@gmail.com" className="font-medium text-lg hover:text-sky-100 transition-colors">mentorgestiones@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-sky-700/50 rounded-2xl border border-sky-500/30">
                  <p className="italic text-sky-100 text-sm">
                    "La prevención no es un juego de azar, es un compromiso con la vida y la eficiencia."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: White Form */}
            <div className="md:w-7/12 bg-white p-10 md:p-14">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre Completo</label>
                    <input type="text" placeholder="Tu nombre" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all text-slate-700 placeholder:text-slate-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</label>
                    <input type="email" placeholder="tu@email.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all text-slate-700 placeholder:text-slate-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tu Mensaje</label>
                  <textarea rows="4" placeholder="Cuéntanos cómo podemos ayudarte..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all text-slate-700 placeholder:text-slate-300 resize-none"></textarea>
                </div>

                <button type="button" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                  <Send className="w-5 h-5" /> Enviar Mensaje
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------- 5. SECTORES (Light Grey/Blue) ---------------------- */}
      <section className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-400 uppercase tracking-tight mb-12">
            Cobertura <span className="text-sky-500">Multisectorial</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Factory, label: "Minería & Plantas" },
              { icon: Users, label: "Contratistas" },
              { icon: Building2, label: "PYMES Industriales" },
              { icon: GraduationCap, label: "Instituciones" }
            ].map((sector, idx) => (
              <div key={idx} className="group bg-white px-8 py-5 rounded-xl border border-slate-200 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-100 transition-all flex items-center gap-4 cursor-default">
                <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-sky-50 transition-colors">
                  <sector.icon className="w-6 h-6 text-slate-400 group-hover:text-sky-500" />
                </div>
                <span className="text-slate-600 font-bold uppercase text-sm group-hover:text-slate-800">{sector.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

export default HomeSections;
