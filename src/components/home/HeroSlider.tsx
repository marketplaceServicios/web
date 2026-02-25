import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/images/hero.webp";

const SLIDE_COUNT = 2;
const AUTO_ADVANCE_MS = 7000;

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval>>();

  // Auto-advance timer — pauses while video is playing
  useEffect(() => {
    if (isVideoPlaying) {
      clearInterval(autoAdvanceRef.current);
      return;
    }

    autoAdvanceRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(autoAdvanceRef.current);
  }, [isVideoPlaying, activeSlide]);

  // Pause video when navigating away from its slide
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeSlide !== 1) {
      video.pause();
      setIsVideoPlaying(false);
    }
  }, [activeSlide]);

  // Pause auto-advance when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(autoAdvanceRef.current);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const toggleVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
    } else {
      video.play();
    }
  }, [isVideoPlaying]);

  return (
    <section
      className="relative h-[520px] md:h-[600px] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Hero principal"
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {/* Slide 1: Image Banner */}
        <div className="relative w-full h-full flex-shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative container h-full flex flex-col justify-center px-4 md:px-6">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight">
                Turismo, viajes y bodas Silver con calma, cuidado y confianza.
              </h1>
              <p className="text-base md:text-xl text-white/90 mb-6">
                Explora experiencias pensadas para personas 50+ y sus familias.
                Informaci&oacute;n clara, proveedores confiables y acompa&ntilde;amiento real
                para decidir sin af&aacute;n.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link to="/planes">
                  <Button size="lg" className="text-lg px-8">
                    Explorar planes
                  </Button>
                </Link>
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white/20"
                  >
                    Hablar con un asesor
                  </Button>
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-white/70 text-sm">
                  Resolvemos dudas por WhatsApp o llamada.
                </p>
                <p className="text-white/70 text-sm">
                  Te contamos con honestidad accesos, distancias y exigencia f&iacute;sica.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Video */}
        <div className="relative w-full h-full flex-shrink-0">
          <video
            ref={videoRef}
            src="/assets/hero-video.mp4"
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onEnded={() => {
              setIsVideoPlaying(false);
              setActiveSlide(0);
            }}
          />

          {!isVideoPlaying && <div className="absolute inset-0 bg-black/30" />}

          <div className="relative h-full flex items-center justify-center px-4">
            <button
              onClick={toggleVideo}
              className={`rounded-full p-5 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-golden focus:ring-offset-2 ${
                isVideoPlaying
                  ? "bg-white/20 backdrop-blur-sm hover:bg-white/40"
                  : "bg-white/90 backdrop-blur-sm hover:scale-110"
              }`}
              aria-label={isVideoPlaying ? "Pausar video" : "Reproducir video"}
            >
              {isVideoPlaying ? (
                <Pause className="w-8 h-8 text-white/70" />
              ) : (
                <Play className="w-8 h-8 text-primary ml-1" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Ir al slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-golden focus:ring-offset-2 ${
              activeSlide === index
                ? "w-8 h-3 bg-golden"
                : "w-3 h-3 bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {!isVideoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
          <div
            className="h-full bg-golden animate-slide-progress"
            key={`${activeSlide}-${isVideoPlaying}`}
          />
        </div>
      )}
    </section>
  );
}
