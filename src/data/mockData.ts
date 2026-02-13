export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Plan {
  id: string;
  title: string;
  location: string;
  category: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  duration: string;
  startDate: string;
  endDate: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  includes: string[];
  amenities: string[];
  highlighted?: boolean;
  isOffer?: boolean;
  datoClave?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  text: string;
  rating: number;
  city?: string;
}

export const categories: Category[] = [
  {
    id: "all",
    name: "Todos",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    description: "Explora todas las experiencias Silver",
  },
  {
    id: "bodas",
    name: "Bodas Silver",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
    description: "Celebraciones cuidadas, locaciones confiables y planificación sin estrés.",
  },
  {
    id: "viajes",
    name: "Viajes Silver",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    description: "Rutas tranquilas, tiempos humanos y experiencias con sentido.",
  },
  {
    id: "celebraciones",
    name: "Celebraciones",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400",
    description: "Aniversarios, renovación de votos, encuentros familiares.",
  },
  {
    id: "servicios",
    name: "Servicios",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    description: "Fotografía, música, catering y aliados verificados para tu evento o viaje.",
  },
];

export const plans: Plan[] = [
  {
    id: "catedral-sal",
    title: "Catedral de Sal",
    location: "Zipaquirá, Cundinamarca",
    category: "Viajes Silver",
    categoryId: "viajes",
    price: 150000,
    duration: "1 día",
    startDate: "2026-03-15",
    endDate: "2026-03-15",
    image: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=600",
    images: [
      "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=600",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600",
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600",
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
    ],
    rating: 4.8,
    reviews: 234,
    description: "Visita la impresionante Catedral de Sal, una maravilla arquitectónica construida dentro de las minas de sal de Zipaquirá. Recorrido con ritmo tranquilo, guía especializado y paradas de descanso incluidas.",
    includes: [
      "Transporte ida y vuelta desde Bogotá",
      "Entrada a la Catedral de Sal",
      "Guía turístico bilingüe",
      "Almuerzo típico",
      "Seguro de viaje",
    ],
    amenities: ["transport", "restaurant", "guide", "photos"],
    highlighted: true,
    datoClave: "Accesibilidad alta",
  },
  {
    id: "amazonas",
    title: "Amazonas con calma",
    location: "Leticia, Amazonas",
    category: "Viajes Silver",
    categoryId: "viajes",
    price: 1200000,
    originalPrice: 1500000,
    duration: "4 días / 3 noches",
    startDate: "2026-04-01",
    endDate: "2026-04-04",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600",
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600",
      "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=600",
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600",
    ],
    rating: 4.9,
    reviews: 156,
    description: "Sumérgete en la selva amazónica colombiana con un ritmo tranquilo y acompañamiento permanente. Descubre la biodiversidad única, visita comunidades indígenas y navega por el río Amazonas mientras observas delfines rosados.",
    includes: [
      "Vuelos Bogotá - Leticia - Bogotá",
      "Alojamiento en hotel ecológico",
      "Todas las comidas",
      "Tours guiados por la selva",
      "Visita a comunidades indígenas",
      "Avistamiento de delfines",
    ],
    amenities: ["transport", "restaurant", "spa", "guide", "photos"],
    isOffer: true,
    datoClave: "Ritmo tranquilo",
  },
  {
    id: "cartagena",
    title: "Cartagena Histórica",
    location: "Cartagena, Bolívar",
    category: "Viajes Silver",
    categoryId: "viajes",
    price: 890000,
    duration: "3 días / 2 noches",
    startDate: "2026-03-20",
    endDate: "2026-03-22",
    image: "https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=600",
    images: [
      "https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=600",
      "https://images.unsplash.com/photo-1538097304804-2a1b932466a9?w=600",
    ],
    rating: 4.7,
    reviews: 312,
    description: "Descubre la magia de Cartagena de Indias con recorridos adaptados. Pasea por sus calles coloniales con paradas de descanso, disfruta de sus playas y déjate envolver por la brisa del Caribe.",
    includes: [
      "Vuelos ida y vuelta",
      "Alojamiento en hotel 4 estrellas",
      "Desayunos incluidos",
      "Tour por la ciudad amurallada",
      "Paseo en chiva",
    ],
    amenities: ["transport", "restaurant", "spa", "photos"],
    highlighted: true,
    datoClave: "Ideal para familia",
  },
  {
    id: "san-andres",
    title: "San Andrés Silver",
    location: "San Andrés Islas",
    category: "Viajes Silver",
    categoryId: "viajes",
    price: 1450000,
    duration: "5 días / 4 noches",
    startDate: "2026-03-25",
    endDate: "2026-03-29",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
    ],
    rating: 4.9,
    reviews: 428,
    description: "Vive el paraíso caribeño en San Andrés con un plan pensado para tu comodidad. Aguas cristalinas de siete colores, snorkel con acompañamiento y la mejor experiencia del Caribe colombiano.",
    includes: [
      "Vuelos ida y vuelta",
      "Tarjeta de turismo",
      "Hotel frente al mar",
      "Tour en lancha",
      "Snorkel en el acuario",
    ],
    amenities: ["transport", "restaurant", "spa", "guide", "photos"],
    datoClave: "Accesibilidad alta",
  },
  {
    id: "cocora",
    title: "Valle del Cocora",
    location: "Salento, Quindío",
    category: "Viajes Silver",
    categoryId: "viajes",
    price: 280000,
    duration: "2 días / 1 noche",
    startDate: "2026-03-18",
    endDate: "2026-03-19",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600",
    ],
    rating: 4.8,
    reviews: 267,
    description: "Camina entre las palmas de cera más altas del mundo en el Valle del Cocora. Recorrido con ritmo adaptable, pausas de contemplación y hospedaje en finca cafetera acogedora.",
    includes: [
      "Transporte desde Armenia",
      "Hospedaje en finca cafetera",
      "Caminata guiada",
      "Almuerzo típico",
      "Tour del café",
    ],
    amenities: ["transport", "restaurant", "guide"],
    datoClave: "Ritmo tranquilo",
  },
  {
    id: "boda-hacienda",
    title: "Boda en Hacienda Bambusa",
    location: "Eje Cafetero",
    category: "Bodas Silver",
    categoryId: "bodas",
    price: 3500000,
    duration: "3 días / 2 noches",
    startDate: "2026-04-05",
    endDate: "2026-04-07",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    ],
    rating: 5.0,
    reviews: 89,
    description: "Celebración íntima en hacienda cafetera con planificación sin estrés. Decoración, catering, música y coordinación incluida. Todo pensado para que disfrutes sin preocuparte.",
    includes: [
      "Hacienda exclusiva por 2 noches",
      "Decoración temática",
      "Catering para hasta 50 personas",
      "Música en vivo",
      "Coordinador de evento",
    ],
    amenities: ["restaurant", "spa", "photos"],
    highlighted: true,
    datoClave: "Planificación sin estrés",
  },
  {
    id: "renovacion-votos",
    title: "Renovación de votos",
    location: "Villa de Leyva, Boyacá",
    category: "Celebraciones",
    categoryId: "celebraciones",
    price: 1800000,
    duration: "2 días / 1 noche",
    startDate: "2026-07-15",
    endDate: "2026-07-16",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600",
    images: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600",
    ],
    rating: 5.0,
    reviews: 145,
    description: "Ceremonia especial de renovación de votos en Villa de Leyva. Un momento íntimo con decoración elegante, cena de gala y sesión fotográfica profesional.",
    includes: [
      "Hospedaje en hotel boutique",
      "Ceremonia con decoración",
      "Cena de gala para 2",
      "Sesión fotográfica",
      "Desayuno especial",
    ],
    amenities: ["restaurant", "spa", "photos"],
    datoClave: "Ideal para parejas",
  },
  {
    id: "fotografia-silver",
    title: "Fotografía profesional Silver",
    location: "Bogotá y alrededores",
    category: "Servicios",
    categoryId: "servicios",
    price: 195000,
    duration: "4 horas",
    startDate: "2026-03-16",
    endDate: "2026-03-16",
    image: "https://images.unsplash.com/photo-1593995863951-57c27e518295?w=600",
    images: [
      "https://images.unsplash.com/photo-1593995863951-57c27e518295?w=600",
    ],
    rating: 4.7,
    reviews: 512,
    description: "Sesión fotográfica profesional para eventos, bodas o celebraciones. Fotógrafo especializado en capturar momentos naturales y emotivos.",
    includes: [
      "Sesión de 4 horas",
      "100+ fotos editadas",
      "Galería digital privada",
      "Impresiones seleccionadas",
    ],
    amenities: ["photos"],
    isOffer: true,
    datoClave: "Aliado verificado",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María González",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    text: "Lo que más me gustó fue la claridad. Sabíamos exactamente qué esperar, los accesos, los tiempos y el acompañamiento.",
    rating: 5,
    city: "Bogotá",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    text: "Mi mamá se sintió cuidada desde el primer mensaje. El equipo fue atento y resolvió todas nuestras dudas sin afán.",
    rating: 5,
    city: "Medellín",
  },
  {
    id: "3",
    name: "Ana Martínez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    text: "El acompañamiento fue excepcional. Nos sentimos tranquilos en todo momento y la experiencia superó nuestras expectativas.",
    rating: 5,
    city: "Manizales",
  },
];

export const paymentMethods = [
  { id: "credit", name: "Tarjeta de Crédito" },
  { id: "debit", name: "Tarjeta Débito" },
  { id: "pse", name: "PSE" },
  { id: "cash", name: "Efectivo en punto de pago" },
];

export const getPlanById = (id: string): Plan | undefined => {
  return plans.find((plan) => plan.id === id);
};

export const getPlansByCategory = (categoryId: string): Plan[] => {
  if (categoryId === "all") return plans;
  return plans.filter((plan) => plan.categoryId === categoryId);
};

export const getFeaturedPlans = (): Plan[] => {
  return plans.filter((plan) => plan.highlighted);
};

export const getOfferPlans = (): Plan[] => {
  return plans.filter((plan) => plan.isOffer);
};
