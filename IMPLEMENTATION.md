# Travel Marketplace - Documentación de Implementación

## Resumen

Este proyecto implementa un Marketplace de Servicios y Eventos de turismo usando React, TypeScript, Vite y Tailwind CSS. La aplicación cuenta con 6 páginas principales y una arquitectura de componentes reutilizables.

## Stack Tecnológico

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos utilitarios
- **React Router v6** - Navegación SPA
- **Lucide React** - Iconos
- **Radix UI** - Componentes accesibles (Select, Label)
- **class-variance-authority** - Variantes de componentes

## Estructura del Proyecto

```
web/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Layout wrapper
│   │   ├── ui/              # Componentes base (Button, Card, Input, etc.)
│   │   ├── home/            # Componentes de la página principal
│   │   ├── plans/           # Componentes de planes
│   │   ├── categories/      # Componentes de categorías
│   │   ├── details/         # Componentes de detalles del plan
│   │   ├── reservation/     # Formularios de reserva
│   │   └── order/           # Confirmación de orden
│   ├── pages/               # Páginas principales
│   ├── data/                # Datos mock
│   ├── lib/                 # Utilidades
│   ├── App.tsx              # Router principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globales
├── public/
├── index.html
└── [config files]
```

## Páginas Implementadas

### 1. HomePage (`/`)
- Hero banner con CTA
- Grid de categorías
- Oferta destacada
- Planes populares
- Testimonios

### 2. CategoriesPage (`/categorias`)
- Hero banner
- Grid de categorías con imágenes y descripciones

### 3. PlansPage (`/planes`)
- Hero dinámico según categoría
- Filtro por categorías
- Grid de planes con cards
- Contador de planes disponibles

### 4. DetailsPage (`/planes/:id`)
- Galería de imágenes con miniaturas
- Información del servicio con rating
- Amenidades/servicios incluidos
- Calendario de disponibilidad
- Card lateral "El plan incluye"
- Formulario de cotización especial

### 5. ReservationPage (`/reserva/:id`)
- Selector de número de turistas
- Formulario de datos de turistas
- Formulario de facturación
- Formulario de contacto
- Resumen de reserva con métodos de pago

### 6. OrderPage (`/orden`)
- Confirmación de pago exitoso
- Resumen de la reserva
- Código de reserva copiable

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary (Naranja) | `#E86C25` | Botones, CTAs, acentos |
| Forest (Verde) | `#1B4332` | Headers, textos importantes |
| Cream | `#F5F1EB` | Fondos |
| White | `#FFFFFF` | Cards, formularios |

## Componentes Reutilizables

### Layout
- `Header` - Navbar con logo, navegación y búsqueda
- `Footer` - Links, contacto y copyright
- `Layout` - Wrapper con Header + Footer

### UI Base
- `Button` - Con variantes: default, secondary, outline, ghost, link
- `Card` - Con CardHeader, CardContent, CardFooter
- `Input` - Campo de texto estilizado
- `Label` - Etiquetas para formularios
- `Select` - Dropdown con Radix UI

### Feature Components
Cada página tiene sus propios componentes especializados que encapsulan la lógica y presentación específica.

## Datos Mock

Los datos de ejemplo están en `src/data/mockData.ts` e incluyen:
- Categorías de planes
- Planes con todos sus detalles
- Testimonios
- Métodos de pago

Funciones helper disponibles:
- `getPlanById(id)` - Obtener plan por ID
- `getPlansByCategory(categoryId)` - Filtrar por categoría
- `getFeaturedPlans()` - Planes destacados
- `getOfferPlans()` - Planes en oferta

## Navegación

La navegación está implementada con React Router v6:

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/planes" element={<PlansPage />} />
  <Route path="/categorias" element={<CategoriesPage />} />
  <Route path="/planes/:id" element={<DetailsPage />} />
  <Route path="/reserva/:id" element={<ReservationPage />} />
  <Route path="/orden" element={<OrderPage />} />
</Routes>
```

## Flujo de Usuario

1. **Home** → Ver categorías/planes populares
2. **Categorías** → Seleccionar tipo de viaje
3. **Planes** → Explorar opciones filtradas
4. **Detalles** → Ver información completa
5. **Reserva** → Completar formularios
6. **Orden** → Confirmación de compra

## Extender la Aplicación

### Agregar nueva página
1. Crear componentes en `src/components/[feature]/`
2. Crear página en `src/pages/`
3. Agregar ruta en `App.tsx`
4. Agregar link en Header si es necesario

### Agregar nuevos datos
1. Definir interface en `mockData.ts`
2. Agregar datos de ejemplo
3. Crear funciones helper si es necesario

### Agregar nuevo componente UI
1. Crear en `src/components/ui/`
2. Seguir patrón de variantes con CVA
3. Exportar desde el archivo

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

## Responsive Design

La aplicación usa las clases responsive de Tailwind:
- Mobile first approach
- Breakpoints: `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Grid layouts adaptativos
- Navegación mobile con menú hamburguesa

## Consideraciones de Producción

Para llevar a producción:
1. Reemplazar datos mock con API real
2. Implementar autenticación
3. Conectar con pasarela de pagos real
4. Agregar manejo de errores
5. Implementar loading states
6. Agregar SEO/meta tags
7. Configurar analytics
