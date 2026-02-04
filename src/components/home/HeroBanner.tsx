import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative container h-full flex flex-col justify-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Experiencias que se sienten propias
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Diseñamos experiencias para quienes prefieren comprender antes de decidir.
            Momentos cuidados y memorables te esperan.
          </p>
          <Link to="/planes">
            <Button size="lg" className="text-lg px-8">
              Descubrir experiencias
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
