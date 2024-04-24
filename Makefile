YML_PATH := ./srcs/docker-compose.yml

.PHONY: build
build:
	docker-compose -f $(YML_PATH) up --build -d

.PHONY: up
up:
	docker-compose -f $(YML_PATH) up -d

.PHONY: down clean
clean down:
	docker-compose -f $(YML_PATH) down

.PHONY: fclean
fclean:
	docker-compose -f $(YML_PATH) down --volumes

.PHONY: re
re: fclean
	make build
