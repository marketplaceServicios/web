import type { Category, Plan } from "@/data/mockData";

const BASE_URL = "http://localhost:4000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en la solicitud");
  return data as T;
}

// --- Mappers ---

function mapCategory(c: any): Category {
  return {
    id: String(c.id),
    name: c.nombre,
    image: c.imagen || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    description: c.descripcion || "",
  };
}

function mapPlan(p: any): Plan {
  const today = new Date().toISOString().split("T")[0];
  return {
    id: String(p.id),
    title: p.titulo,
    location: p.ubicacion || "",
    category: p.categoria?.nombre || "",
    categoryId: String(p.categoriaId),
    price: Number(p.precio),
    originalPrice: p.precioOriginal ? Number(p.precioOriginal) : undefined,
    duration: p.duracion || "",
    startDate: p.fechaInicio ? p.fechaInicio.split("T")[0] : today,
    endDate: p.fechaFin ? p.fechaFin.split("T")[0] : today,
    image: (p.imagenes || [])[0] || "",
    images: p.imagenes || [],
    rating: 5.0,
    reviews: 0,
    description: p.descripcion || "",
    includes: p.incluye || [],
    amenities: p.amenidades || [],
    highlighted: p.destacado || false,
    isOffer: p.esOferta || false,
    datoClave: p.datoClave || undefined,
  };
}

// --- API functions ---

export async function getCategories(): Promise<Category[]> {
  const data = await request<any[]>("/categorias");
  return data.filter((c) => c.activo).map(mapCategory);
}

export async function getPlans(): Promise<Plan[]> {
  const data = await request<any[]>("/planes");
  return data.map(mapPlan);
}

export async function getFeaturedPlans(): Promise<Plan[]> {
  const data = await request<any[]>("/planes?destacado=true");
  return data.map(mapPlan);
}

export async function getOfferPlans(): Promise<Plan[]> {
  const data = await request<any[]>("/planes?esOferta=true");
  return data.map(mapPlan);
}

export async function getPlanById(id: string): Promise<Plan | null> {
  try {
    const data = await request<any>(`/planes/${id}`);
    return mapPlan(data);
  } catch {
    return null;
  }
}

export async function createReservation(body: {
  planId: string;
  numPersonas: number;
  turistas: any[];
  datosFacturacion: any;
  metodoPago: string;
}) {
  return request("/reservas", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function createCotizacion(body: {
  planId: string;
  nombre: string;
  email: string;
  telefono?: string;
  mensaje?: string;
  numPersonas?: number;
}) {
  return request("/cotizaciones", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
