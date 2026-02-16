# Fusión sin alterar la main app (WL-)

**Objetivo:** Integrar la landing en WL- de forma que **nada del main app se altere**. Solo se **añaden** rutas, una carpeta nueva, dependencias nuevas y un recurso estático. Cero cambios en archivos existentes de la app principal (salvo líneas nuevas en `AppRouter` y `package.json`).

---

## 1. Regla de oro

En WL- **no se modifica**:

- `src/main.tsx`
- `src/index.css`
- `src/App.tsx`
- `tailwind.config.js`
- `postcss.config.js`
- `vite.config.ts`
- Ningún componente existente (mapa, Dashboard, LoginForm, RegisterForm, etc.)

**Solo se añade:**

- Rutas nuevas en `AppRouter.tsx` (nuevas líneas `<Route ... />`).
- Carpeta `src/landing/` con componentes y **un único CSS ya compilado** de la landing.
- Dependencias nuevas en `package.json` (las que solo usa la landing).
- Archivo `public/world.geo.json`.

---

## 2. Cómo se evita tocar el Tailwind/CSS del main app

La landing usa Tailwind v4 y estilos propios. En vez de tocar el Tailwind de WL- ni su `index.css`:

1. **En este repo (landing):** se hace `npm run build`.  
   Se genera `dist/assets/index-XXXXX.css` con todos los estilos de la landing.

2. **En WL-:** se copia ese CSS como **un solo archivo** dentro de la landing, por ejemplo:  
   `frontend/src/landing/landing.css`  
   (puedes renombrar el archivo generado o pegar su contenido en `landing.css`).

3. **Solo ese archivo** se importa desde el **wrapper de la landing** (ver más abajo).  
   Así la main app **no importa** el CSS de la landing desde `index.css` ni mezcla configuraciones de Tailwind. El Tailwind y el `index.css` de WL- quedan intactos.

---

## 3. Wrapper de la landing (carga su propio CSS)

En WL-, dentro de `src/landing/` hace falta un componente que importe **solo** `./landing.css` y renderice `children`. Así no se toca el CSS global de WL-.

**Plantilla lista para copiar:** en este repo está `src/landing-wl/LandingShell.tsx`. Cópialo a WL- como `frontend/src/landing/LandingShell.tsx` y en WL- **descomenta** la línea `import './landing.css';`.

---

## 4. Cambios **únicamente aditivos** en WL-

### 4.1 `AppRouter.tsx`

Solo **añadir** rutas. No quitar ni cambiar las existentes (/, /dashboard, /login, /register).

Ejemplo (sustituir los nombres de componentes por los que tengas al copiar la landing):

```tsx
// Añadir imports al inicio (nuevas líneas)
import { LandingShell } from './landing/LandingShell';
import LandingHome from './landing/components/Home';
import MobilityAI from './landing/components/MobilityAI';
import InvestmentAI from './landing/components/InvestmentAI';
import About from './landing/pages/About';
import PrivacyPolicy from './landing/components/PrivacyPolicy';
import TermsOfService from './landing/components/TermsOfService';
import { lazy, Suspense } from 'react';

const MobilityAI = lazy(() => import('./landing/components/MobilityAI'));
// ... etc para los demás si quieres lazy

// Dentro del <Routes>, AÑADIR estas rutas (las actuales se quedan igual)
<Route path="/landing" element={<LandingShell><LandingHome /></LandingShell>} />
<Route path="/mobility-ai" element={<LandingShell><MobilityAI /></LandingShell>} />
<Route path="/investment-ai" element={<LandingShell><InvestmentAI /></LandingShell>} />
<Route path="/about" element={<LandingShell><About /></LandingShell>} />
<Route path="/privacy-policy" element={<LandingShell><PrivacyPolicy /></LandingShell>} />
<Route path="/terms-of-service" element={<LandingShell><TermsOfService /></LandingShell>} />
```

Así la **home** del main app sigue en `/` (mapa) y la landing vive en `/landing` y en las demás rutas que elijas. No se altera el comportamiento actual de la app.

### 4.2 `package.json` (frontend de WL-)

Solo **añadir** dependencias. No quitar ni cambiar versiones de las que ya usa el main app.

Añadir (con versiones compatibles con React 19):

- `three`, `@react-three/fiber`, `@react-three/drei`, `react-globe.gl`, `three-globe`, `d3-geo`, `d3-geo-projection`, `gsap`, `vanta`, `animejs`, `@react-spring/three`, `postprocessing`, `three-stdlib`, `leva`, etc.  
  (Lista completa en el `package.json` de este repo, sección `dependencies`.)

### 4.3 Carpeta `src/landing/`

- Copiar aquí los componentes/páginas de la landing (Home, MobilityAI, InvestmentAI, About, PrivacyPolicy, TermsOfService, Navbar, Footer, Hero, etc.).
- Ajustar **solo** los imports entre ellos para que apunten a `./components/...` o `./pages/...` dentro de `landing/`.
- Incluir en esta carpeta:
  - `landing.css` (el CSS compilado de la landing, ver apartado 2).
  - `LandingShell.tsx` (o el nombre que uses para el wrapper que importa `landing.css`).

### 4.4 `public/`

- Copiar `world.geo.json` (el de este repo en `public/world.geo.json`) a `frontend/public/world.geo.json`.

---

## 5. Resumen: qué se toca y qué no

| En WL- | Acción |
|--------|--------|
| `main.tsx` | No tocar |
| `index.css` | No tocar |
| `App.tsx` | No tocar |
| `tailwind.config.js` | No tocar |
| `postcss.config.js` | No tocar |
| `vite.config.ts` | No tocar (opcional: alias `@/landing` si quieres; no obligatorio) |
| Cualquier componente existente del mapa/dashboard/login/register | No tocar |
| **AppRouter.tsx** | Solo **añadir** imports y `<Route ... />` nuevas |
| **package.json** | Solo **añadir** dependencias en `dependencies` |
| **Nuevo** `src/landing/` | Carpeta nueva con componentes + `landing.css` + `LandingShell.tsx` |
| **Nuevo** `public/world.geo.json` | Archivo nuevo |

Con esto, **nada del main app se altera** más allá de esas líneas nuevas en router y package.json; el resto es contenido nuevo y aislado en `landing/` y en `public/`.

---

## 6. Pasos concretos (checklist)

1. **En este repo (landing):** `npm run build` → copiar `dist/assets/index-*.css` (el CSS generado) y guardarlo como `landing.css` para llevarlo a WL-.
2. **En WL- frontend:** Crear carpeta `src/landing/`.
3. Copiar a `src/landing/`:
   - Los componentes/páginas de la landing (desde este repo: `src/components/`, `src/pages/`) y ajustar imports entre ellos.
   - El archivo `landing.css` (el del paso 1).
   - `LandingShell.tsx` desde este repo `src/landing-wl/LandingShell.tsx`; en WL- descomentar `import './landing.css'`.
4. **AppRouter.tsx (WL-):** Añadir solo los nuevos `import` y las nuevas `<Route ... />` que envuelven cada vista de la landing con `<LandingShell>...</LandingShell>`.
5. **package.json (WL-):** Añadir las dependencias que falten (three, react-three-fiber, etc.; lista en el `package.json` de este repo).
6. **public (WL-):** Copiar `world.geo.json` desde este repo a `frontend/public/world.geo.json`.
7. No modificar `main.tsx`, `index.css`, `App.tsx`, `tailwind.config.js`, `postcss.config.js`, `vite.config.ts` ni componentes existentes del main app.
