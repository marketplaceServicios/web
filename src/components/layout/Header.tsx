import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoHorizontal from "@/assets/logos/horizontal-azul.png";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/planes", label: "Planes" },
  { href: "/categorias", label: "Categorías" },
  { href: "/contacto", label: "Contáctanos" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-20 md:h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoHorizontal}
              alt="Vive Silver"
              className="h-14 md:h-24 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-base font-medium transition-all duration-200 px-4 py-2 rounded-full ${
                  location.pathname === link.href
                    ? "text-white bg-primary"
                    : "text-gray-700 hover:text-primary hover:bg-primary/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Busca una experiencia o destino…"
                    className="w-64"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="px-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Busca una experiencia o destino…"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Mobile Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 text-base font-medium transition-all duration-200 rounded-lg ${
                    location.pathname === link.href
                      ? "text-white bg-primary"
                      : "text-gray-700 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
