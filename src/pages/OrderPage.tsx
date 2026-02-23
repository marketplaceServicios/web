import { useState, useEffect } from "react";
import { useLocation, useSearchParams, Navigate } from "react-router-dom";
import { getReservaByCodigo } from "@/lib/api";
import OrderConfirmation from "@/components/order/OrderConfirmation";
import type { Plan } from "@/data/mockData";

interface OrderState {
  plan: Plan;
  numTourists: number;
  reservationCode: string;
}

export default function OrderPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const codigoParam = searchParams.get("codigo");

  const [displayData, setDisplayData] = useState<OrderState | null>(
    (location.state as OrderState) || null
  );
  const [loading, setLoading] = useState(!!codigoParam && !location.state);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!codigoParam || location.state) return;

    getReservaByCodigo(codigoParam)
      .then((reserva) => {
        const pseudoPlan = {
          id: String(reserva.planId),
          title: reserva.plan?.titulo || "",
          location: reserva.plan?.ubicacion || "",
          category: reserva.plan?.categoria?.nombre || "",
          image: (reserva.plan?.imagenes || [])[0] || "",
          images: reserva.plan?.imagenes || [],
          price: Number(reserva.subtotal) / reserva.numPersonas,
          duration: reserva.plan?.duracion || "",
          startDate: "",
          endDate: "",
          rating: 5,
          reviews: 0,
          description: "",
          includes: [],
          amenities: [],
          highlighted: false,
          isOffer: false,
          disponibilidad: null,
        } as Plan;

        setDisplayData({
          plan: pseudoPlan,
          numTourists: reserva.numPersonas,
          reservationCode: reserva.codigo,
        });
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [codigoParam]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-stormy text-lg">Verificando tu reserva...</p>
      </div>
    );
  }

  if (notFound || (!displayData && !codigoParam)) {
    return <Navigate to="/" replace />;
  }

  if (!displayData) return null;

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="container">
        <OrderConfirmation
          plan={displayData.plan}
          numTourists={displayData.numTourists}
          reservationCode={displayData.reservationCode}
        />
      </div>
    </div>
  );
}
