# 30Flowers

30Flowers is an interactive birthday web app built with Next.js, Tailwind CSS, and TypeScript. It shows a garden of 30 clickable flowers; each flower opens a memory and updates progress.

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Jest + Testing Library

## Prerequisites

- Node.js 18.18+ (Node.js 20 LTS recommended)
- npm

## Install

```bash
npm install
```

## Development

Start the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Use a custom port:

```bash
PORT=4000 npm run dev
```

## Build and run (production)

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Test with npm

Run the test suite:

```bash
npm test
```

## Lint

```bash
npm run lint
```

## Project structure

- `app/layout.tsx` - root layout and metadata
- `app/page.tsx` - home route
- `app/globals.css` - Tailwind and global styles
- `components/flower-garden.tsx` - interactive UI logic
- `data/memories.ts` - memory content
- `__tests__/flower-garden.test.tsx` - basic interaction test

## Notes

- Legacy static files were removed after the Next.js migration.

