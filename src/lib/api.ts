import type { Category, Plan, Testimonial } from "@/data/mockData";

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
    slug: c.slug || "",
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
    disponibilidad: p.disponibilidad || null,
  };
}

function mapTestimonial(t: any): Testimonial {
  return {
    id: String(t.id),
    name: t.nombre,
    text: t.texto,
    rating: t.rating,
    avatar: t.foto || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    city: t.ciudad || undefined,
  };
}

// --- Types ---

export interface PaginatedPlans {
  data: Plan[];
  total: number;
  page: number;
  totalPages: number;
}

export interface PlansFilterParams {
  page?: number;
  limit?: number;
  categoriaId?: string;
  q?: string;
  precioMin?: number;
  precioMax?: number;
  destacado?: boolean;
  esOferta?: boolean;
}

// --- API functions ---

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await request<any[]>("/testimonios");
  return data.map(mapTestimonial);
}

export async function getCategories(): Promise<Category[]> {
  const data = await request<any[]>("/categorias");
  return data.filter((c) => c.activo).map(mapCategory);
}

export async function getPlans(params: PlansFilterParams = {}): Promise<PaginatedPlans> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.categoriaId) qs.set("categoriaId", params.categoriaId);
  if (params.q) qs.set("q", params.q);
  if (params.precioMin) qs.set("precioMin", String(params.precioMin));
  if (params.precioMax) qs.set("precioMax", String(params.precioMax));
  if (params.destacado) qs.set("destacado", "true");
  if (params.esOferta) qs.set("esOferta", "true");

  const queryString = qs.toString();
  const data = await request<any>(`/planes${queryString ? `?${queryString}` : ""}`);
  return {
    data: data.data.map(mapPlan),
    total: data.total,
    page: data.page,
    totalPages: data.totalPages,
  };
}

export async function getFeaturedPlans(): Promise<Plan[]> {
  const data = await request<any>("/planes?destacado=true");
  return data.data.map(mapPlan);
}

export async function getOfferPlans(): Promise<Plan[]> {
  const data = await request<any>("/planes?esOferta=true");
  return data.data.map(mapPlan);
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
}): Promise<{ reserva: any; checkoutUrl: string }> {
  return request("/reservas", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function getReservaByCodigo(codigo: string): Promise<any> {
  return request(`/reservas/codigo/${codigo}`);
}

export async function createContacto(body: {
  nombre: string;
  email: string;
  celular: string;
  mensaje: string;
  preferenciaContacto?: string;
}): Promise<void> {
  await request("/contacto", {
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
