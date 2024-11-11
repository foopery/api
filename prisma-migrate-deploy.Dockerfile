FROM node:20-alpine AS builder

WORKDIR /app

COPY ./prisma ./prisma

RUN npm install prisma


FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules /node_modules

CMD ["npx", "prisma", "migrate", "deploy"]
