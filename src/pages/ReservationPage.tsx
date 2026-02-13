import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getPlanById } from "@/data/mockData";
import TouristForm from "@/components/reservation/TouristForm";
import BillingForm from "@/components/reservation/BillingForm";
import ContactForm from "@/components/reservation/ContactForm";
import OrderSummary from "@/components/reservation/OrderSummary";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export default function ReservationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const plan = id ? getPlanById(id) : undefined;

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
    email: "",
    countryCode: "+57",
    phone: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("credit");

  if (!plan) {
    return <Navigate to="/planes" replace />;
  }

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

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    // For now, just navigate to the order confirmation page
    navigate("/orden", {
      state: {
        plan,
        numTourists,
        reservationCode: `TRV-${Date.now().toString(36).toUpperCase()}`,
      },
    });
  };

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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
