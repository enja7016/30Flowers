# 30Flowers

A small Node.js web app that serves a birthday-themed interactive page with 30 clickable flowers. Each flower opens a memory modal and updates progress until all 30 are opened.

## What this project is

- Frontend: plain HTML, CSS, and JavaScript (`index.html`, `style.css`, `script.js`)
- Backend: a lightweight Node HTTP server (`server.js`) that serves static files
- Default local URL: `http://localhost:3000`

## Prerequisites

- Node.js 18+ (recommended)
- npm (comes with Node.js)

## Install

```bash
npm install
```

## Run (development)

The project uses `nodemon` via the `start` script for auto-reload while developing:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

You can override the port with `PORT`:

```bash
PORT=4000 npm start
```

## Build

There is currently no `build` script in `package.json`.

To check available scripts:

```bash
npm run
```

If you later add a build step, run it with:

```bash
npm run build
```

## Test (npm)

There is currently no `test` script in `package.json`.

Safe command that only runs tests if a test script exists:

```bash
npm run test --if-present
```

If you add tests later, use:

```bash
npm test
```

## Project structure

- `index.html` - main page
- `style.css` - styles and layout
- `script.js` - flower interactions, modal behavior, progress tracking
- `server.js` - Node HTTP server for static file serving
- `images/` - optional memory assets

