# Plan de Implementación: Travel Marketplace - Portal Web

## Contexto del Proyecto

Este es un Marketplace de Servicios y Eventos enfocado en turismo. El proyecto web consiste en implementar el **Portal del Usuario Final** con 6 páginas basadas en mockups de alta fidelidad.

---

## Stack Tecnológico

```
- React 18 con TypeScript
- Vite (build tool)
- Tailwind CSS (estilos)
- shadcn/ui (componentes base)
- React Router DOM (navegación)
- Lucide React (iconos)
```

---

## Análisis Detallado de Mockups

### PÁGINA 1: HOME (home.jpg)

**URL:** `/`

**Secciones:**

1. **Header (Navbar)**
   - Logo "Travel" con icono de globo (naranja)
   - Menú: Inicio | Planes | Reserva | Contáctanos
   - "Inicio" subrayado en naranja (activo)
   - Campo de búsqueda con icono lupa

2. **Hero Banner**
   - Fondo split: verde oscuro izquierda + imagen montaña derecha
   - Título: "Encuentra tu viaje perfecto" (parte en cursiva)
   - Subtítulo: "Explora todas las posibilidades"
   - Botón naranja: "Explorar planes"

3. **Sección Categorías**
   - Título centrado: "Categorías"
   - Grid 3x2 de cards:
     - TODOS, AVENTURA, PLAYA (fila 1)
     - CASCADAS, CIUDADES, MONTAÑA (fila 2)
   - Cada card: imagen oscurecida + nombre centrado + botón "Ver planes asociados"
   - Botón verde: "Ver todas las categorías"

4. **Oferta Destacada**
   - Fondo beige claro
   - Título: "Visita Amazonas"
   - Duración: "10 días"
   - Precio: "desde $800.000 por persona"
   - Botón naranja: "Ver plan"
   - 2 imágenes a la derecha
   - Badge "OFERTAS" verde en esquina

5. **Planes Más Populares**
   - Título: "Planes más populares"
   - 3 cards horizontales:
     - Card 1: MONTAÑA - Manizales - desde $800.000
     - Card 2: PLAYA - Cartagena - desde $1.000.000
     - Card 3: CASCADAS - Santander - desde $800.000
   - Cada card: imagen grande + badge categoría + nombre + precio

6. **Testimonios**
   - Título: "Testimonios"
   - Subtítulo: "Porque te brindamos las mejores experiencias"
   - 3 cards testimonios:
     - Imagen circular del usuario
     - Texto del testimonio
     - Rating con 5 estrellas
     - Nombre del usuario

7. **Footer**
   - Fondo verde oscuro
   - Logo "Travel" blanco
   - Botón verde: "Quiero hablar con un agente" (con icono WhatsApp)
   - Links: "Términos y condiciones" | "Política de privacidad"

---

### PÁGINA 2: PLANES (planes.jpg)

**URL:** `/planes`

**Secciones:**

1. **Header** - Mismo que Home, "Planes" subrayado

2. **Hero Banner**
   - Fondo split: naranja izquierda + imagen playa derecha
   - Título: "Escapa a la playa!"
   - Subtítulo: "Descubre todas las posibilidades"

3. **Contador de Resultados**
   - Texto: "15 planes disponibles"

4. **Grid de Planes**
   - Grid 4x2 (8 cards visibles)
   - **Card de Plan:**
     - Imagen del destino
     - Nombre del destino (bold)
     - Ubicación (subtítulo gris)
     - Fechas (formato: DD/MM - DD/MM/YYYY)
     - Precio: "desde $X" (grande)
     - Botón "Ver" (naranja)
   - **Variantes:**
     - Cards con borde/acento verde (destacados)
     - Cards con borde/acento naranja (normal)

5. **Footer** - Mismo que Home

---

### PÁGINA 3: CATEGORÍAS (categorias.jpg)

**URL:** `/categorias`

**Secciones:**

1. **Header** - Mismo, "Planes" subrayado

2. **Hero Banner**
   - Imagen de fondo completa (playa/acantilado)
   - Overlay semitransparente
   - Título: "Conoce todas nuestras categorías" (parte en naranja)
   - Subtítulo: "Y encuentra en cada una tu plan perfecto"

3. **Título de Sección**
   - "Categorías" centrado

4. **Grid de Categorías**
   - Grid 3x2
   - **Card de Categoría (grande):**
     - Imagen de fondo oscurecida
     - Nombre de categoría centrado (blanco, mayúsculas)
     - Botón naranja: "Ver planes asociados"
   - Categorías:
     - TODOS (icono grid)
     - AVENTURA
     - PLAYA
     - CASCADAS
     - CIUDADES
     - MONTAÑA

5. **Footer** - Mismo

---

### PÁGINA 4: DETAILS (details.jpg)

**URL:** `/planes/:id`

**Secciones:**

1. **Header** - Mismo

2. **Hero del Servicio**
   - Imagen de fondo (Catedral de Sal)
   - Overlay oscuro
   - Título: "Catedral de Sal"
   - Subtítulo: "Zipaquirá, Cundinamarca"

3. **Galería de Imágenes**
   - Imagen principal grande (izquierda)
   - Grid de 6 miniaturas (2x3) a la derecha
   - Miniaturas clicables

4. **Información del Servicio**
   - Título: "Catedral de sal/Zipaquirá/Cundinamarca"
   - Rating: 3.5 estrellas (visuales)
   - Lista de características (bullets con círculos):
     - "Maravilla Única en el mundo"
     - "A 45 minutos de la ciudad de Bogotá"
     - "Icono cultural y religioso"
     - "La Catedral más grande ubicada bajo la tierra"
     - "Museos temáticos"
     - "Cruz de sal de 16 metros de altura"

5. **Descripción**
   - 2 párrafos de texto descriptivo

6. **Detalles (Amenities)**
   - Título: "Detalles"
   - Iconos con texto:
     - Transporte terrestre
     - Restaurante
     - SPA
     - Plan de fotos y video
     - Guía turístico

7. **Categoría**
   - Label: "Categoría"
   - Badge: "Ciudades" con icono

8. **Calendario de Disponibilidad**
   - Título: "Fechas disponibles y precios"
   - Selector de mes: < OCTUBRE 2026 >
   - Grid de calendario (Lunes-Domingo)
   - Cada día muestra:
     - Número del día
     - Precio ($800.000 - $1.200.000)
   - Días seleccionados con fondo verde

9. **El Plan Incluye**
   - Card con fondo beige
   - Título: "Visita a la Catedral"
   - Imagen pequeña
   - Lista de incluidos:
     - Recorrido de un día
     - Salida desde Bogotá y regreso el mismo día
     - Almuerzo
     - Refrigerio antes de ingresar a la Catedral
     - Acompañamiento de guía al interior de la mina
   - Botón verde: "Reserva ahora"

10. **Formulario de Cotización**
    - Título izquierda: "Quieres un plan especial"
    - Subtítulo: "Si quisieras hacer modificaciones sobre este plan..."
    - Botón naranja: "Cuéntanos las especificaciones..."
    - Textarea para modificaciones
    - Botón: "Solicitar cotización"

    - Formulario derecha:
      - Título verde: "Ingresa tus datos"
      - Campo: "Nombres y apellidos"
      - Campo: "Celular"
      - Campo: "Correo"

11. **Footer** - Mismo

---

### PÁGINA 5: RESERVA (reserva.jpg)

**URL:** `/reserva/:id`

**Secciones:**

1. **Header** - Mismo, "Reserva" subrayado

2. **Título de Página**
   - "Reservar plan Catedral de sal"

3. **Layout 2 columnas:**

   **Columna Izquierda - Formulario:**

   **Sección 1: "1. Datos de quienes toman el plan"** (header verde)
   - Turista 1:
     - Campo: "Nombres y apellidos"
     - Campo: "Fecha de nacimiento" (con icono calendario)
   - Turista 2:
     - Campo: "Nombres y apellidos"
     - Campo: "Fecha de nacimiento" (con icono calendario)

   **Sección 2: "2. Detalles de la factura"** (header verde)
   - Campo: "Dirección"
   - Campos en fila: "Celular" | "Ciudad"

   **Sección 3: "3. Información de contacto"** (header verde)
   - Campo: "Email"
   - Campos en fila: "+57" (código país) | "Celular"

   **Columna Derecha - Resumen:**
   - Card con borde verde
   - **Detalles:**
     - Destino: Catedral de sal, Zipaquirá, Cundinamarca
     - Cantidad de usuarios: 4
     - Fecha: 10/08 - 17/08/2023
   - **Precios:**
     - Valor por adulto: $800.000
     - Total usuarios: $3.200.000
     - Impuestos: $100.000
     - **TOTAL: $3.200.000** (hay un error en el mockup, debería ser $3.300.000)
   - **Método de pago:**
     - Select: "Tarjeta crédito / débito"
   - Botón naranja grande: "Realizar el pago"

4. **Footer** - Mismo

---

### PÁGINA 6: ORDEN (orden.jpg)

**URL:** `/orden`

**Secciones:**

1. **Header** - Mismo, "Reserva" subrayado

2. **Layout 2 columnas:**

   **Columna Izquierda:**
   - Título: "Tu orden."
   - Texto: "Hemos recibido tu pago."
   - Texto: "Gracias por reservar tu viaje con nosotros."
   - Botón verde oscuro: "Ir a la página de inicio"

   **Columna Derecha:**
   - Card con imagen del destino (piscina/hotel)
   - Nombre: "Catedral de sal, Zipaquirá"
   - Fechas: "10/08 - 17/08/2026, 4 adultos"
   - Código de reserva: "48420924"

3. **Footer** - Mismo

---

## Paleta de Colores

```css
:root {
  /* Primary */
  --color-primary: #E86C25;        /* Naranja - botones, acentos */
  --color-primary-hover: #D45D1A;  /* Naranja hover */

  /* Secondary */
  --color-secondary: #1B4332;      /* Verde oscuro - headers, footer */
  --color-secondary-light: #2D5A45; /* Verde más claro */

  /* Backgrounds */
  --color-bg-main: #F5F1EB;        /* Beige/crema - fondo principal */
  --color-bg-card: #FFFFFF;        /* Blanco - cards */
  --color-bg-section: #EDE9E0;     /* Beige más oscuro - secciones */

  /* Text */
  --color-text-primary: #1A1A1A;   /* Texto principal */
  --color-text-secondary: #6B7280; /* Texto secundario */
  --color-text-light: #FFFFFF;     /* Texto sobre fondos oscuros */

  /* Borders */
  --color-border: #E5E7EB;         /* Bordes de inputs */
  --color-border-green: #1B4332;   /* Bordes verdes (destacados) */
  --color-border-orange: #E86C25;  /* Bordes naranjas */
}
```

---

## Estructura de Carpetas

```
web/
├── public/
│   └── images/                    # Imágenes placeholder
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   │
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── calendar.tsx
│   │   │   └── badge.tsx
│   │   │
│   │   ├── shared/                # Componentes compartidos
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   └── StarRating.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── FeaturedOffer.tsx
│   │   │   ├── PopularPlans.tsx
│   │   │   └── Testimonials.tsx
│   │   │
│   │   ├── plans/
│   │   │   ├── PlanCard.tsx
│   │   │   └── PlansGrid.tsx
│   │   │
│   │   ├── categories/
│   │   │   ├── CategoryCard.tsx
│   │   │   └── CategoriesGrid.tsx
│   │   │
│   │   ├── details/
│   │   │   ├── ImageGallery.tsx
│   │   │   ├── ServiceInfo.tsx
│   │   │   ├── Amenities.tsx
│   │   │   ├── PriceCalendar.tsx
│   │   │   ├── PlanIncludes.tsx
│   │   │   └── QuoteForm.tsx
│   │   │
│   │   ├── reservation/
│   │   │   ├── TouristForm.tsx
│   │   │   ├── BillingForm.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── OrderSummary.tsx
│   │   │
│   │   └── order/
│   │       └── OrderConfirmation.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PlansPage.tsx
│   │   ├── CategoriesPage.tsx
│   │   ├── DetailsPage.tsx
│   │   ├── ReservationPage.tsx
│   │   └── OrderPage.tsx
│   │
│   ├── data/
│   │   └── mockData.ts            # Datos de ejemplo
│   │
│   ├── lib/
│   │   └── utils.ts               # Función cn() para clases
│   │
│   ├── App.tsx                    # Router principal
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Estilos globales + Tailwind
│
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
└── components.json               # Config shadcn/ui
```

---

## Rutas de la Aplicación

```typescript
const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/planes', element: <PlansPage /> },
  { path: '/categorias', element: <CategoriesPage /> },
  { path: '/planes/:id', element: <DetailsPage /> },
  { path: '/reserva/:id', element: <ReservationPage /> },
  { path: '/orden', element: <OrderPage /> },
];
```

---

## Datos Mock (mockData.ts)

```typescript
// Categorías
export const categories = [
  { id: 'all', name: 'Todos', image: '/images/categories/todos.jpg' },
  { id: 'adventure', name: 'Aventura', image: '/images/categories/aventura.jpg' },
  { id: 'beach', name: 'Playa', image: '/images/categories/playa.jpg' },
  { id: 'waterfalls', name: 'Cascadas', image: '/images/categories/cascadas.jpg' },
  { id: 'cities', name: 'Ciudades', image: '/images/categories/ciudades.jpg' },
  { id: 'mountain', name: 'Montaña', image: '/images/categories/montana.jpg' },
];

// Planes
export const plans = [
  {
    id: '1',
    name: 'Spiagga Rosa, Sardinia',
    location: 'Budelli Island, Italia',
    category: 'beach',
    startDate: '15/08',
    endDate: '22/08/2026',
    price: 900000,
    image: '/images/plans/sardinia.jpg',
    featured: false,
  },
  // ... más planes
];

// Testimonios
export const testimonials = [
  {
    id: '1',
    text: 'This product brings so much value! I LOVE IT!',
    author: 'Alex Turner',
    rating: 5,
    avatar: '/images/avatars/alex.jpg',
  },
  // ... más testimonios
];

// Plan detallado
export const planDetails = {
  id: '1',
  name: 'Catedral de Sal',
  location: 'Zipaquirá, Cundinamarca',
  category: 'cities',
  rating: 3.5,
  description: '...',
  features: [
    'Maravilla Única en el mundo',
    'A 45 minutos de la ciudad de Bogotá',
    // ...
  ],
  amenities: [
    { icon: 'bus', name: 'Transporte terrestre' },
    { icon: 'utensils', name: 'Restaurante' },
    // ...
  ],
  includes: [
    'Recorrido de un día',
    'Salida desde Bogotá y regreso el mismo día',
    // ...
  ],
  availability: {
    // Precios por fecha
    '2026-10-01': 800000,
    '2026-10-02': 1200000,
    // ...
  },
  images: [
    '/images/details/catedral-1.jpg',
    '/images/details/catedral-2.jpg',
    // ...
  ],
};
```

---

## Fases de Implementación

### Fase 1: Setup Base
1. `npm create vite@latest . -- --template react-ts`
2. Instalar dependencias: `npm install tailwindcss postcss autoprefixer`
3. Configurar Tailwind con colores personalizados
4. Instalar shadcn/ui: `npx shadcn-ui@latest init`
5. Instalar React Router: `npm install react-router-dom`
6. Instalar Lucide: `npm install lucide-react`

### Fase 2: Layout y UI Base
1. Crear Header.tsx con navegación
2. Crear Footer.tsx
3. Crear Layout.tsx wrapper
4. Agregar componentes shadcn/ui necesarios

### Fase 3: Páginas
1. HomePage.tsx con todos sus componentes
2. CategoriesPage.tsx
3. PlansPage.tsx
4. DetailsPage.tsx
5. ReservationPage.tsx
6. OrderPage.tsx

### Fase 4: Conexión y Navegación
1. Configurar Router en App.tsx
2. Implementar navegación entre páginas
3. Pasar parámetros entre páginas

### Fase 5: Refinamiento
1. Responsive design
2. Estados hover/active
3. Ajustes visuales finales

---

## Comandos para Ejecutar

```bash
# Crear proyecto
cd web
npm create vite@latest . -- --template react-ts

# Instalar dependencias
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom lucide-react
npm install clsx tailwind-merge

# Agregar shadcn/ui
npx shadcn-ui@latest init

# Agregar componentes shadcn necesarios
npx shadcn-ui@latest add button card input select calendar badge

# Correr servidor de desarrollo
npm run dev
```

---

## Notas Importantes

1. **Imágenes**: Se usarán placeholders de Unsplash temporalmente
2. **Formularios**: Solo UI, sin lógica de envío real
3. **Calendario**: Componente visual con datos mock
4. **Pagos**: Solo UI del selector, sin integración real
5. **Responsive**: Mobile-first, breakpoints en md (768px) y lg (1024px)

---

## Verificación Final

- [ ] Las 6 páginas renderizan correctamente
- [ ] Navegación funciona entre todas las páginas
- [ ] Header y Footer consistentes
- [ ] Colores coinciden con mockups
- [ ] Layout responsivo funciona
- [ ] Componentes son reutilizables
