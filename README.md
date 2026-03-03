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

### Option A: Pre-built image (CI/CD) — recommended

The image is built in GitHub Actions and pushed to GitHub Container Registry (ghcr.io). The server only needs to pull and run the image — no build on the server.

1. **Repository secrets**  
   In GitHub: **Settings → Secrets and variables → Actions** add:
   - `VITE_TELEGRAM_BOT_TOKEN`
   - `VITE_TELEGRAM_CHAT_ID`
   - `VITE_POCKETBASE_URL`
   - `VITE_SITE_URL`

2. **Build the image**  
   On push to `main` (or via **Run workflow** in Actions) the workflow runs: Docker image build and push to `ghcr.io/<owner>/<repo>:latest`.

3. **Coolify: run from image**  
   - Application type: **Docker Image** (not Nixpacks/Static).
   - Image: `ghcr.io/<your-username>/<repo>:latest` (e.g. `ghcr.io/olegkarmazyn/nakawkeproto:latest`).
   - If the repo is private: in Coolify add Registry (ghcr.io) with a GitHub token (Scope: `read:packages`).
   - Container port: `80`. No extra start command.

Environment variables are baked into the image at CI build time; you do not need to set them in Coolify for this option.

#### If the app was already deployed in Coolify (server-side build)

Steps to switch to the pre-built image:

1. **GitHub secrets**  
   Add the same values already in Coolify’s Environment Variables as repository **Secrets** (Settings → Secrets and variables → Actions):  
   `VITE_TELEGRAM_BOT_TOKEN`, `VITE_TELEGRAM_CHAT_ID`, `VITE_POCKETBASE_URL`, `VITE_SITE_URL`.  
   The image will then be built with the same config as before.

2. **First image in CI**  
   Push to `main` or manually run the **Build and push Docker image** workflow in GitHub Actions. Wait for it to finish — the image will appear in ghcr.io.

3. **Switch the Coolify app to the image**  
   - In the app settings, change type from **Nixpacks** / **Static** to **Docker Image**.
   - Set the image to: `ghcr.io/<owner>/<repo>:latest` (lowercase, e.g. `ghcr.io/olegkarmazyn/nakawkeproto:latest`).
   - If the repo is private — in Coolify add the **ghcr.io** registry and a GitHub token with `read:packages`.
   - Container port: **80**.
   - Save settings.

4. **Redeploy**  
   Trigger a deploy. Coolify will pull the image and run the container; the server no longer runs a build.

**About Coolify env vars:** for **Docker Image** type, environment variables in Coolify’s Environment Variables are **not used** — everything is already in the image. You can leave them (they have no effect) or remove them. Domain, SSL, and proxy are configured in Coolify as before.

---

### Option B: Build on server (Nixpacks)

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Start command:** not needed; application type «Static», root — `dist`.

Nixpacks builds the project on the server from `package.json` and Vite. For a low-powered server, Option A is preferred.

### Environment variables (Option B only)

Vite injects env vars at **build time**. In Coolify add them in the app’s **Environment Variables** (Build-time / Build Args), not at runtime.

1. Open your app in Coolify → **Environment Variables** (or **Build** → **Build Arguments**).
2. Add each variable as **Key** = **Value** (no `export`, no spaces around `=`):

| Key | Value | Notes |
|-----|--------|--------|
| `VITE_TELEGRAM_BOT_TOKEN` | Your bot token from [@BotFather](https://t.me/BotFather) | Required for lead notifications |
| `VITE_TELEGRAM_CHAT_ID` | Numeric chat ID (e.g. from [@userinfobot](https://t.me/userinfobot)) | Where leads are sent |
| `VITE_POCKETBASE_URL` | `https://your-pocketbase-instance.com` | PocketBase API URL |
| `VITE_SITE_URL` | `https://nakawke.pl` | Production base URL for canonical/OG |

3. Save and **rebuild** the app so the new values are baked into the build.

Do not commit real tokens; set them only in Coolify and in local `.env` (`.env` is in `.gitignore`).

### SPA and React Router

The project uses React Router (routes `/`, `/pakiet-standard`, `/pakiet-premium`). To avoid 404 on direct navigation and page refresh:

- **Option A (Docker):** the image already includes nginx with `try_files $uri $uri/ /index.html;` — nothing to configure.
- **Option B (Static):** in Coolify enable **SPA / History fallback**, or use `public/_redirects` (Netlify), or configure nginx per `nginx.conf.example`.

## Assets from Figma

Imports `figma:asset/...` are replaced with a transparent placeholder at build time. For production replace them with real URLs or put files in `public/` and use paths like `/filename.png`.
