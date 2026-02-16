/**
 * Solo para copiar a WL- (main app). No se usa en este repo.
 *
 * En WL-:
 * 1. Copiar este archivo a frontend/src/landing/LandingShell.tsx
 * 2. Descomentar la línea del import de landing.css
 * 3. Generar landing.css: en este repo "npm run build" → copiar dist/assets/index-*.css
 *    como frontend/src/landing/landing.css
 */

import { type ReactNode } from 'react';

// En WL- descomentar:
// import './landing.css';

export function LandingShell({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
