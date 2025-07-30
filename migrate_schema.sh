npx drizzle-kit generate

docker run --rm \
  --network=soberstreak_default \
  -v $(pwd)/migrations:/app/migrations \
  --env-file $(pwd)/.env.db \
  node:24.0.2-alpine3.21 npx drizzle-kit migrate
