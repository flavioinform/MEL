import * as React from "react";
import sicepImg from "../assets/servicios/sicep.png";
import isoImg from "../assets/servicios/iso.png";
import carpetasImg from "../assets/servicios/carpetas.png";
import sgiImg from "../assets/servicios/sgi.png";
import sanitariaImg from "../assets/servicios/sanitaria.png";
import suspelImg from "../assets/servicios/suspel.png";
import capImg from "../assets/servicios/cap.png";
import grdImg from "../assets/servicios/grd.png";
import riohsImg from "../assets/servicios/riohs.png";
// import mentorImg from "../assets/servicios/mentor.png";
// import egresadosImg from "../assets/servicios/egresados.png";
import leyImg from "../assets/servicios/ley.png";
// import colegiosImg from "../assets/servicios/colegios.png";
// import seguroImg from "../assets/servicios/seguro.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const servicios = [
  { img: sicepImg, label: "Certificación SICEP" },
  { img: isoImg, label: "Implementación ISO" },
  { img: carpetasImg, label: "Carpetas minería" },
  { img: sgiImg, label: "SGI para empresas" },
  { img: sanitariaImg, label: "Resolución sanitaria" },
  { img: suspelImg, label: "SUSPEL / RESPEL" },
  { img: capImg, label: "Capacitaciones" },
  { img: grdImg, label: "Gestión GRD" },
  { img: riohsImg, label: "Reglamentos RIOHS" },


  { img: leyImg, label: " Intorduccion a Ley 16.744" },


];

function Hero2() {
  return (
    <section className="w-full bg-sky-50 py-16 flex flex-col items-center overflow-hidden">
      <div className="mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
          <span className="block text-transparent bg-clip-text bg-black from-slate-200 to-slate-400 opacity-80"
            style={{ WebkitTextStroke: '1px #0a0a0aff' }}>
            Nuestras
          </span>
          <span className="block text-sky-500 mt-[-0.3em] relative z-10 drop-shadow-sm">
            Certificaciones
          </span>
        </h2>
      </div>

      <div className="w-full max-w-6xl flex items-center px-4">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">

          <CarouselContent className="-ml-4 pb-4">
            {servicios.map((s, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6"
              >
                <div className="flex flex-col items-center gap-4 group cursor-pointer">

                  {/* BURBUJA */}
                  <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-slate-100 group-hover:border-sky-400 group-hover:bg-sky-500 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                    <img
                      src={s.img}
                      alt={s.label}
                      className="h-16 w-16 object-contain opacity-80 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                    />
                  </div>

                  {/* TEXTO */}
                  <span className="text-sm font-bold text-slate-600 text-center uppercase tracking-wide group-hover:text-sky-600 transition-colors">
                    {s.label}
                  </span>

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex border-slate-200 text-slate-400 hover:text-sky-500 hover:border-sky-400" />
          <CarouselNext className="hidden sm:flex border-slate-200 text-slate-400 hover:text-sky-500 hover:border-sky-400" />
        </Carousel>
      </div>
    </section>
  );
}

export default Hero2;
