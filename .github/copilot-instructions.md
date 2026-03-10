## Purpose

This file gives concise, actionable guidance for AI coding agents working on this React + Vite project.

## Quick summary
- Framework: React (v18) bootstrapped for Vite (see `vite` in `package.json`).
- Entry: `src/main.jsx` -> `src/App.jsx`.
- API layer: `src/services/Api.js` (use `axios`).
- Auth: `src/AuthContext.jsx` provides `AuthProvider` and `useAuth()` (currently contains bugs; review before editing).

## Useful scripts (from `package.json`)
- `npm run dev` — start Vite dev server (HMR).
- `npm run build` — produce production build via `vite build`.
- `npm run preview` — preview the production build.
- `npm run lint` — run ESLint across `.js`/`.jsx` files.

## Architecture & patterns
- Single-page app: all UI lives under `src/` with each component paired to a `.css` file (e.g., `Productos.jsx` + `productos.css`).
- Co-located styles: component CSS files live next to their components.
- Services: network logic centralised under `src/services/` (ex: `Api.js`, `Services.jsx`). Prefer adding fetch wrappers here.
- Shared providers: `src/AuthContext.jsx` intended to provide authentication state and helpers via `useAuth()`.

## Authentication specifics (important)
- Token storage: the app stores the auth token in `localStorage` under the key `token`.
- Hook usage: consume auth state by importing `useAuth()` (example):

```jsx
import { useAuth } from '../AuthContext.jsx';
const { login, logout, isloggedin } = useAuth();
// call login(token) to persist token and set state
```

- NOTE: `src/AuthContext.jsx` currently has syntax and logic errors (mis-capitalised props, incorrect exports, `setIsloggedin("falase")`, stray/invalid hooks). If changing auth behaviour, fix the provider shape and exports first.

## API & external integrations
- HTTP client: `axios` is used by services. Search `src/services` for request wrappers.
- Maps: `@react-google-maps/api` is a dependency (components under `Mapa.jsx` / `MapaGeolocalizacion.jsx`). Be careful with API keys and sensitive data.

## Conventions and code patterns
- Files: component filenames are PascalCase (`Encabezado.jsx`) with adjacent CSS (`Encabezado.css`).
- Hooks & context: custom hooks/providers live at top-level of `src/` (e.g., `AuthContext.jsx`).
- No TypeScript: codebase uses JavaScript with React typings present in `devDependencies` only.

## Where to look for common tasks
- Add a page/component: create `src/YourComponent.jsx` and `src/YourComponent.css`, then import into `App.jsx` or routes.
- Add API call: extend `src/services/Api.js` and re-use in components via `ProductosServices.jsx` pattern.
- Fix auth flows: edit `src/AuthContext.jsx` and verify components using `useAuth()` (login/logout and conditional UI in `Encabezado.jsx` / `Usuario.css`).

## Safety and linting
- Run `npm run lint` before commits; existing ESLint config is strict (`--max-warnings 0`).

## Examples & pointers to inspect
- Entry & bootstrap: [React/src/main.jsx](React/src/main.jsx#L1)
- App root: [React/src/App.jsx](React/src/App.jsx#L1)
- Auth provider (inspect before editing): [React/src/AuthContext.jsx](React/src/AuthContext.jsx#L1-L200)
- Service layer: [React/src/services/Api.js](React/src/services/Api.js#L1-L200)
- Build/dev scripts: [React/package.json](React/package.json#L1-L80)

## If you make changes
- Run `npm run dev` to test the dev server with HMR.
- Lint with `npm run lint` to catch style/regression issues.
- For auth changes, ensure token persistence and `useAuth()` consumers are updated.

---
If anything here is unclear or you want more detail about a specific area (routing, product services, or auth flows), tell me which area and I'll expand or update this file.
