import { Link } from "react-router-dom";
import { Plan } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Users, MapPin, Copy } from "lucide-react";
import { useState } from "react";

interface OrderConfirmationProps {
  plan: Plan;
  numTourists: number;
  reservationCode: string;
}

export default function OrderConfirmation({
  plan,
  numTourists,
  reservationCode,
}: OrderConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(reservationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Message */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage/20 mb-6">
          <CheckCircle className="w-12 h-12 text-sage" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">¡Reserva recibida!</h1>
        <p className="text-stormy text-lg">
          Gracias por confiar en Vive Silver.
        </p>
        <p className="text-stormy/70 mt-2">
          En las próximas 24–48 horas confirmaremos disponibilidad y te contactaremos para afinar detalles.
        </p>
      </div>

      {/* Reservation Card */}
      <Card className="overflow-hidden mb-8">
        {/* Image */}
        <div className="relative h-48">
          <img
            src={plan.image}
            alt={plan.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block bg-sage text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">
              {plan.category}
            </span>
            <h2 className="text-xl font-serif font-bold text-white">{plan.title}</h2>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-golden" />
              <span className="text-gray-700">{plan.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-golden" />
              <span className="text-gray-700">
                {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-golden" />
              <span className="text-gray-700">{numTourists} adulto(s)</span>
            </div>
          </div>

          {/* Reservation Code */}
          <div className="bg-cream rounded-lg p-4">
            <p className="text-sm text-stormy mb-1">Código de reserva</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary tracking-wider">
                {reservationCode}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyCode}
                className="text-golden"
              >
                <Copy className="w-4 h-4 mr-1" />
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-4">
        <Link to="/planes">
          <Button size="lg" className="px-8">
            Volver a planes
          </Button>
        </Link>
        <p className="text-stormy text-sm">
          ¿Prefieres hablar ahora?{" "}
          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden font-medium hover:underline"
          >
            Escríbenos por WhatsApp.
          </a>
        </p>
      </div>
    </div>
  );
}
