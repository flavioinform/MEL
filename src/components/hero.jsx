import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"

import mentorimg from "../assets/imagenes/1.svg";
import mentorimg1 from "../assets/servicios/mt3.jpg"; // Using the requested image
import mentorimg2 from "../assets/servicios/baneerr.jpg";
import logoMels from "../assets/imagenes/logomels.png";

const slides = [
  {
    id: 1,
    image: mentorimg,
    topText: "Expertos en",
    bottomText: "Seguridad y Medio Ambiente",
    subtitle: "Soluciones integrales certificadas para minería e industria.",
    cta: "Nuestros Servicios",
    link: "#servicios"
  },
  {
    id: 2,
    image: mentorimg1,
    topText: "Certificación",
    bottomText: "SICEP e ISO",
    subtitle: "Garantizamos el cumplimiento normativo y la excelencia de tu empresa.",
    cta: "Contáctanos",
    link: "#contacto"
  },
  {
    id: 3,
    image: mentorimg2,
    topText: "Capacitación y",
    bottomText: "Ley 16.744",
    subtitle: "Formación continua y prevención para la seguridad de tu equipo.",
    cta: "Ver Más",
    link: "#quienes-somos"
  }
];

function Hero() {
  return (
    <div className="w-full relative">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative h-[600px] md:h-[700px] w-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.bottomText}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay - Darker for better text contrast with new style */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
              </div>

              {/* Logo Overlay */}
              <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20">
                <img
                  src={logoMels}
                  alt="Logo MELS"
                  className="w-28 md:w-44 h-auto drop-shadow-2xl"
                />
              </div>

              {/* Text Content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
                <div className="max-w-4xl space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">

                  {/* Professional 'Light + Bold' Typography Style */}
                  <div className="space-y-2">
                    <span className="block text-xl md:text-3xl font-light text-sky-400 tracking-[0.15em] uppercase font-sans border-b border-sky-500/30 pb-2 w-fit">
                      {slide.topText}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl uppercase tracking-tight">
                      {slide.bottomText}
                    </h1>
                  </div>

                  <p className="text-lg md:text-2xl text-slate-200 font-medium drop-shadow-md pl-1 max-w-2xl leading-relaxed opacity-90">
                    {slide.subtitle}
                  </p>

                  <div className="pt-8">
                    <button className="group bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl shadow-sky-500/20 flex items-center gap-3 hover:translate-x-2 border border-sky-400/50">
                      {slide.cta}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 md:left-8 border-none bg-white/10 hover:bg-sky-500 text-white backdrop-blur-sm" />
        <CarouselNext className="right-4 md:right-8 border-none bg-white/10 hover:bg-sky-500 text-white backdrop-blur-sm" />
      </Carousel>
    </div>
  );
}

export default Hero;