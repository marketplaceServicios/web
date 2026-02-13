import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Solicitud enviada! Te contactaremos en las próximas 24–48 horas.");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

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
          <Button type="submit" className="w-full">
            Solicitar cotización
          </Button>
          <p className="text-xs text-stormy text-center">
            Responderemos máximo en 24–48 horas. Si prefieres, podemos llamarte.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
