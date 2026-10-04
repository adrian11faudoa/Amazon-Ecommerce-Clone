# Multi-stage build for local/CI use. Production image build/publish
# pipeline (registry, scanning, base-image pinning policy) is defined by
# the infrastructure milestone, not this one.
FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 3000
USER node
CMD ["node", "dist/main.js"]
