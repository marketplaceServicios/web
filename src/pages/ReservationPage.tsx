import { useState, useEffect } from "react";
import { useParams, Navigate, useSearchParams } from "react-router-dom";
import { getPlanById, createReservation } from "@/lib/api";
import type { Plan } from "@/data/mockData";
import TouristForm from "@/components/reservation/TouristForm";
import BillingForm from "@/components/reservation/BillingForm";
import ContactForm from "@/components/reservation/ContactForm";
import OrderSummary from "@/components/reservation/OrderSummary";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export default function ReservationPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get("fecha") || null;
  const selectedPrice = searchParams.get("precio") ? Number(searchParams.get("precio")) : null;

  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reservaCreada, setReservaCreada] = useState<{ codigo: string; checkoutUrl: string } | null>(null);

  const [numTourists, setNumTourists] = useState(1);
  const [tourists, setTourists] = useState([
    { name: "", birthDate: "", documentType: "", documentNumber: "" },
  ]);
  const [billing, setBilling] = useState({
    address: "",
    city: "",
    phone: "",
    nit: "",
    companyName: "",
  });
  const [contact, setContact] = useState({
    name: "",
    documentType: "",
    documentNumber: "",
    email: "",
    countryCode: "+57",
    phone: "",
    alternateContact: "",
    specialNeeds: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("credit");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    getPlanById(id)
      .then((p) => { setPlan(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-stormy text-lg">Cargando plan...</p>
      </div>
    );
  }

  if (!plan) {
    return <Navigate to="/planes" replace />;
  }

  const isFormValid =
    tourists.every(
      (t) => t.name.trim() && t.birthDate && t.documentType && t.documentNumber.trim()
    ) &&
    billing.address.trim() !== "" &&
    billing.city.trim() !== "" &&
    billing.phone.trim() !== "" &&
    contact.name.trim() !== "" &&
    contact.documentType !== "" &&
    contact.documentNumber.trim() !== "" &&
    contact.email.trim() !== "" &&
    contact.phone.trim() !== "" &&
    contact.alternateContact.trim() !== "";

  const handleAddTourist = () => {
    setNumTourists(numTourists + 1);
    setTourists([
      ...tourists,
      { name: "", birthDate: "", documentType: "", documentNumber: "" },
    ]);
  };

  const handleRemoveTourist = () => {
    if (numTourists > 1) {
      setNumTourists(numTourists - 1);
      setTourists(tourists.slice(0, -1));
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result: any = await createReservation({
        planId: plan.id,
        numPersonas: numTourists,
        turistas: tourists,
        datosFacturacion: { ...billing, ...contact, selectedDate },
        metodoPago: selectedPayment,
      });
      if (import.meta.env.DEV) {
        setReservaCreada({ codigo: result.reserva.codigo, checkoutUrl: result.checkoutUrl });
        setSubmitting(false);
      } else {
        window.location.href = result.checkoutUrl;
      }
    } catch (err: any) {
      setSubmitting(false);
      alert(err.message || "Ocurrió un error al procesar tu reserva. Por favor intenta de nuevo.");
    }
  };

  const handleSimularPago = async () => {
    if (!reservaCreada) return;
    setSubmitting(true);
    try {
      await fetch(`http://localhost:4000/api/reservas/simular-pago/${reservaCreada.codigo}`, { method: 'POST' });
      window.location.href = `/orden?codigo=${reservaCreada.codigo}`;
    } catch {
      setSubmitting(false);
      alert("Error al simular el pago");
    }
  };

  if (reservaCreada) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center py-8">
        <div className="bg-white rounded-xl border border-cream shadow-sm p-8 max-w-md w-full text-center space-y-4">
          <div className="text-4xl">🧪</div>
          <h2 className="text-xl font-bold text-primary">Reserva creada en modo desarrollo</h2>
          <p className="text-sm text-stormy">Código: <span className="font-mono font-bold">{reservaCreada.codigo}</span></p>
          <p className="text-xs text-stormy/70">¿Cómo quieres continuar?</p>
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleSimularPago}
              disabled={submitting}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              ✅ Simular pago aprobado
            </button>
            <a
              href={reservaCreada.checkoutUrl}
              className="w-full block border border-primary text-primary py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
            >
              💳 Ir al checkout de Wompi
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="container">
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">
          Tu reserva, paso a paso
        </h1>
        <p className="text-stormy mb-8">
          Confirma tu información con calma. Si algo no te queda claro, estamos para ayudarte.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tourist Count */}
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary">
                    Número de viajeros
                  </h3>
                  <p className="text-sm text-stormy">
                    Selecciona la cantidad de personas
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRemoveTourist}
                    disabled={numTourists <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-2xl font-bold text-primary w-8 text-center">
                    {numTourists}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleAddTourist}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tourist Data */}
            <TouristForm tourists={tourists} onChange={setTourists} />

            {/* Billing */}
            <BillingForm data={billing} onChange={setBilling} />

            {/* Contact */}
            <ContactForm data={contact} onChange={setContact} />
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              plan={plan}
              numTourists={numTourists}
              selectedPayment={selectedPayment}
              onPaymentChange={setSelectedPayment}
              onSubmit={handleSubmit}
              submitting={submitting}
              formValid={isFormValid}
              selectedDate={selectedDate}
              selectedPrice={selectedPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
