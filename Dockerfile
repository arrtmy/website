# Use official Node.js LTS image
FROM node:20-alpine AS builder
WORKDIR /app

# Copy frontend sources
COPY frontend/package*.json ./frontend/
COPY frontend/ ./frontend/

# Install deps and build
WORKDIR /app/frontend
RUN npm ci --production=false
RUN npm run build

# Production image
FROM node:20-alpine
WORKDIR /app

# Copy built frontend and server code
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY frontend/server.js ./frontend/server.js

# Install only production deps for server (express)
WORKDIR /app/frontend
RUN npm ci --omit=dev

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
