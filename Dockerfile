# Stage 1. Build.

FROM oven/bun:1.1.10-alpine as build

WORKDIR /starter-bun

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . ./

RUN bun run build

# Stage 2.

FROM oven/bun:1.1.10-alpine

COPY --from=build /starter-bun/dist/ ./

ENTRYPOINT [ "bun", "run", "index.js" ]

EXPOSE 8000
