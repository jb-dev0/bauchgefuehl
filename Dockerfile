# syntax=docker/dockerfile:1
# Bauchgefühl in EINEM Container: PocketBase ist der Server (Port 8090) und liefert
# die App (statisch), die Datenbank-API (/api) und den Admin (/_/) selbst aus.

# 1) App bauen (statische Dateien)
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# 2) PocketBase holen
FROM alpine:3.22 AS pocketbase
ARG PB_VERSION=0.40.6
ARG TARGETARCH=amd64
RUN apk add --no-cache unzip ca-certificates \
 && wget -q "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${TARGETARCH}.zip" -O /tmp/pb.zip \
 && unzip /tmp/pb.zip -d /pb && rm /tmp/pb.zip

# 3) Laufzeit
FROM alpine:3.22
RUN apk add --no-cache ca-certificates tzdata wget
COPY --from=pocketbase /pb/pocketbase /pb/pocketbase
COPY --from=build /app/build /pb/pb_public
COPY pocketbase/pb_migrations /pb/pb_migrations
COPY pocketbase/pb_hooks /pb/pb_hooks
EXPOSE 8090
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD wget -qO- http://127.0.0.1:8090/api/health >/dev/null || exit 1
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb/pb_data", "--migrationsDir=/pb/pb_migrations", "--hooksDir=/pb/pb_hooks", "--publicDir=/pb/pb_public"]
