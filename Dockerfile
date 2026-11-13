# Multi-stage Dockerfile for Temple Website Full-Stack Application
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy source code and build client
COPY . .
RUN npm run build

# Production runtime stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# Copy server code, configuration, and built client dist
COPY server ./server
COPY --from=build /app/dist ./dist

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server/server.js"]
