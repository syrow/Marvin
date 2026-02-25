FROM node:20-alpine AS base

# All deps stage
FROM base AS deps
WORKDIR /app
# RUN yarn config set registry https://registry.npmmirror.com/
ADD package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
# RUN yarn config set registry https://registry.npmmirror.com/
ADD package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build --ignore-ts-errors

# Production stage
FROM base
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE $PORT
CMD ["node", "./bin/server.js"]
