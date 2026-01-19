import { useLocation, Navigate } from "react-router-dom";
import OrderConfirmation from "@/components/order/OrderConfirmation";
import { Plan } from "@/data/mockData";

interface OrderState {
  plan: Plan;
  numTourists: number;
  reservationCode: string;
}

export default function OrderPage() {
  const location = useLocation();
  const state = location.state as OrderState | null;

  // If no state, redirect to home
  if (!state || !state.plan) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="container">
        <OrderConfirmation
          plan={state.plan}
          numTourists={state.numTourists}
          reservationCode={state.reservationCode}
        />
      </div>
    </div>
  );
}
