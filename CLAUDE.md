# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build to dist/
npm run watch      # Watch mode build
npm test           # Run unit tests with Vitest
```

To run a single test file, use:
```bash
npx ng test --include="**/auth.service.spec.ts"
```

Formatting is handled by Prettier (printWidth: 100, singleQuote, angular parser for HTML). Run manually with:
```bash
npx prettier --write "src/**/*.{ts,html,scss}"
```

## Architecture

**Framework:** Angular 21 with standalone components only — no NgModules anywhere.

**Entry points:**
- `src/main.ts` → bootstraps via `src/app/app.config.ts` (providers) + `src/app/app.ts` (root component)
- `src/app/app.routes.ts` → all routes defined here, all feature components are lazy-loaded via `loadComponent`

**Directory layout:**
- `src/app/core/` — singletons: `auth/guards/`, `auth/interceptors/`, `auth/services/`, `auth/models/`
- `src/app/features/` — one subfolder per page/feature (`auth/login`, `auth/register`, `dashboard`, `products`, `orders`)
- `src/app/shared/components/` — reusable UI components (currently `navbar/`)
- `src/environments/` — `environment.ts` (dev: `https://localhost:44302/api`) and `environment.prod.ts` (prod: `/api`)

## Key Patterns

**State management:** Angular Signals only — no NgRx. Services expose `readonly` signals via `signal().asReadonly()` and `computed()`. Component-local state (loading, errors) also uses signals.

**Dependency injection:** Always use `inject()` function, not constructor injection.

**HTTP interceptor:** `src/app/core/auth/interceptors/jwt.interceptor.ts` — functional `HttpInterceptorFn` that attaches `Bearer <token>` to every request and auto-calls `authService.logout()` on 401.

**Auth flow:** Token stored in `localStorage` under key `access_token`. `AuthService` decodes the JWT client-side (base64) to derive `currentUser`, `userRole`, and expiration. Guards (`authGuard`, `guestGuard`) are functional `CanActivateFn`.

**Route protection:**
- `/orders` and other private routes use `authGuard`
- `/auth/login`, `/auth/register` use `guestGuard` (redirect authenticated users away)

**Forms:** Reactive Forms with `inject(FormBuilder)`. Cross-field validators are defined as `ValidatorFn` closures passed to the group.

**Styling:** SCSS with component-scoped styles. Global utility classes live in `src/styles.scss` — auth page layout (`.auth-wrapper`, `.auth-card`), form fields (`.form-group`, `.error-hint`, `.alert-error`), buttons (`.btn-primary`, `.btn-outline`). Color palette: primary red `#e94560`, dark `#1a1a2e`, light bg `#f5f5f5`.

**TypeScript:** Strict mode enabled. No implicit `any`. Target ES2022.
