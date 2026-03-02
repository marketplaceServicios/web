import { useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/data/mockData";

interface PriceCalendarProps {
  price: number;
  disponibilidad?: Plan["disponibilidad"];
  selectedDate?: string | null;
  onDateSelect?: (isoDate: string, price: number) => void;
  fechasLlenas?: string[];
  cuposInfo?: {
    cupoMaximo: number | null;
    personasReservadas: number;
    cuposDisponibles: number | null;
  } | null;
}

type DayStatus = "available" | "special" | "unavailable" | "past";

export default function PriceCalendar({ price, disponibilidad, selectedDate, onDateSelect, fechasLlenas = [], cuposInfo }: PriceCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(p);

  const formatShort = (p: number) => `$${p.toLocaleString("es-CO")}`;

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getDaysInMonth = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), 1).getDay();

  // Determine status + price for a given day number in currentDate's month
  const getDayInfo = (day: number): { status: DayStatus; price: number } => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    if (date <= today) return { status: "past", price };

    const isoDay = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (fechasLlenas.includes(isoDay)) return { status: "unavailable", price };

    if (!disponibilidad || disponibilidad.tipo === "siempre") {
      const dow = date.getDay();
      const isWeekend = dow === 0 || dow === 6;
      if (isWeekend && disponibilidad?.precioFinDeSemana != null) {
        return { status: "special", price: disponibilidad.precioFinDeSemana };
      }
      return { status: "available", price };
    }

    if (disponibilidad.tipo === "dias_semana") {
      const dow = date.getDay();
      if ((disponibilidad.diasSemana || []).includes(dow)) {
        return { status: "available", price };
      }
      return { status: "unavailable", price };
    }

    if (disponibilidad.tipo === "fechas_especificas") {
      const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const match = (disponibilidad.fechasEspeciales || []).find(
        (f) => f.fecha === iso
      );
      if (match) return { status: match.precio !== price ? "special" : "available", price: match.precio };
      return { status: "unavailable", price };
    }

    return { status: "unavailable", price };
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDay(currentDate);

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const isPrevDisabled = () => {
    const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return prev < thisMonth;
  };

  const toIso = (day: number) => {
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleDayClick = (day: number) => {
    const { status, price: dayPrice } = getDayInfo(day);
    if (status !== "available" && status !== "special") return;
    onDateSelect?.(toIso(day), dayPrice);
  };

  const cellStyle: Record<DayStatus, string> = {
    available: "bg-sage/15 text-sage cursor-pointer hover:bg-sage/25",
    special: "bg-golden/15 text-amber-700 cursor-pointer hover:bg-golden/25",
    unavailable: "bg-gray-50 text-gray-300",
    past: "text-gray-200",
  };

  const hasSpecialPricing =
    disponibilidad?.tipo === "siempre" && disponibilidad?.precioFinDeSemana != null;
  const isFechas = disponibilidad?.tipo === "fechas_especificas";
  const isDias = disponibilidad?.tipo === "dias_semana";

  return (
    <div className="bg-white rounded-xl p-6 border">
      <h2 className="text-xl font-semibold text-primary mb-1">Fechas disponibles y precios</h2>
      <p className="text-sm text-stormy mb-4">
        {isFechas
          ? "Este plan opera solo en las fechas marcadas."
          : isDias
          ? `Este plan opera los días: ${(disponibilidad?.diasSemana || [])
              .map((d) => dayNames[d])
              .join(", ")}.`
          : "Este plan está disponible todos los días."}
      </p>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={prevMonth} disabled={isPrevDisabled()}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <span className="font-semibold text-lg">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const { status, price: dayPrice } = getDayInfo(day);
          const iso = toIso(day);
          const isSelected = selectedDate === iso;
          const isClickable = status === "available" || status === "special";
          return (
            <div
              key={idx}
              onClick={() => isClickable && handleDayClick(day)}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs transition-all
                ${isSelected
                  ? "bg-primary text-white ring-2 ring-primary ring-offset-1 shadow-md scale-105"
                  : cellStyle[status]}
                ${isClickable ? "cursor-pointer" : ""}
              `}
            >
              <span className="font-semibold text-sm leading-none">{day}</span>
              {(status === "available" || status === "special") && (
                <span className={`text-[9px] mt-0.5 leading-none ${isSelected ? "opacity-90" : "opacity-70"}`}>
                  {formatShort(dayPrice)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-sage/20 border border-sage/30" />
          <span>Disponible · {formatPrice(price)}</span>
        </div>
        {(hasSpecialPricing || isFechas) && (
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-golden/20 border border-golden/30" />
            <span>
              {hasSpecialPricing
                ? `Fin de semana · ${formatPrice(disponibilidad!.precioFinDeSemana!)}`
                : "Precio especial"}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />
          <span>No disponible</span>
        </div>
      </div>

      {/* Cupos disponibles */}
      {selectedDate && cuposInfo?.cupoMaximo && (
        <div
          className={`mt-4 flex items-center gap-2 px-3 py-2 rounded-lg text-sm
            ${cuposInfo.cuposDisponibles === 0
              ? "bg-red-50 text-red-700"
              : cuposInfo.cuposDisponibles !== null && cuposInfo.cuposDisponibles <= 3
              ? "bg-amber-50 text-amber-700"
              : "bg-sage/10 text-sage"
            }`}
        >
          <Users className="w-4 h-4 flex-shrink-0" />
          {cuposInfo.cuposDisponibles === 0
            ? "Sin cupos disponibles para esta fecha"
            : cuposInfo.cuposDisponibles !== null
            ? `${cuposInfo.cuposDisponibles} cupo${cuposInfo.cuposDisponibles !== 1 ? "s" : ""} disponible${cuposInfo.cuposDisponibles !== 1 ? "s" : ""} para esta fecha`
            : `${cuposInfo.personasReservadas} persona${cuposInfo.personasReservadas !== 1 ? "s" : ""} reservada${cuposInfo.personasReservadas !== 1 ? "s" : ""}`
          }
        </div>
      )}
    </div>
  );
}
