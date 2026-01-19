import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";

interface BillingData {
  address: string;
  city: string;
  phone: string;
  nit: string;
  companyName: string;
}

interface BillingFormProps {
  data: BillingData;
  onChange: (data: BillingData) => void;
}

export default function BillingForm({ data, onChange }: BillingFormProps) {
  const updateField = (field: keyof BillingData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-forest">
          <Receipt className="w-5 h-5" />
          Detalles de facturación
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={data.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Calle 123 #45-67"
              required
            />
          </div>
          <div>
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Bogotá"
              required
            />
          </div>
          <div>
            <Label htmlFor="billingPhone">Celular</Label>
            <Input
              id="billingPhone"
              type="tel"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+57 300 123 4567"
              required
            />
          </div>
          <div>
            <Label htmlFor="nit">NIT (opcional)</Label>
            <Input
              id="nit"
              value={data.nit}
              onChange={(e) => updateField("nit", e.target.value)}
              placeholder="900.123.456-7"
            />
          </div>
          <div>
            <Label htmlFor="companyName">Razón social (opcional)</Label>
            <Input
              id="companyName"
              value={data.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Nombre de la empresa"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
