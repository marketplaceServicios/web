import type { Category, Plan, Testimonial } from "@/data/mockData";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

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
    rating: p._rating ?? 0,
    reviews: p._reviewCount ?? 0,
    description: p.descripcion || "",
    includes: p.incluye || [],
    amenities: p.amenidades || [],
    highlighted: p.destacado || false,
    isOffer: p.esOferta || false,
    providerName: p.proveedor?.nombreEmpresa || undefined,
    providerLogo: p.proveedor?.logo || undefined,
    datoClave: p.datoClave || undefined,
    providerPhone: p.contactoCelular || undefined,
    providerEmail: p.contactoEmail || undefined,
    cobrarIva: p.cobrarIva ?? false,
    porcentajeIva: p.porcentajeIva ?? 19,
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

// --- Experience 360 ---

export interface Experience360 {
  id: string;
  title: string;
  description: string;
  iframeSrc: string;
  thumbnail: string;
}

function mapExperience360(e: any): Experience360 {
  return {
    id: String(e.id),
    title: e.titulo,
    description: e.descripcion || "",
    iframeSrc: e.iframeSrc,
    thumbnail:
      e.thumbnail ||
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  };
}

// --- Enlaces Rápidos ---

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  openInNewTab: boolean;
}

function mapQuickLink(e: any): QuickLink {
  return {
    id: String(e.id),
    title: e.titulo,
    url: e.url,
    openInNewTab: e.abrirNuevaPestana || false,
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

export async function getQuickLinks(): Promise<QuickLink[]> {
  const data = await request<any[]>("/enlaces-rapidos?tipo=rapido");
  return data.map(mapQuickLink);
}

export async function getLegalLinks(): Promise<QuickLink[]> {
  const data = await request<any[]>("/enlaces-rapidos?tipo=legal");
  return data.map(mapQuickLink);
}

export async function getExperiencias360(): Promise<Experience360[]> {
  const data = await request<any[]>("/experiencias360");
  return data.map(mapExperience360);
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

export async function getPlanFechasLlenas(planId: string): Promise<string[]> {
  try {
    return await request<string[]>(`/planes/${planId}/fechas-llenas`);
  } catch {
    return [];
  }
}

export async function getPlanCupos(
  planId: string,
  fecha: string
): Promise<{ cupoMaximo: number | null; personasReservadas: number; cuposDisponibles: number | null }> {
  try {
    return await request(`/planes/${planId}/cupos?fecha=${fecha}`);
  } catch {
    return { cupoMaximo: null, personasReservadas: 0, cuposDisponibles: null };
  }
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

// --- Reseñas ---

export interface ReviewData {
  id: number;
  planId: number;
  nombre: string;
  email: string;
  rating: number;
  comentario: string;
  createdAt: string;
}

export interface ReviewsResponse {
  resenas: ReviewData[];
  rating: number;
  total: number;
}

export async function getReviewsForPlan(planId: string): Promise<ReviewsResponse> {
  return request(`/resenas/plan/${planId}`);
}

export async function createReview(body: {
  planId: string;
  nombre: string;
  email: string;
  rating: number;
  comentario: string;
  captchaToken?: string;
}): Promise<{ message: string }> {
  return request("/resenas", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
