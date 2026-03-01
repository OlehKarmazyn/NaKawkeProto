# Na Kawkę

Landing page — autonomous coffee business (Vite + React).

## Local development

```bash
npm install
npm run dev
```

Or:

```bash
npm start
```

Open http://localhost:5173

## Build

```bash
npm run build
```

Static output is written to **dist/**.

To verify production build locally:

```bash
npm run preview
```

## Deploy on Coolify

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Start command:** not needed for static; choose app type «Static» and set root to `dist`.

Nixpacks detects the project via `package.json` and Vite as a Node.js app. For static hosting, the contents of `dist/` are served after build.

### SPA and React Router

The project uses React Router (routes `/`, `/pakiet-standard`, `/pakiet-premium`). To avoid 404 on direct navigation and page refresh:

- In Coolify for static apps enable **SPA / History fallback** if available, or
- Use `public/_redirects` (Netlify format): on Netlify-like hosting the file is copied to `dist/` and handled automatically.
- For your own nginx add to config: `try_files $uri $uri/ /index.html;`
- Full nginx config example for Docker: see `nginx.conf.example` in the project root.

## Assets from Figma

Imports `figma:asset/...` are replaced with a transparent placeholder at build time. For production replace them with real URLs or put files in `public/` and use paths like `/filename.png`.
