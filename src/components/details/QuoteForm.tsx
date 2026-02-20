import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createCotizacion } from "@/lib/api";

interface Props {
  planId: string;
  planTitle: string;
}

export default function QuoteForm({ planId, planTitle }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createCotizacion({
        planId,
        nombre: formData.name,
        email: formData.email,
        telefono: formData.phone,
        mensaje: formData.message,
      });
      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch {
      setError("No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="mt-8">
        <CardContent className="p-8 text-center">
          <p className="text-2xl mb-2">✓</p>
          <h3 className="text-xl font-serif font-semibold text-primary mb-2">
            ¡Solicitud enviada!
          </h3>
          <p className="text-stormy text-sm">
            Recibimos tu solicitud para <strong>{planTitle}</strong>. Te respondemos máximo en 24–48 horas.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSuccess(false)}
          >
            Enviar otra solicitud
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader className="bg-forest text-white rounded-t-xl">
        <CardTitle className="text-xl">¿Quieres ajustar este plan a tus necesidades?</CardTitle>
        <p className="text-white/80 text-sm">
          Cuéntanos qué te gustaría cambiar (ritmo, accesibilidad, alimentación,
          acompañamiento o fecha). Te respondemos con opciones claras.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombres y apellidos</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Tu nombre completo"
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
            <Label htmlFor="message">¿Qué te gustaría ajustar?</Label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Cuéntanos sobre ritmo, accesibilidad, alimentación, fechas..."
              className="flex min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Enviando..." : "Solicitar cotización"}
          </Button>
          <p className="text-xs text-stormy text-center">
            Responderemos máximo en 24–48 horas. Si prefieres, podemos llamarte.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
