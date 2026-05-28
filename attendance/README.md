# attendance

Maven Spring Boot backend scaffold with layered packages, Flyway migrations, PostgreSQL support, and profile-based configuration.

## Run locally

Set database environment variables for the active profile, then run:

```bash
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

## Build and test

```bash
./mvnw test
./mvnw clean package
```

## Docker

```bash
docker build -t attendance-backend .
docker run -p 8080:8080 \
  -e DB_URL=jdbc:postgresql://host:5432/attendance \
  -e DB_USERNAME=attendance \
  -e DB_PASSWORD=attendance \
  attendance-backend
```

## Profiles

- `dev`: local PostgreSQL defaults from environment variables
- `prod`: explicit production environment variables only
- `test`: H2-backed test profile for integration tests

## Package layout

- `config`: application configuration
- `controller`: REST controllers
- `service`: service layer interfaces and implementations
- `repository`: JPA repositories
- `entity` and `model`: persistence and response models
- `dto`: request and response objects
- `mapper`: DTO/entity conversion
- `security`: Spring Security configuration
- `exception`: error handling
- `util`: shared helpers