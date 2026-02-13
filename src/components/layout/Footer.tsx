import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import logoBlanco from "@/assets/logos/blanco.png";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src={logoBlanco}
                alt="Vive Silver"
                className="h-24 w-auto"
              />
            </Link>
            <p className="mt-4 text-cream/80 text-sm max-w-md font-serif">
              Turismo, viajes y bodas para personas 50+ y sus familias.
              Información clara, proveedores confiables y acompañamiento real para decidir sin afán.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-cream/70 hover:text-golden transition-colors text-sm"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/planes"
                  className="text-cream/70 hover:text-golden transition-colors text-sm"
                >
                  Experiencias
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="text-cream/70 hover:text-golden transition-colors text-sm"
                >
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-cream/70 hover:text-golden transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>Quiero hablar con un agente</span>
              </a>
              <p className="text-cream/70 text-sm">info@vivesilver.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/60 text-sm">
            © {new Date().getFullYear()} Vive Silver. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="#"
              className="text-cream/60 hover:text-golden transition-colors text-sm"
            >
              Términos y condiciones
            </Link>
            <Link
              to="#"
              className="text-cream/60 hover:text-golden transition-colors text-sm"
            >
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
