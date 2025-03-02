######################### All Services ################################

.PHONY: build
# Build services
build:
	docker compose build

############################ backend service ##########################

.PHONY: backend-check
# Check route healthz
backend-check:
	docker exec -it react-express-mysql-backend-1 curl localhost/healthz

.PHONY: backend-inspect
# Inspect health log
backend-inspect:
	docker inspect --format '{{json .State.Health}}' react-express-mysql-backend-1 | jq

.PHONY: backend-bash
# Start backend bash shell
backend-bash:
	docker exec -it react-express-mysql-backend-1 /bin/bash

########################## db service ###############################

.PHONY: db-mysql
# Start mysql in interactive mode
# Input the content inside db/password.txt when prompt
db-mysql:
	docker exec -it react-express-mysql-db-1 mysql -u root -p

######################### frontend service ##########################

.PHONY: frontend-curl
frontend-curl:
	docker exec -it react-express-mysql-frontend-1 curl localhost:5173