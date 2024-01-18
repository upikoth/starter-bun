# Stage 1. Build.

FROM oven/bun:1.0.23-alpine as build

WORKDIR /starter-bun

COPY package.json package-lock.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . ./

RUN bun run build

# Stage 2.

FROM oven/bun:1.0.23-alpine

COPY --from=build /starter-bun/dist/ ./

ENTRYPOINT [ "bun", "run", "index.js" ]

EXPOSE 4000
