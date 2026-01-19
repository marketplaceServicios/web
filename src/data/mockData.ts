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
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  text: string;
  rating: number;
}

export const categories: Category[] = [
  {
    id: "all",
    name: "Todos",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    description: "Explora todos nuestros destinos",
  },
  {
    id: "adventure",
    name: "Aventura",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
    description: "Experiencias llenas de adrenalina",
  },
  {
    id: "beach",
    name: "Playa",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    description: "Relájate en las mejores playas",
  },
  {
    id: "waterfalls",
    name: "Cascadas",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400",
    description: "Descubre cascadas impresionantes",
  },
  {
    id: "cities",
    name: "Ciudades",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
    description: "Explora ciudades vibrantes",
  },
  {
    id: "mountains",
    name: "Montaña",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    description: "Conquista las cumbres más altas",
  },
];

export const plans: Plan[] = [
  {
    id: "catedral-sal",
    title: "Catedral de Sal",
    location: "Zipaquirá, Cundinamarca",
    category: "Ciudades",
    categoryId: "cities",
    price: 150000,
    duration: "1 día",
    startDate: "2024-03-15",
    endDate: "2024-03-15",
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
    description: "Visita la impresionante Catedral de Sal, una maravilla arquitectónica construida dentro de las minas de sal de Zipaquirá. Explora sus tres naves que representan el nacimiento, vida y muerte de Jesús, y maravíllate con las esculturas talladas en sal y las impresionantes cruces iluminadas.",
    includes: [
      "Transporte ida y vuelta desde Bogotá",
      "Entrada a la Catedral de Sal",
      "Guía turístico bilingüe",
      "Almuerzo típico",
      "Seguro de viaje",
    ],
    amenities: ["transport", "restaurant", "guide", "photos"],
    highlighted: true,
  },
  {
    id: "amazonas",
    title: "Visita Amazonas",
    location: "Leticia, Amazonas",
    category: "Aventura",
    categoryId: "adventure",
    price: 1200000,
    originalPrice: 1500000,
    duration: "4 días / 3 noches",
    startDate: "2024-04-01",
    endDate: "2024-04-04",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600",
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600",
      "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=600",
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600",
    ],
    rating: 4.9,
    reviews: 156,
    description: "Sumérgete en la selva amazónica colombiana. Descubre la biodiversidad única, visita comunidades indígenas, y navega por el río Amazonas mientras observas delfines rosados y una fauna increíble.",
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
  },
  {
    id: "cartagena",
    title: "Cartagena Histórica",
    location: "Cartagena, Bolívar",
    category: "Playa",
    categoryId: "beach",
    price: 890000,
    duration: "3 días / 2 noches",
    startDate: "2024-03-20",
    endDate: "2024-03-22",
    image: "https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=600",
    images: [
      "https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=600",
      "https://images.unsplash.com/photo-1538097304804-2a1b932466a9?w=600",
    ],
    rating: 4.7,
    reviews: 312,
    description: "Descubre la magia de Cartagena de Indias. Pasea por sus calles coloniales, disfruta de sus playas cristalinas y déjate envolver por la brisa del Caribe.",
    includes: [
      "Vuelos ida y vuelta",
      "Alojamiento en hotel 4 estrellas",
      "Desayunos incluidos",
      "Tour por la ciudad amurallada",
      "Paseo en chiva",
    ],
    amenities: ["transport", "restaurant", "spa", "photos"],
    highlighted: true,
  },
  {
    id: "san-andres",
    title: "San Andrés Paradise",
    location: "San Andrés Islas",
    category: "Playa",
    categoryId: "beach",
    price: 1450000,
    duration: "5 días / 4 noches",
    startDate: "2024-03-25",
    endDate: "2024-03-29",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
    ],
    rating: 4.9,
    reviews: 428,
    description: "Vive el paraíso caribeño en San Andrés. Aguas cristalinas de siete colores, snorkel, y la mejor vida nocturna del Caribe colombiano.",
    includes: [
      "Vuelos ida y vuelta",
      "Tarjeta de turismo",
      "Hotel frente al mar",
      "Tour en lancha",
      "Snorkel en el acuario",
    ],
    amenities: ["transport", "restaurant", "spa", "guide", "photos"],
  },
  {
    id: "cocora",
    title: "Valle del Cocora",
    location: "Salento, Quindío",
    category: "Montaña",
    categoryId: "mountains",
    price: 280000,
    duration: "2 días / 1 noche",
    startDate: "2024-03-18",
    endDate: "2024-03-19",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600",
    ],
    rating: 4.8,
    reviews: 267,
    description: "Camina entre las palmas de cera más altas del mundo en el Valle del Cocora. Una experiencia única en el corazón del Eje Cafetero.",
    includes: [
      "Transporte desde Armenia",
      "Hospedaje en finca cafetera",
      "Caminata guiada",
      "Almuerzo típico",
      "Tour del café",
    ],
    amenities: ["transport", "restaurant", "guide"],
  },
  {
    id: "tayrona",
    title: "Parque Tayrona",
    location: "Santa Marta, Magdalena",
    category: "Playa",
    categoryId: "beach",
    price: 680000,
    duration: "3 días / 2 noches",
    startDate: "2024-04-05",
    endDate: "2024-04-07",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600",
    images: [
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600",
    ],
    rating: 4.6,
    reviews: 389,
    description: "Explora las playas vírgenes del Parque Tayrona. Conecta con la naturaleza mientras disfrutas de paisajes de ensueño entre la selva y el mar.",
    includes: [
      "Transporte desde Santa Marta",
      "Entrada al parque",
      "Camping equipado",
      "Alimentación completa",
      "Guía naturalista",
    ],
    amenities: ["transport", "restaurant", "guide", "photos"],
  },
  {
    id: "caño-cristales",
    title: "Caño Cristales",
    location: "La Macarena, Meta",
    category: "Cascadas",
    categoryId: "waterfalls",
    price: 1800000,
    duration: "4 días / 3 noches",
    startDate: "2024-07-15",
    endDate: "2024-07-18",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600",
    images: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600",
    ],
    rating: 5.0,
    reviews: 145,
    description: "Visita el río de los cinco colores, una maravilla natural única en el mundo. Solo disponible en temporada.",
    includes: [
      "Vuelos charter",
      "Alojamiento local",
      "Todas las comidas",
      "Permisos de entrada",
      "Guías especializados",
    ],
    amenities: ["transport", "restaurant", "guide", "photos"],
    highlighted: true,
  },
  {
    id: "guatape",
    title: "Piedra del Peñol",
    location: "Guatapé, Antioquia",
    category: "Aventura",
    categoryId: "adventure",
    price: 195000,
    duration: "1 día",
    startDate: "2024-03-16",
    endDate: "2024-03-16",
    image: "https://images.unsplash.com/photo-1593995863951-57c27e518295?w=600",
    images: [
      "https://images.unsplash.com/photo-1593995863951-57c27e518295?w=600",
    ],
    rating: 4.7,
    reviews: 512,
    description: "Sube los 740 escalones de la Piedra del Peñol y disfruta de vistas panorámicas increíbles del embalse de Guatapé.",
    includes: [
      "Transporte desde Medellín",
      "Entrada a la Piedra",
      "Tour por el pueblo",
      "Almuerzo típico",
    ],
    amenities: ["transport", "restaurant", "photos"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    text: "Increíble experiencia en el Amazonas. El equipo de Travel fue muy profesional y atento. Definitivamente repetiré.",
    rating: 5,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    text: "La Catedral de Sal superó mis expectativas. El guía fue excelente y el transporte muy cómodo.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ana Martínez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    text: "San Andrés fue un sueño hecho realidad. Las playas son hermosas y el hotel era perfecto.",
    rating: 4,
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
