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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Solicitud enviada! Te contactaremos pronto.");
    setFormData({ name: "", phone: "", email: "" });
  };

  return (
    <Card className="mt-8">
      <CardHeader className="bg-forest text-white rounded-t-xl">
        <CardTitle className="text-xl">¿Quieres un plan especial?</CardTitle>
        <p className="text-white/80 text-sm">
          Déjanos tus datos y te contactaremos para crear una experiencia
          personalizada.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre completo</Label>
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
          <Button type="submit" className="w-full">
            Solicitar cotización
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
