import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"

import mentorimg from "../assets/servicios/baneerr.jpg";
import mentorimg1 from "../assets/servicios/mt3.jpg";
import mentorimg2 from "../assets/servicios/mt7.svg";

const slides = [
  {
    id: 1,
    image: mentorimg,
    title: "Expertos en Seguridad y Medio Ambiente",
    subtitle: "Soluciones integrales certificadas para minería e industria.",
    cta: "Nuestros Servicios",
    link: "#servicios"
  },
  {
    id: 2,
    image: mentorimg1,
    title: "Certificación SICEP e ISO",
    subtitle: "Garantizamos el cumplimiento normativo y la excelencia de tu empresa.",
    cta: "Contáctanos",
    link: "#contacto"
  },
  {
    id: 3,
    image: mentorimg2,
    title: "Capacitación y Ley 16.744",
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
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Text Content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
                <div className="max-w-3xl space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">
                  <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg uppercase tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-2xl text-gray-200 font-medium drop-shadow-md border-l-4 border-sky-500 pl-4">
                    {slide.subtitle}
                  </p>

                  <div className="pt-4">
                    <button className="group bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-sky-500/50 flex items-center gap-2 hover:gap-3">
                      {slide.cta}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 md:left-8 border-none bg-black/30 hover:bg-sky-500 text-white" />
        <CarouselNext className="right-4 md:right-8 border-none bg-black/30 hover:bg-sky-500 text-white" />
      </Carousel>
    </div>
  );
}

export default Hero;