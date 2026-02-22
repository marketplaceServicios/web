import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/images/hero.webp";

export default function HeroBanner() {
  return (
    <section className="relative h-[520px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative container h-full flex flex-col justify-center px-4 md:px-6">
        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight">
            Turismo, viajes y bodas Silver con calma, cuidado y confianza.
          </h1>
          <p className="text-base md:text-xl text-white/90 mb-6">
            Explora experiencias pensadas para personas 50+ y sus familias.
            Información clara, proveedores confiables y acompañamiento real
            para decidir sin afán.
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
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white/20">
                Hablar con un asesor
              </Button>
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-white/70 text-sm">
              Resolvemos dudas por WhatsApp o llamada.
            </p>
            <p className="text-white/70 text-sm">
              Te contamos con honestidad accesos, distancias y exigencia física.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
