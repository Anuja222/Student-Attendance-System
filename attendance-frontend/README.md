# attendance-frontend

Next.js + TypeScript frontend scaffolded with a `src/` app router layout, feature folders, API hooks, Redux state, and shared UI utilities.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run typecheck
npm run build
```

## Docker

```bash
docker build -t attendance-frontend .
docker run -p 3000:3000 attendance-frontend
```

## Structure

- `src/app/` app router pages, layouts, and local API routes
- `src/components/` reusable feature and UI components
- `src/api/` API client, hooks, and types
- `src/context/` shared React context providers
- `src/hooks/` reusable client hooks
- `src/redux/` store, slices, and typed hooks
- `src/utils/` helper functions
- `src/icons/` icon components and barrel exports
