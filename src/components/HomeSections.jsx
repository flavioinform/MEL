import * as React from "react";
import { ShieldCheck, HardHat, Leaf, ArrowRight, CheckCircle, Clock, Users, Factory, Building2, GraduationCap } from "lucide-react";

function HomeSections() {
  return (
    <main className="bg-white text-slate-700 selection:bg-sky-200 selection:text-sky-900">

      {/* ---------------------- QUIÉNES SOMOS ---------------------- */}
      <section
        id="quienes-somos"
        className="relative bg-white pt-24 pb-24 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 grid gap-12 md:grid-cols-[1.4fr,1fr] items-center relative z-10">
          <div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-400 opacity-80"
                style={{ WebkitTextStroke: '1px #94a3b8' }}>
                Quiénes
              </span>
              <span className="block text-sky-500 mt-[-0.3em] relative z-10">
                Somos
              </span>
            </h2>

            <p className="mb-6 text-lg text-slate-600 leading-relaxed border-l-4 border-sky-500 pl-6">
              Somos un equipo especializado en <span className="text-sky-600 font-bold">prevención de riesgos</span>, sistemas de
              gestión e implementación de normas para empresas de la minería,
              sector industrial, PYMES y organizaciones.
            </p>
            <p className="text-slate-500 leading-relaxed pl-6">
              Acompañamos a las empresas desde el diagnóstico hasta la
              certificación, combinando experiencia en terreno, enfoque práctico y
              cumplimiento normativo real: SICEP, ISO, SGI, Resolución Sanitaria,
              Ley 16.744, RIOHS y más.
            </p>
          </div>

          {/* Card derecha con hover */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-sky-300 group">
            <h3 className="text-xl font-bold mb-6 text-slate-800 group-hover:text-sky-600 transition-colors">
              Lo que nos caracteriza
            </h3>
            <ul className="space-y-4">
              {[
                "Experiencia directa en minería e industria.",
                "Implementaciones reales, no solo en papel.",
                "Lenguaje claro para equipos de trabajo.",
                "Acompañamiento continuo post-auditoría."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                  <CheckCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------- POR QUÉ ELEGIRNOS ---------------------- */}
      <section id="por-que-elegirnos" className="relative bg-sky-50 pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-400 opacity-80"
                style={{ WebkitTextStroke: '1px #94a3b8' }}>
                Por Qué
              </span>
              <span className="block text-sky-500 mt-[-0.3em] relative z-10">
                Elegirnos
              </span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Users, title: "Experiencia en Terreno", desc: "Nuestro trabajo se basa en experiencia real en faenas mineras, plantas e industria." },
              { icon: CheckCircle, title: "Enfoque Integral", desc: "SICEP, ISO, SGI, RIOHS, SUSPEL/RESPEL, GRD y Ley 16.744 en un solo equipo." },
              { icon: Clock, title: "Acompañamiento", desc: "Te guiamos paso a paso: capacitación, mentorías y apoyo continuo." }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-b-4 border-transparent hover:border-sky-400">
                <div className="w-14 h-14 bg-sky-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-sky-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-slate-200 pl-3 group-hover:border-sky-400 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------- NUESTROS SERVICIOS (Ex-Certificaciones) ---------------------- */}
      <section id="servicios" className="relative bg-white pt-20 pb-28">
        <div className="max-w-6xl mx-auto px-4 text-center">

          {/* Header style */}
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-400 opacity-80"
                style={{ WebkitTextStroke: '1px #94a3b8' }}>
                Nuestros
              </span>
              <span className="block text-sky-500 mt-[-0.2em] relative z-10 drop-shadow-sm">
                Servicios
              </span>
            </h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-medium">
              EN MENTOR OFRECEMOS SOLUCIONES RÁPIDAS, SEGURAS Y CERTIFICADAS EN DEMOLICIÓN,
              MOVIMIENTO DE TIERRA Y ARRIENDO DE MAQUINARIAS EN TORRES Y ALREDEDORES.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 - Certificaciones */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-b-4 border-sky-400 text-left relative overflow-hidden ring-1 ring-slate-100">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck size={100} className="text-sky-500" />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-sky-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  <ShieldCheck className="w-8 h-8 text-sky-500 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-2 uppercase italic">
                  Certificaciones <br /> y Gestión
                </h3>

                <hr className="w-10 border-sky-400 my-4 opacity-50" />

                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Implementación de normas ISO 45001, SICEP y Sistemas de Gestión Integrados para el cumplimiento normativo.
                </p>

                <ul className="text-sm text-slate-600 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> SICEP & ISO</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> Auditorías</li>
                </ul>
              </div>
            </div>

            {/* Card 2 - Seguridad */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-b-4 border-sky-400 text-left relative overflow-hidden ring-1 ring-slate-100">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <HardHat size={100} className="text-sky-500" />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-sky-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  <HardHat className="w-8 h-8 text-sky-500 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-2 uppercase italic">
                  Seguridad <br /> y Salud
                </h3>

                <hr className="w-10 border-sky-400 my-4 opacity-50" />

                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Asesoría en Ley 16.744, reglamentos RIOHS y Gestión del Riesgo de Desastres para proteger a tu equipo.
                </p>

                <ul className="text-sm text-slate-600 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> Prevención</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> Protocolos</li>
                </ul>
              </div>
            </div>

            {/* Card 3 - Medio Ambiente */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-b-4 border-sky-400 text-left relative overflow-hidden ring-1 ring-slate-100">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Leaf size={100} className="text-sky-500" />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-sky-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  <Leaf className="w-8 h-8 text-sky-500 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-2 uppercase italic">
                  Medio Ambiente <br /> y Residuos
                </h3>

                <hr className="w-10 border-sky-400 my-4 opacity-50" />

                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Gestión integral de SUSPEL/RESPEL, tramitación de Resolución Sanitaria y cumplimiento ambiental.
                </p>

                <ul className="text-sm text-slate-600 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> SUSPEL/RESPEL</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> Sanitaria</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Curva inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg
            className="absolute top-0 left-0 w-full h-12"
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,24 Q360,48 720,24 T1440,24 L1440,48 L0,48 Z"
              className="fill-sky-50"
            />
          </svg>
        </div>
      </section>

      {/* ---------------------- SECTORES ---------------------- */}
      <section id="sectores" className="relative bg-sky-50 pt-20 pb-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-400 opacity-80"
                style={{ WebkitTextStroke: '1px #94a3b8' }}>
                Nuestros
              </span>
              <span className="block text-sky-500 mt-[-0.3em] relative z-10">
                Sectores
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:border-sky-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Factory className="w-12 h-12 text-slate-400 mb-6 group-hover:text-sky-500 transition-colors" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Minería e Industria</h3>
              <p className="text-slate-500 text-sm">Faenas mineras, plantas y empresas contratistas.</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:border-sky-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Building2 className="w-12 h-12 text-slate-400 mb-6 group-hover:text-sky-500 transition-colors" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">PYMES y Organizaciones</h3>
              <p className="text-slate-500 text-sm">Empresas de servicios, fundaciones y organizaciones sociales.</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:border-sky-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <GraduationCap className="w-12 h-12 text-slate-400 mb-6 group-hover:text-sky-500 transition-colors" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Educación</h3>
              <p className="text-slate-500 text-sm">Colegios y universidades en temas de Ley 16.744 y seguridad escolar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------- CTA FINAL ---------------------- */}
      <section className="bg-sky-600 py-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-2 leading-tight">
              ¿Listo para ordenar <br /> tu sistema de gestión?
            </h2>
            <p className="text-lg font-medium opacity-90 max-w-2xl text-sky-100">
              SICEP, ISO, Ley 16.744, RIOHS, GRD y más.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-stretch md:items-end w-full md:w-auto">
            <button className="px-8 py-4 rounded-xl bg-white text-sky-700 text-lg font-bold shadow-xl hover:bg-sky-50 hover:scale-105 transition-all flex items-center justify-center gap-2">
              Agendar una reunión <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-6 py-2 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition text-center">
              Escríbenos para evaluar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomeSections;
