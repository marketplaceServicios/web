import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-forest text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-primary">Travel</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm max-w-md">
              Tu marketplace de confianza para descubrir los mejores destinos
              turísticos de Colombia. Planes, aventuras y experiencias únicas te
              esperan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/planes"
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Planes
                </Link>
              </li>
              <li>
                <Link
                  to="/categorias"
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Categorías
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>+57 300 123 4567</span>
              </a>
              <p className="text-gray-300 text-sm">info@travel.com.co</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Travel. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="#"
              className="text-gray-400 hover:text-primary transition-colors text-sm"
            >
              Términos y condiciones
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-primary transition-colors text-sm"
            >
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
