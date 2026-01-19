import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

interface ContactData {
  email: string;
  countryCode: string;
  phone: string;
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
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="countryCode">Código país</Label>
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
            <Label htmlFor="contactPhone">Número de celular</Label>
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
      </CardContent>
    </Card>
  );
}
