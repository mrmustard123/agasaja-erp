# Laravel + React Project

This repository is divided into two main parts:

- laravel-api/: backend built with Laravel
- reactfront/: frontend built with React

## Objective

The application is designed as a full-stack practice project, where the backend exposes a REST API and the frontend consumes those endpoints to display information in the UI.

## Project Structure

### Backend (Laravel)
Path: laravel-api/

Contains:
- Laravel configuration
- models
- controllers
- API routes
- migrations and seeders
- business logic and database access

Common commands:
- cd api
- composer install
- cp .env.example .env
- php artisan key:generate
- php artisan migrate
- php artisan serve

### Frontend (React)
Path: reactfront/

Contains:
- components
- pages
- styles
- client-side logic
- API consumption

Common commands:
- cd reactfront
- npm install
- npm start

## Working Conventions

- The backend is always worked on inside laravel-api/
- The frontend is always worked on inside reactfront/
- If the API is changed, the frontend that consumes it must also be reviewed
- Do not modify files generated in build/ unless explicitly indicated
- Migrations and models belong to the backend

## Environment Variables

The backend needs a valid database configuration in api/.env.
The frontend normally points to the API with a local URL, for example:
- http://localhost:8741/api

## Typical Workflow

1. Run the API in Laravel
2. Run the frontend in React
3. Verify backend endpoints
4. Connect the UI with those endpoints
5. Validate changes with migrations, tests, or manual testing

## Notes for Assistants or Agents

This project is not a single monolithic app; it is separated by responsibilities:
- laravel-api/ = business logic, persistence, and API
- reactfront/ = visual interface and data consumption

When working here, it is always advisable to first identify whether the change belongs to the backend or the frontend before editing files.

## Important Files

- laravel-api/routes/api.php
- laravel-api/app/Models/
- laravel-api/app/Http/Controllers/
- laravel-api/database/migrations/
- reactfront/src/

## Running the Project

To run the full development environment, you need to open two independent terminals, one for the backend and one for the frontend:

### 1. Backend Server (Laravel)
In the terminal, navigate to the API folder and start the server on the configured port:

```bash
$ cd laravel-api
# Make sure you have APP_URL=http://localhost:8741 configured in your .env file
$ php artisan serve --port=8741
```


### 2. Frontend Environment (React)
In a second terminal, navigate to the frontend folder and run the development server:

```bash
$ cd reactfront
$ npm run dev
```
Note: The API will be available at http://localhost:8741 and the frontend will connect to it through that URL. Make sure that the environment variables in reactfront/ (or wherever you define the base API URL) point correctly to this port.

## API Reference (Summary)

Base URL: `http://localhost:8741/api`

- POST `/register` — Register user
- POST `/login` — Log in (returns `token`)
- GET `/products` — List products (protected)
- POST `/products` — Create product (protected)
- GET `/products/{id}` — View product (protected)
- PUT `/products/{id}` — Update product (protected)
- DELETE `/products/{id}` — Delete product (protected)

Authentication: JWT
- The backend uses `php-open-source-saver/jwt-auth`. After `register` and `login` you will get a JWT `token`.
- Include the token in protected requests with the header: `Authorization: Bearer <token>`

Quick examples (curl)

1) Register user:

```bash
curl -i -X POST http://127.0.0.1:8741/api/register \
        -H "Content-Type: application/json" \
        -d '{"name":"TestUser","email":"test@example.com","password":"12345678","password_confirmation":"12345678"}'
```

2) Login (gets `token`):

```bash
curl -i -X POST http://127.0.0.1:8741/api/login \
        -H "Content-Type: application/json" \
        -d '{"email":"test@example.com","password":"12345678"}'
```

Expected response (example):

```json
{"message":"User logged in successfully","user":{...},"token":"<JWT>","token_type":"bearer","expires_in":3600}
```

3) Create product (example):

```bash
curl -i -X POST http://127.0.0.1:8741/api/products \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer <JWT>" \
        -d '{"name":"Test Product","description":"A test","price":9.99,"stock":10}'
```

Migrations and additional steps
- Copy `.env` and configure DB (MySQL) and `APP_URL=http://localhost:8741`.
- Run:

```bash
cd laravel-api
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate
php artisan serve --port=8741
```

Quick Notes
- If you see errors related to CSRF when testing API endpoints, make sure that the API routes are loaded by the API stack (in this project `bootstrap/app.php` has been configured for that).
- The `User` model implements the required interface for JWT; if you change the JWT package check `app/Models/User.php`.
- For local development use port `8741` (standardized in this repo).
