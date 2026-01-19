import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface Tourist {
  name: string;
  birthDate: string;
  documentType: string;
  documentNumber: string;
}

interface TouristFormProps {
  tourists: Tourist[];
  onChange: (tourists: Tourist[]) => void;
}

export default function TouristForm({ tourists, onChange }: TouristFormProps) {
  const updateTourist = (index: number, field: keyof Tourist, value: string) => {
    const updated = [...tourists];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-forest">
          <User className="w-5 h-5" />
          Datos de los turistas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {tourists.map((tourist, index) => (
          <div key={index} className="p-4 bg-cream rounded-lg space-y-4">
            <h4 className="font-medium text-forest">Turista {index + 1}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`name-${index}`}>Nombre completo</Label>
                <Input
                  id={`name-${index}`}
                  value={tourist.name}
                  onChange={(e) => updateTourist(index, "name", e.target.value)}
                  placeholder="Nombre y apellido"
                  required
                />
              </div>
              <div>
                <Label htmlFor={`birthDate-${index}`}>Fecha de nacimiento</Label>
                <Input
                  id={`birthDate-${index}`}
                  type="date"
                  value={tourist.birthDate}
                  onChange={(e) =>
                    updateTourist(index, "birthDate", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor={`docType-${index}`}>Tipo de documento</Label>
                <select
                  id={`docType-${index}`}
                  value={tourist.documentType}
                  onChange={(e) =>
                    updateTourist(index, "documentType", e.target.value)
                  }
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="cc">Cédula de ciudadanía</option>
                  <option value="ce">Cédula de extranjería</option>
                  <option value="passport">Pasaporte</option>
                </select>
              </div>
              <div>
                <Label htmlFor={`docNumber-${index}`}>Número de documento</Label>
                <Input
                  id={`docNumber-${index}`}
                  value={tourist.documentNumber}
                  onChange={(e) =>
                    updateTourist(index, "documentNumber", e.target.value)
                  }
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
