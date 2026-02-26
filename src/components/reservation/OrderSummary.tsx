import { Plan, paymentMethods } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, CalendarCheck, AlertCircle } from "lucide-react";

interface OrderSummaryProps {
  plan: Plan;
  numTourists: number;
  selectedPayment: string;
  onPaymentChange: (method: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
  formValid?: boolean;
  selectedPrice?: number | null;
  selectedDate?: string | null;
}

export default function OrderSummary({
  plan,
  numTourists,
  selectedPayment,
  onPaymentChange,
  onSubmit,
  submitting = false,
  formValid = false,
  selectedPrice,
  selectedDate,
}: OrderSummaryProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${iso}T12:00:00Z`));

  const cobrarIva = plan.cobrarIva ?? false;
  const porcentajeIva = plan.porcentajeIva ?? 19;
  const unitPrice = selectedPrice ?? plan.price;
  const subtotal = unitPrice * numTourists;
  const tax = cobrarIva ? subtotal * (porcentajeIva / 100) : 0;
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
          {selectedDate && (
            <div className="flex items-start gap-3">
              <CalendarCheck className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-sage uppercase tracking-wide leading-none mb-0.5">
                  Fecha reservada
                </p>
                <span className="text-gray-700 capitalize text-sm">
                  {formatDate(selectedDate)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-stormy">
              {formatPrice(unitPrice)} x {numTourists} adulto(s)
            </span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {cobrarIva && (
            <div className="flex justify-between text-sm">
              <span className="text-stormy">IVA ({porcentajeIva}%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
          )}
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
        <Button
          className="w-full"
          size="lg"
          onClick={onSubmit}
          disabled={submitting || !formValid}
        >
          {submitting ? "Procesando..." : "Confirmar y continuar"}
        </Button>

        {!formValid && (
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-snug">
              Completa todos los campos obligatorios del formulario para activar este botón.
            </p>
          </div>
        )}

        <p className="text-xs text-stormy text-center">
          Tu información está protegida. Solo la usamos para gestionar tu reserva.
        </p>
      </CardContent>
    </Card>
  );
}
