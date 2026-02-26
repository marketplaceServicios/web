import { useState, useEffect } from "react";
import { useLocation, useSearchParams, Navigate } from "react-router-dom";
import { getReservaByCodigo } from "@/lib/api";
import OrderConfirmation from "@/components/order/OrderConfirmation";
import type { Plan } from "@/data/mockData";

interface OrderState {
  plan: Plan;
  numTourists: number;
  reservationCode: string;
  turistas?: any[];
  subtotal?: number;
  impuestos?: number;
  total?: number;
  selectedDate?: string | null;
  cobrarIva?: boolean;
  porcentajeIva?: number;
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
          description: reserva.plan?.descripcion || "",
          includes: Array.isArray(reserva.plan?.incluye) ? reserva.plan.incluye : [],
          amenities: [],
          highlighted: false,
          isOffer: false,
          providerPhone: reserva.plan?.contactoCelular || undefined,
          providerEmail: reserva.plan?.contactoEmail || undefined,
          disponibilidad: null,
        } as Plan;

        setDisplayData({
          plan: pseudoPlan,
          numTourists: reserva.numPersonas,
          reservationCode: reserva.codigo,
          turistas: Array.isArray(reserva.turistas) ? reserva.turistas : [],
          subtotal: Number(reserva.subtotal),
          impuestos: Number(reserva.impuestos),
          total: Number(reserva.total),
          selectedDate: reserva.datosFacturacion?.selectedDate || null,
          cobrarIva: reserva.datosFacturacion?.cobrarIva ?? false,
          porcentajeIva: reserva.datosFacturacion?.porcentajeIva ?? 19,
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
          turistas={displayData.turistas || []}
          subtotal={displayData.subtotal || 0}
          impuestos={displayData.impuestos || 0}
          total={displayData.total || 0}
          selectedDate={displayData.selectedDate}
          cobrarIva={displayData.cobrarIva}
          porcentajeIva={displayData.porcentajeIva}
        />
      </div>
    </div>
  );
}
