# Proyecto Laravel + React

Este repositorio está dividido en dos partes principales:

- laravel-api/: backend desarrollado en Laravel
- reactfront/: frontend desarrollado en React

## Objetivo

La aplicación está diseñada como un proyecto full-stack de práctica, donde el backend expone una API REST y el frontend consume esos endpoints para mostrar la información en la interfaz.

## Estructura del proyecto

### Backend (Laravel)
Ruta: laravel-api/

Contiene:
- configuración Laravel
- modelos
- controladores
- rutas API
- migraciones y seeders
- lógica de negocio y acceso a base de datos

Comandos comunes:
- cd api
- composer install
- cp .env.example .env
- php artisan key:generate
- php artisan migrate
- php artisan serve

### Frontend (React)
Ruta: reactfront/

Contiene:
- componentes
- páginas
- estilos
- lógica del cliente
- consumo de la API

Comandos comunes:
- cd reactfront
- npm install
- npm start

## Convenciones de trabajo

- El backend siempre se trabaja dentro de laravel-api/
- El frontend siempre se trabaja dentro de reactfront/
- Si se cambia la API, también debe revisarse el frontend que la consume
- No modificar archivos generados en build/ salvo que se indique explícitamente
- Las migraciones y modelos pertenecen al backend

## Variables de entorno

El backend necesita una configuración de base de datos válida en api/.env.
El frontend normalmente apunta a la API con una URL local, por ejemplo:
- http://localhost:8741/api

## Flujo típico

1. Ejecutar la API en Laravel
2. Ejecutar el frontend en React
3. Verificar endpoints del backend
4. Conectar la UI con esos endpoints
5. Validar cambios con migraciones, pruebas o pruebas manuales

## Notas para asistentes o agentes

Este proyecto no es un único app monolítica; está separado por responsabilidades:
- laravel-api/ = lógica de negocio, persistencia y API
- reactfront/ = interfaz visual y consumo de datos

Cuando se trabaje aquí, siempre conviene identificar primero si el cambio pertenece al backend o al frontend antes de editar archivos.

## Archivos importantes

- laravel-api/routes/api.php
- laravel-api/app/Models/
- laravel-pi/app/Http/Controllers/
- laravel-api/database/migrations/
- reactfront/src/

## Ejecución del proyecto

Para ejecutar el entorno de desarrollo completo, es necesario abrir dos terminales independientes, una para el backend y otra para el frontend:

### 1. Servidor Backend (Laravel)
En la terminal, navega a la carpeta de la API y levanta el servidor en el puerto configurado:

```bash
$ cd laravel-api
# Asegúrate de tener configurado APP_URL=http://localhost:8741 en tu archivo .env
$ php artisan serve --port=8741
```


### 2. Entorno Frontend (React)
En una segunda terminal, navega a la carpeta del frontend y ejecuta el servidor de desarrollo:

```bash
$ cd reactfront
$ npm run dev
```
Nota: La API estará disponible en http://localhost:8741 y el frontend se conectará a ella a través de esa URL. Asegúrate de que las variables de entorno en reactfront/ (o donde definas la URL base de la API) apunten correctamente a este puerto.

## API Reference (Resumen)

Base URL: `http://localhost:8741/api`

- POST `/register` — Registrar usuario
- POST `/login` — Iniciar sesión (devuelve `token`)
- GET `/products` — Listar productos (protected)
- POST `/products` — Crear producto (protected)
- GET `/products/{id}` — Ver producto (protected)
- PUT `/products/{id}` — Actualizar producto (protected)
- DELETE `/products/{id}` — Eliminar producto (protected)

Autenticación: JWT
- El backend usa `php-open-source-saver/jwt-auth`. Tras `register` y `login` obtendrás un `token` JWT.
- Incluye el token en las peticiones protegidas con el header: `Authorization: Bearer <token>`

Ejemplos rápidos (curl)

1) Registrar usuario:

```bash
curl -i -X POST http://127.0.0.1:8741/api/register \
	-H "Content-Type: application/json" \
	-d '{"name":"TestUser","email":"test@example.com","password":"12345678","password_confirmation":"12345678"}'
```

2) Login (obtiene `token`):

```bash
curl -i -X POST http://127.0.0.1:8741/api/login \
	-H "Content-Type: application/json" \
	-d '{"email":"test@example.com","password":"12345678"}'
```

Respuesta esperada (ejemplo):

```json
{"message":"User logged in successfully","user":{...},"token":"<JWT>","token_type":"bearer","expires_in":3600}
```

3) Crear producto (ejemplo):

```bash
curl -i -X POST http://127.0.0.1:8741/api/products \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <JWT>" \
	-d '{"name":"Test Product","description":"A test","price":9.99,"stock":10}'
```

Migraciones y pasos adicionales
- Copia `.env` y configura DB (MySQL) y `APP_URL=http://localhost:8741`.
- Ejecuta:

```bash
cd laravel-api
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate
php artisan serve --port=8741
```

Notas rápidas
- Si ves errores relacionados con CSRF al probar endpoints API, asegúrate de que las rutas API se cargan por el stack API (en este proyecto `bootstrap/app.php` se ha configurado para ello).
- El `User` model implementa la interfaz requerida para JWT; si cambias el paquete de JWT revisa `app/Models/User.php`.
- Para desarrollo local usa el puerto `8741` (estandarizado en este repo).