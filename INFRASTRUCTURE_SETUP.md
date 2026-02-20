# Informe de Setup de Infraestructura
## Travel Marketplace - Aplicación Web

**Fecha:** Enero 2026
**Versión:** 1.0.0
**Tipo de Proyecto:** Single Page Application (SPA)

---

## 1. Resumen Ejecutivo

Este documento describe la infraestructura técnica del proyecto Travel Marketplace, una aplicación web para la comercialización de servicios y eventos turísticos. El proyecto utiliza tecnologías modernas de frontend con un enfoque en rendimiento, mantenibilidad y experiencia de desarrollo.

---

## 2. Stack Tecnológico

### 2.1 Core
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.3.1 | Biblioteca UI principal |
| TypeScript | 5.6.2 | Tipado estático |
| Vite | 5.4.10 | Build tool y dev server |

### 2.2 Estilos
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Tailwind CSS | 3.4.14 | Framework de utilidades CSS |
| PostCSS | 8.4.47 | Procesador CSS |
| Autoprefixer | 10.4.20 | Compatibilidad cross-browser |

### 2.3 UI Components
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Radix UI | 2.1.x | Componentes accesibles (Select, Label) |
| Lucide React | 0.460.0 | Sistema de iconos |
| class-variance-authority | 0.7.1 | Variantes de componentes |
| clsx | 2.1.1 | Utilidad para clases condicionales |
| tailwind-merge | 2.5.4 | Merge inteligente de clases Tailwind |

### 2.4 Routing
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React Router DOM | 6.28.0 | Navegación SPA |

---

## 3. Arquitectura del Proyecto

### 3.1 Estructura de Directorios

```
web/
├── public/                    # Assets estáticos
│   └── vite.svg              # Favicon
├── src/
│   ├── components/           # Componentes React
│   │   ├── layout/           # Header, Footer, Layout wrapper
│   │   ├── ui/               # Componentes base reutilizables
│   │   ├── home/             # Componentes página principal
│   │   ├── plans/            # Componentes de planes
│   │   ├── categories/       # Componentes de categorías
│   │   ├── details/          # Componentes detalle de plan
│   │   ├── reservation/      # Formularios de reserva
│   │   └── order/            # Confirmación de orden
│   ├── pages/                # Páginas/Vistas principales
│   ├── data/                 # Datos mock y tipos
│   ├── lib/                  # Utilidades compartidas
│   ├── App.tsx               # Componente raíz con routing
│   ├── main.tsx              # Entry point
│   ├── index.css             # Estilos globales + Tailwind
│   └── vite-env.d.ts         # Tipos de Vite
├── index.html                # Template HTML
├── package.json              # Dependencias y scripts
├── vite.config.ts            # Configuración de Vite
├── tailwind.config.js        # Configuración de Tailwind
├── postcss.config.js         # Configuración de PostCSS
├── tsconfig.json             # Configuración de TypeScript
└── eslint.config.js          # Configuración de ESLint
```

### 3.2 Patrón de Arquitectura

- **Component-Based Architecture**: Componentes modulares y reutilizables
- **Feature-First Organization**: Componentes agrupados por funcionalidad
- **Separation of Concerns**: Páginas, componentes, datos y utilidades separados

---

## 4. Configuración de Archivos

### 4.1 Vite (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Características:**
- Plugin de React para JSX y Fast Refresh
- Alias `@` para imports absolutos desde `src/`

### 4.2 TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Características:**
- Modo estricto habilitado
- Target ES2020 para características modernas
- Path mapping para imports con `@/`

### 4.3 Tailwind CSS (`tailwind.config.js`)
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#E86C25', /* shades */ },
        forest: { DEFAULT: '#1B4332', /* shades */ },
        cream: { DEFAULT: '#F5F1EB', /* shades */ },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

**Características:**
- Paleta de colores personalizada del diseño
- Tipografía Inter como fuente principal
- Purge automático de CSS no utilizado

---

## 5. Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en `localhost:5173` |
| `npm run build` | Compila TypeScript y genera build de producción |
| `npm run preview` | Previsualiza build de producción localmente |
| `npm run lint` | Ejecuta ESLint para análisis de código |

---

## 6. Requisitos del Sistema

### 6.1 Desarrollo
| Requisito | Versión Mínima |
|-----------|----------------|
| Node.js | 18.x o superior |
| npm | 9.x o superior |
| Sistema Operativo | Windows 10+, macOS 10.15+, Linux |

### 6.2 Navegadores Soportados (Producción)
| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |

---

## 7. Instalación y Despliegue

### 7.1 Instalación Local
```bash
# Clonar/navegar al proyecto
cd web

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

### 7.2 Build de Producción
```bash
# Generar build optimizado
npm run build

# Los archivos se generan en dist/
# - index.html
# - assets/index-[hash].css (~23 KB gzip: ~5 KB)
# - assets/index-[hash].js (~248 KB gzip: ~75 KB)
```

### 7.3 Opciones de Despliegue

| Plataforma | Configuración |
|------------|---------------|
| **Vercel** | Zero-config, detecta Vite automáticamente |
| **Netlify** | Build command: `npm run build`, Publish: `dist` |
| **AWS S3 + CloudFront** | Upload `dist/` a S3, configurar CloudFront |
| **Docker** | Nginx sirviendo archivos estáticos |

#### Ejemplo Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 8. Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | HomePage | Página principal |
| `/planes` | PlansPage | Listado de planes con filtros |
| `/categorias` | CategoriesPage | Grid de categorías |
| `/planes/:id` | DetailsPage | Detalle de un plan |
| `/reserva/:id` | ReservationPage | Formulario de reserva |
| `/orden` | OrderPage | Confirmación de compra |

---

## 9. Variables de Entorno

Actualmente el proyecto usa datos mock. Para producción, configurar:

```env
# .env.production
VITE_API_BASE_URL=https://api.travel.com
VITE_PAYMENT_GATEWAY_KEY=pk_live_xxxxx
VITE_GOOGLE_MAPS_KEY=xxxxx
```

Acceso en código:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

---

## 10. Métricas del Build

| Métrica | Valor |
|---------|-------|
| Tiempo de build | ~9 segundos |
| Tamaño CSS (gzip) | ~5 KB |
| Tamaño JS (gzip) | ~75 KB |
| Total assets (gzip) | ~80 KB |
| Módulos procesados | 1,621 |

---

## 11. Seguridad

### Implementado
- No hay secrets en el código fuente
- Dependencias actualizadas
- TypeScript strict mode

### Recomendado para Producción
- Implementar CSP (Content Security Policy)
- Configurar HTTPS obligatorio
- Agregar rate limiting en API
- Sanitización de inputs de usuario
- Autenticación JWT/OAuth

---

## 12. Próximos Pasos Recomendados

1. **Integración con Backend**: Reemplazar mock data con API REST/GraphQL
2. **Autenticación**: Implementar login/registro de usuarios
3. **Pagos**: Integrar pasarela (Stripe, PayU, MercadoPago)
4. **Testing**: Agregar Jest + React Testing Library
5. **CI/CD**: Configurar GitHub Actions o similar
6. **Monitoreo**: Integrar Sentry para error tracking
7. **Analytics**: Agregar Google Analytics o Mixpanel

---

## 13. Contacto y Soporte

Para dudas técnicas sobre la infraestructura, consultar:
- Documentación de Vite: https://vitejs.dev
- Documentación de React: https://react.dev
- Documentación de Tailwind: https://tailwindcss.com

---

*Documento generado para Travel Marketplace v1.0.0*
