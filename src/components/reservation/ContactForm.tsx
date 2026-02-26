import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

interface ContactData {
  name: string;
  documentType: string;
  documentNumber: string;
  email: string;
  countryCode: string;
  phone: string;
  alternateContact: string;
  specialNeeds: string;
}

interface ContactFormProps {
  data: ContactData;
  onChange: (data: ContactData) => void;
}

export default function ContactForm({ data, onChange }: ContactFormProps) {
  const updateField = (field: keyof ContactData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-forest">
          <Mail className="w-5 h-5" />
          Información de contacto
        </CardTitle>
        <p className="text-xs text-stormy mt-1">
          Todos los campos marcados con <span className="text-red-500 font-semibold">*</span> son obligatorios.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Nombre */}
        <div>
          <Label htmlFor="contactName">
            Nombre completo de quien reserva <span className="text-red-500">*</span>
          </Label>
          <Input
            id="contactName"
            value={data.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Nombre y apellido"
            required
          />
        </div>

        {/* Identificación */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactDocType">
              Tipo de identificación <span className="text-red-500">*</span>
            </Label>
            <select
              id="contactDocType"
              value={data.documentType}
              onChange={(e) => updateField("documentType", e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Seleccionar</option>
              <option value="cc">Cédula de ciudadanía</option>
              <option value="ce">Cédula de extranjería</option>
              <option value="passport">Pasaporte</option>
              <option value="ti">Tarjeta de identidad</option>
            </select>
          </div>
          <div>
            <Label htmlFor="contactDocNumber">
              Número de identificación <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactDocNumber"
              value={data.documentNumber}
              onChange={(e) => updateField("documentNumber", e.target.value)}
              placeholder="1234567890"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">
            Correo electrónico <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="tu@email.com"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Recibirás la confirmación de tu reserva en este correo
          </p>
        </div>

        {/* Teléfono */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="countryCode">
              Código país <span className="text-red-500">*</span>
            </Label>
            <select
              id="countryCode"
              value={data.countryCode}
              onChange={(e) => updateField("countryCode", e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="+57">+57 (CO)</option>
              <option value="+1">+1 (US)</option>
              <option value="+52">+52 (MX)</option>
              <option value="+34">+34 (ES)</option>
              <option value="+54">+54 (AR)</option>
              <option value="+56">+56 (CL)</option>
              <option value="+51">+51 (PE)</option>
            </select>
          </div>
          <div className="col-span-2">
            <Label htmlFor="contactPhone">
              Número de celular <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactPhone"
              type="tel"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="300 123 4567"
              required
            />
          </div>
        </div>

        {/* Contacto alterno — obligatorio */}
        <div>
          <Label htmlFor="alternateContact">
            Contacto alterno — familiar o cuidador <span className="text-red-500">*</span>
          </Label>
          <Input
            id="alternateContact"
            value={data.alternateContact}
            onChange={(e) => updateField("alternateContact", e.target.value)}
            placeholder="Nombre y teléfono de contacto alterno"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Nombre y número de celular de un familiar o cuidador a quien podamos contactar
          </p>
        </div>

        {/* Necesidades especiales — opcional */}
        <div>
          <Label htmlFor="specialNeeds">¿Tienes alguna necesidad especial? (movilidad, alimentación, horarios) — opcional</Label>
          <textarea
            id="specialNeeds"
            value={data.specialNeeds}
            onChange={(e) => updateField("specialNeeds", e.target.value)}
            placeholder="Cuéntanos si necesitas algo especial para tu experiencia..."
            className="flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <p className="text-xs text-stormy">
          Tu información está protegida. Solo la usamos para gestionar tu reserva.
        </p>
      </CardContent>
    </Card>
  );
}
