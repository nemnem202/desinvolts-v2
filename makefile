dev:
	docker compose --env-file .env.dev -f docker-compose.dev.yml up --build
prod:
	docker compose -f docker-compose.prod.yml up --pull always
clear-dev:
	docker compose -f docker-compose.dev.yml down -v
clear-prod:
	docker compose -f docker-compose.prod.yml down -v
free-space:
	docker volume prune -f
	docker image prune -a -f
	docker container prune -f
update-prod:
	docker build -t ghcr.io/nemnem202/desinvolt:prod -f dockerfile.prod .
	docker push ghcr.io/nemnem202/desinvolt:prod

seed-dev:
	docker exec -it desinvolt-app-dev pnpm dlx tsx server/config/triggerSeed.ts

seed-prod:
	docker exec -it desinvolt-app-prod node dist/server/config/triggerSeed.mjs