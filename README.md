# Laravel + React Project

# TREE

This is an example of the project directory tree.

```text
.
├── docs
│   ├── requirements
│   │   ├── changes
│   │   │   ├── 2026-10-17_FIX_Full-width screen applied.md
...
│   │   │   └── 2026-10-18_fix_problem_with_laravel-api_public_index.php.md
│   │   └── features
│   │       └── RF-001-sidebar-toggle-functionality.md
│   ├── sessions
│   │   └── 2026-10-17-chat-sidebarmenu-toggle-funcitonality.md
│   └── TODO.md
├── laravel-api
│   ├── app
│   │   ├── Http
│   │   │   └── Controllers
│   │   │       ├── AuthController.php
│   │   │       ├── Controller.php
│   │   │       ├── ProductController.php
│   │   │       └── UserFunctionalitiesController.php
│   │   ├── Models
│   │   │   ├── Account.php
│   │   │   ├── Apiario.php
│   │   │   ├── BalanceChecksum.php
│   │   │   ├── Bitacora.php
│   │   │   ├── Configuration.php
│   │   │   ├── Consignee.php
│   │   │   ├── ConsigProd.php
│   │   │   ├── Directive.php
│   │   │   ├── Entry.php
│   │   │   ├── Functionality.php
│   │   │   ├── Movement.php
│   │   │   ├── MovSupply.php
│   │   │   ├── PendEmpresa.php
│   │   │   ├── Pendiente.php
│   │   │   ├── PosHistory.php
│   │   │   ├── PosicDescripHist.php
│   │   │   ├── PosicSaludHist.php
│   │   │   ├── Position.php
│   │   │   ├── ProdCostProd.php
│   │   │   ├── ProductCost.php
│   │   │   ├── Product.php
│   │   │   ├── ProductPrice.php
│   │   │   ├── ProductProduct.php
│   │   │   ├── ProductSupply.php
│   │   │   ├── Supply.php
│   │   │   ├── SupplyPrice.php
│   │   │   ├── User.php
│   │   │   └── UsersGroup.php
│   │   └── Providers
│   │       ├── AppServiceProvider.php
│   │       └── RouteServiceProvider.php
│   ├── artisan
│   ├── bootstrap
│   │   ├── app.php
│   │   ├── cache
│   │   │   ├── packages.php
│   │   │   └── services.php
│   │   └── providers.php
│   ├── composer.json
│   ├── composer.lock
│   ├── config
│   │   ├── app.php
│   │   ├── auth.php
│   │   ├── cache.php
│   │   ├── database.php
│   │   ├── filesystems.php
│   │   ├── jwt.php
│   │   ├── logging.php
│   │   ├── mail.php
│   │   ├── queue.php
│   │   ├── services.php
│   │   └── session.php
│   ├── database
│   │   ├── database.sqlite
│   │   ├── factories
│   │   │   └── UserFactory.php
│   │   ├── migrations
│   │   │   ├── 2026_08_23_215144_create_account_table.php
│   │   │   ├── 2026_08_23_215144_create_apiario_table.php
...
│   │   └── seeders
│   │       └── DatabaseSeeder.php
│   ├── package.json
│   ├── phpunit.xml
│   ├── public
│   │   ├── assets
│   │   │   ├── index-Bwzvr3lh.css
...
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   ├── index.html
│   │   ├── index.php
│   │   ├── robots.txt
│   │   └── test.php
│   ├── README.md
│   ├── resources
│   │   ├── css
│   │   │   └── app.css
│   │   ├── js
│   │   │   └── app.js
│   │   └── views
│   │       └── welcome.blade.php
│   ├── routes
│   │   ├── api.php
│   │   ├── console.php
│   │   └── web.php
│   ├── storage
│   │   ├── app
│   │   │   ├── private
│   │   │   └── public
│   │   ├── framework
│   │   │   ├── cache
│   │   │   │   └── data
│   │   │   ├── sessions
│   │   │   ├── testing
│   │   │   └── views
│   │   └── logs
│   ├── tests
│   │   ├── Feature
│   │   │   └── ExampleTest.php
│   │   ├── TestCase.php
│   │   └── Unit
│   │       └── ExampleTest.php
│   └── vite.config.js
├── package-lock.json
├── reactfront
│   ├── backup1.gitignore.txt
│   ├── dist
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components
│   │   │   ├── Header.tsx
│   │   │   └── SidebarMenu.tsx
│   │   ├── data
│   │   │   └── menu.ts
│   │   ├── i18n.ts
│   │   ├── index.css
│   │   ├── locales
│   │   │   ├── en.json
│   │   │   └── es.json
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ModuleViewPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   └── __tests__
│   │       └── App.test.tsx
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── README.md
├── temp
    └── launch.json
```

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

## Shared Hosting Deployment (Frontend built into Laravel public folder)

This project can be deployed to a shared hosting environment by publishing the React frontend build into the Laravel public directory and pointing the domain/subdomain to that folder.

### Recommended deployment layout

```text
public_html/
  agasaja-erp/
    laravel-api/
      public/
```

If the subdomain points to the Laravel public folder, the browser loads the generated `index.html` file and the built front-end assets are served correctly.

### 1. Build the frontend

From the frontend folder:

```bash
cd reactfront
npm install
npm run build
```

This generates the production files in:

```text
reactfront/dist/
```

### 2. Publish the frontend build to the Laravel public folder

Copy the contents of `reactfront/dist/` into the Laravel public directory:

```bash
cp -r reactfront/dist/* laravel-api/public/
```

If you use GitHub deployment automation, commit the built files or deploy the project in a way that copies the build output to `laravel-api/public/` before upload.

### 3. Point the subdomain to the Laravel public folder

In the hosting control panel, set the subdomain document root to the folder that contains the Laravel public directory, for example:

```text
/home/your-user/domains/your-domain.com/public_html/agasaja-erp/laravel-api/public
```

That folder is the one serving the application to the browser. If the root contains the generated `index.html`, the site loads as normal.

### 4. SPA routing on shared hosting

Because the frontend uses client-side routes, the server must serve `index.html` for unknown paths. In Apache, this is usually done with a `.htaccess` file in the public folder:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

### 5. GitHub deployment flow

A common GitHub + Hostinger setup is:

1. Commit the project to GitHub
2. Push to the main branch
3. In Hostinger, connect the repository and trigger a redeploy
4. Make sure the deployment copies the built frontend output to `laravel-api/public/`
5. Point the subdomain to the Laravel public folder

This way the public folder contains the generated React assets, and the browser loads the app from the root of the subdomain.

### 6. Backend configuration in production

In the Laravel backend, configure `.env` for the production database and domain:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

Also ensure the Laravel framework tables exist in the database:

```bash
php artisan session:table
php artisan cache:table
php artisan queue:table
php artisan queue:failed-table
php artisan queue:batches-table
php artisan migrate
```

### 7. Frontend API base URL in production

Replace localhost endpoints with the production API URL, for example:

```text
https://your-domain.com/api
```

or, if using a dedicated API subdomain:

```text
https://api.your-domain.com/api
```

### 8. Final deployment checklist

- Build the React app: `npm run build`
- Copy the files into `laravel-api/public/`
- Commit and push changes to GitHub
- Redeploy from Hostinger
- Set the subdomain document root to the Laravel public folder
- Verify `index.html` loads and frontend routes render correctly
- Verify API calls are pointed to production URLs instead of `localhost`

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
