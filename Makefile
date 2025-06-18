.DEFAULT_GOAL := up

# Проверка ОС (для поддержки WSL)
ifeq ($(OS),Windows_NT)
    DOCKER_COMPOSE = docker-compose
else
    DOCKER_COMPOSE = docker compose
endif

prod:
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml up --build
.PHONY: prod

up:
	$(DOCKER_COMPOSE) -f docker-compose.dev.yml up
.PHONY: up

down:
	$(DOCKER_COMPOSE) -f docker-compose.dev.yml down
.PHONY: down