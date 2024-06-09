# How to run

## Docker Compose Unified version example

```yaml
version: "3"

networks:
    aswiki: {}

services:
    server:
        image: ghcr.io/suchenia-arkadiusz/as-wiki-unified:latest
        container_name: as-wiki
        restart: always
        ports:
            - "3000:3000"
        depends_on:
            - db
        links:
            - db
        networks:
            - "aswiki"
        environment:
            - DB_HOST=db
            - DB_USERNAME=aswiki
            - DB_PASSWORD=dbPassword
            - DB_NAME=aswiki
            - APP_ADMIN_USER_PASSWORD=adminPassword
            - APP_ADMIN_USER_EMAIL=admin@email.com
            - APP_TOKEN_SECRET=tokenSecret
            - APP_ENV=prod
    db:
        image: postgres:16.1-alpine3.19
        container_name: aswiki_db_dev
        restart: always
        healthcheck:
            test: ["CMD-SHELL", "pg_isready", "-d", "aswiki"]
            interval: 30s
            timeout: 60s
            retries: 5
            start_period: 80s
        networks:
            - "aswiki"
        environment:
            - POSTGRES_PASSWORD=dbPassword
            - POSTGRES_USER=aswiki
            - POSTGRES_DB=aswiki
        volumes:
            - ./db:/var/lib/postgresql
```

## Docker Compose example

```yaml
version: "3"

networks:
    aswiki: {}

services:
    ui:
        image: ghcr.io/suchenia-arkadiusz/as-wiki-ui:latest
        container_name: aswiki_ui
        restart: always
        ports:
            - "80:80"
        networks:
            - "aswiki"
    server:
        image: ghcr.io/suchenia-arkadiusz/as-wiki-srv:latest
        container_name: aswiki_server
        restart: always
        depends_on:
            - db
        links:
            - db
        networks:
            - "aswiki"
        environment:
            - DB_HOST=db
            - DB_USERNAME=aswiki
            - DB_PASSWORD=dbPassword
            - DB_NAME=aswiki
            - APP_ADMIN_USER_PASSWORD=adminPassword
            - APP_ADMIN_USER_EMAIL=admin@email.com
            - APP_TOKEN_SECRET=tokenSecret
            - APP_ENV=prod
    db:
        image: postgres:16.1-alpine3.19
        container_name: aswiki_db_dev
        restart: always
        healthcheck:
            test: ["CMD-SHELL", "pg_isready", "-d", "aswiki"]
            interval: 30s
            timeout: 60s
            retries: 5
            start_period: 80s
        networks:
            - "aswiki"
        environment:
            - POSTGRES_PASSWORD=dbPassword
            - POSTGRES_USER=aswiki
            - POSTGRES_DB=aswiki
        volumes:
            - ./db:/var/lib/postgresql
```
