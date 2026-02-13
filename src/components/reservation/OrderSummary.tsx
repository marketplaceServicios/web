import { Plan, paymentMethods } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Calendar } from "lucide-react";

interface OrderSummaryProps {
  plan: Plan;
  numTourists: number;
  selectedPayment: string;
  onPaymentChange: (method: string) => void;
  onSubmit: () => void;
}

export default function OrderSummary({
  plan,
  numTourists,
  selectedPayment,
  onPaymentChange,
  onSubmit,
}: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const subtotal = plan.price * numTourists;
  const tax = subtotal * 0.19;
  const total = subtotal + tax;

  return (
    <Card className="sticky top-24">
      <CardHeader className="bg-primary text-white rounded-t-xl">
        <CardTitle className="font-serif">Resumen de tu reserva</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Plan Info */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-golden flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">{plan.title}</p>
              <p className="text-sm text-stormy">{plan.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-golden" />
            <span className="text-gray-700">{numTourists} adulto(s)</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-golden" />
            <span className="text-gray-700">{formatDate(plan.startDate)}</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-stormy">
              {formatPrice(plan.price)} x {numTourists} adulto(s)
            </span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stormy">Impuestos (19%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>TOTAL</span>
            <span className="text-golden">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-t pt-4">
          <p className="font-medium text-primary mb-3">Método de pago</p>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedPayment === method.id
                    ? "border-golden bg-golden/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={(e) => onPaymentChange(e.target.value)}
                  className="w-4 h-4 text-golden focus:ring-golden"
                />
                <span className="text-sm">{method.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full" size="lg" onClick={onSubmit}>
          Confirmar y continuar
        </Button>

        <p className="text-xs text-stormy text-center">
          Tu información está protegida. Solo la usamos para gestionar tu reserva.
        </p>
      </CardContent>
    </Card>
  );
}
