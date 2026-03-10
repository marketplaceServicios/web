import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import logoBlanco from "@/assets/logos/blanco.png";
import { getQuickLinks, getLegalLinks, type QuickLink } from "@/lib/api";

const fallbackQuickLinks: QuickLink[] = [
  { id: "1", title: "Inicio", url: "/", openInNewTab: false },
  { id: "2", title: "Experiencias", url: "/planes", openInNewTab: false },
  { id: "3", title: "Contáctanos", url: "/contacto", openInNewTab: false },
];

const fallbackLegalLinks: QuickLink[] = [
  { id: "l1", title: "Términos y condiciones", url: "#", openInNewTab: false },
  { id: "l2", title: "Política de privacidad", url: "#", openInNewTab: false },
];

function FooterLink({ link }: { link: QuickLink }) {
  if (link.openInNewTab) {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cream/70 hover:text-golden transition-colors text-sm"
      >
        {link.title}
      </a>
    );
  }
  return (
    <Link
      to={link.url}
      className="text-cream/70 hover:text-golden transition-colors text-sm"
    >
      {link.title}
    </Link>
  );
}

export default function Footer() {
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>(fallbackQuickLinks);
  const [legalLinks, setLegalLinks] = useState<QuickLink[]>(fallbackLegalLinks);

  useEffect(() => {
    getQuickLinks()
      .then((links) => {
        if (links.length > 0) setQuickLinks(links);
      })
      .catch(() => {});
    getLegalLinks()
      .then((links) => {
        if (links.length > 0) setLegalLinks(links);
      })
      .catch(() => {});
  }, []);

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
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/573116606105"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-cream/70 hover:text-golden transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>Quiero hablar con un agente</span>
              </a>
              <a
                href="mailto:info@vivesilver.com"
                className="text-cream/70 hover:text-golden transition-colors text-sm"
              >
                info@vivesilver.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/60 text-sm">
            © {new Date().getFullYear()} Vive Silver. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <FooterLink key={link.id} link={{ ...link, openInNewTab: link.openInNewTab }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
