import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";

interface BillingData {
  titularNombre: string;
  titularDocTipo: string;
  titularDocNum: string;
  titularEmail: string;
  address: string;
  city: string;
  departamento: string;
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
        <p className="text-xs text-stormy mt-1">
          Todos los campos marcados con <span className="text-red-500 font-semibold">*</span> son obligatorios para la emisión de tu factura electrónica.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Titular de la factura */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="titularNombre">
              Nombre completo del titular <span className="text-red-500">*</span>
            </Label>
            <Input
              id="titularNombre"
              value={data.titularNombre}
              onChange={(e) => updateField("titularNombre", e.target.value)}
              placeholder="Nombre y apellido"
              required
            />
          </div>
          <div>
            <Label htmlFor="titularDocTipo">
              Tipo de documento <span className="text-red-500">*</span>
            </Label>
            <select
              id="titularDocTipo"
              value={data.titularDocTipo}
              onChange={(e) => updateField("titularDocTipo", e.target.value)}
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
            <Label htmlFor="titularDocNum">
              Número de documento <span className="text-red-500">*</span>
            </Label>
            <Input
              id="titularDocNum"
              value={data.titularDocNum}
              onChange={(e) => updateField("titularDocNum", e.target.value)}
              placeholder="1234567890"
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="titularEmail">
              Correo electrónico <span className="text-red-500">*</span>
            </Label>
            <Input
              id="titularEmail"
              type="email"
              value={data.titularEmail}
              onChange={(e) => updateField("titularEmail", e.target.value)}
              placeholder="tu@email.com"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              La factura electrónica será enviada a este correo
            </p>
          </div>
        </div>

        {/* Dirección fiscal */}
        <div className="border-t border-dashed border-gray-200 pt-4">
          <p className="text-xs text-stormy/70 mb-3 font-medium">Dirección fiscal</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="address">
                Dirección de residencia <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                value={data.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Calle 123 #45-67"
                required
              />
            </div>
            <div>
              <Label htmlFor="billingCity">
                Municipio / Ciudad <span className="text-red-500">*</span>
              </Label>
              <Input
                id="billingCity"
                value={data.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="Manizales"
                required
              />
            </div>
            <div>
              <Label htmlFor="departamento">
                Departamento <span className="text-red-500">*</span>
              </Label>
              <Input
                id="departamento"
                value={data.departamento}
                onChange={(e) => updateField("departamento", e.target.value)}
                placeholder="Caldas"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="billingPhone">
                Celular de contacto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="billingPhone"
                type="tel"
                value={data.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+57 300 123 4567"
                required
              />
            </div>
          </div>
        </div>

        {/* Facturación empresarial */}
        <div className="border-t border-dashed border-gray-200 pt-4">
          <p className="text-xs text-stormy/70 mb-3">
            ¿Facturas a nombre de una empresa? Completa los siguientes campos:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nit">NIT de la empresa</Label>
              <Input
                id="nit"
                value={data.nit}
                onChange={(e) => updateField("nit", e.target.value)}
                placeholder="900.123.456-7"
              />
            </div>
            <div>
              <Label htmlFor="companyName">Razón social</Label>
              <Input
                id="companyName"
                value={data.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                placeholder="Nombre de la empresa"
              />
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
