import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, CheckCircle } from "lucide-react";
import { createContacto } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    phoneAlt: "",
    email: "",
    message: "",
    contactPreference: "whatsapp",
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError("");
    try {
      await createContacto({
        nombre: formData.name,
        email: formData.email,
        celular: formData.phone,
        celularAdicional: formData.phoneAlt || undefined,
        mensaje: formData.message,
        preferenciaContacto: formData.contactPreference,
      });
      setEnviado(true);
      setFormData({ name: "", phone: "", phoneAlt: "", email: "", message: "", contactPreference: "whatsapp" });
    } catch {
      setError("No pudimos enviar tu mensaje. Por favor intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="relative container h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Hablemos con calma
            </h1>
            <p className="text-lg text-cream/90 max-w-2xl mx-auto">
              Si tienes dudas, quieres una recomendación o necesitas ajustar un
              plan, escríbenos. También podemos llamarte.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-cream">
        <div className="container max-w-2xl">
          <Card>
            <CardContent className="p-8">
              {enviado && (
                <div className="flex items-center gap-3 p-4 mb-6 bg-sage/10 border border-sage/30 rounded-lg text-sage">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">¡Mensaje enviado! Te contactaremos en máximo 48 horas hábiles.</p>
                </div>
              )}
              {error && (
                <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Celular</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+57 300 123 4567"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phoneAlt">Teléfono de contacto adicional <span className="text-gray-400 font-normal">(opcional)</span></Label>
                  <Input
                    id="phoneAlt"
                    type="tel"
                    value={formData.phoneAlt}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneAlt: e.target.value })
                    }
                    placeholder="+57 310 987 6543"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    className="flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <Label>¿Prefieres contacto por?</Label>
                  <div className="flex gap-4 mt-2">
                    {[
                      { value: "whatsapp", label: "WhatsApp" },
                      { value: "llamada", label: "Llamada" },
                      { value: "email", label: "Email" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                          formData.contactPreference === option.value
                            ? "border-golden bg-golden/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactPreference"
                          value={option.value}
                          checked={formData.contactPreference === option.value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contactPreference: e.target.value,
                            })
                          }
                          className="w-4 h-4 text-golden focus:ring-golden"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={enviando}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {enviando ? "Enviando..." : "Enviar mensaje"}
                </Button>

                <p className="text-xs text-stormy text-center">
                  Tiempo de respuesta estimado: máx. 48 horas hábiles.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
