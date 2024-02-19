FROM node:18.15-alpine AS base

FROM base as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base as runner
WORKDIR /app

ARG ENVIRONMENT
ENV ENV=$ENVIRONMENT

RUN echo "Setting the server for $ENV environment"

COPY --from=builder /app/ ./

RUN addgroup -g 1001 -S discovervet-api
RUN adduser -S discovervet-api -u 1001
RUN chown -R discovervet-api:discovervet-api /app

USER discovervet-api

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
