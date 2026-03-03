# Multi-stage: build Vite SPA, then serve with nginx.
# Build args (VITE_*) are injected at image build time (e.g. by GitHub Actions).

# --- Stage 1: build ---
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Vite bakes env at build time — pass via build-args in CI
ARG VITE_TELEGRAM_BOT_TOKEN
ARG VITE_TELEGRAM_CHAT_ID
ARG VITE_POCKETBASE_URL
ARG VITE_SITE_URL
ENV VITE_TELEGRAM_BOT_TOKEN=$VITE_TELEGRAM_BOT_TOKEN
ENV VITE_TELEGRAM_CHAT_ID=$VITE_TELEGRAM_CHAT_ID
ENV VITE_POCKETBASE_URL=$VITE_POCKETBASE_URL
ENV VITE_SITE_URL=$VITE_SITE_URL

RUN pnpm run build

# --- Stage 2: serve ---
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
