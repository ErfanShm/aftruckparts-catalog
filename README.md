# AF Truck Parts Catalog

Product catalog for AF Truck Parts — browse truck parts by code, brand, finish, and Euro spec.

## Stack

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (file-based routing)
- React 19, TypeScript, Vite
- Tailwind CSS 4, Radix UI, Framer Motion

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 10+ (`corepack enable` recommended)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start dev server         |
| `pnpm build`   | Production build         |
| `pnpm preview` | Preview production build |
| `pnpm lint`    | Run ESLint               |
| `pnpm format`  | Format with Prettier     |

## Project layout

```
src/
  routes/       # Pages (file-based routing; see src/routes/README.md)
  assets/       # Images and static assets
  components/   # Shared UI components
public/         # Public static files
```

## License

Private — AF Truck Parts.
