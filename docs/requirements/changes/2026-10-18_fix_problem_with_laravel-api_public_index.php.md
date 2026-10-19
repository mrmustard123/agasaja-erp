YO:

Genial Claude!! ahora todo funciona perfecto de forma local!!  
Vamos a ver si podemos hacerlo funcionar ahora en mi servidor compartido en Hostinger.  
Subo mi proyecto a Github y de ahí lo despliego en Hostinger con un botón en el panel de control.  
Tengo SSH en la terminal para ejecutar algunas cosas, pero mi plan premium es limitado, no puedo instalar cosas como Node.js.  
Entonces lo que hago es ir a la carpeta /reactfront en mi computadora local, hago npm run build y copio todos los archivos y carpeta assets a /laravel-api/public.  
El subdominio erp.apicoladonjusto.com está apuntado a /home/u236816975/domains/apicoladonjusto.com/public_html/agasaja-erp/laravel-api/public  
Finalmente subo al repositorio de Github y luego hago deploy desde el panel de control de Hostinger el cual jala el repositorio de Github.  
Bueno, en el console de Firefox me está saliendo un error:  
POST https://erp.apicoladonjusto.com/api/login  
Status 404

Con los cambios que hicimos, ahora ya no me deja hacer login se congela en el form del login.

¿cómo podemos evaluar el problema?



CLAUDE:

Un 404 en `POST /api/login` es una buena pista. La petición sale del frontend nuevo, porque el que tenía el `demo-token` no hacía ningún fetch, así que el build llegó bien al servidor. Lo que falla es el backend: la URL no llega a una ruta de Laravel. Hay que averiguar **quién** responde ese 404.

## Paso 1: mira qué responde exactamente

En la pestaña Network de Firefox, abre la petición `login` y revisa la pestaña **Response** y los **Headers** de respuesta.

- **JSON tipo `{"message":"The route api/login could not be found."}`**: Laravel sí está corriendo, pero no encuentra la ruta.
- **Página HTML** (de Hostinger, LiteSpeed o Apache): la petición nunca llegó a Laravel. El servidor web no la está pasando a `index.php`.

Esto divide el problema en dos y evita probar cosas a ciegas.

## Paso 2: pruébalo sin el navegador

Desde tu terminal local:

```bash
curl -i https://erp.apicoladonjusto.com/api/user-functionalities \
  -H "Accept: application/json"
```

No necesitas credenciales. Si Laravel y sus rutas están vivos, debe responder **401 en JSON**. Si responde 404, el problema es el mismo y lo tienes aislado del frontend.

## Paso 3: revisa el servidor por SSH

```bash
cd /home/u236816975/domains/apicoladonjusto.com/public_html/agasaja-erp/laravel-api
ls -la public/
cat public/.htaccess
php artisan route:list --path=api
ls bootstrap/cache
php -v
```

Qué buscar en cada salida:

1. **`public/` debe contener `index.php` y `.htaccess`**, además del `index.html` y `assets` de React. Si `index.php` falta (por ejemplo, si quedó renombrado a `index1.php`), Laravel nunca arranca y todo `/api/*` da 404. Lo mismo pasa si al copiar el build reemplazaste la carpeta `public` completa en vez de mezclar los archivos.
2. **El `.htaccess` debe ser el de Laravel**, el que redirige lo que no es un archivo real hacia `index.php`. Si se sobrescribió con uno pensado para React, que manda todo a `index.html`, `/api/login` termina en el HTML del frontend.
3. **`route:list` debe mostrar `api/login` y `api/user-functionalities`.** Si salen, el código desplegado es el correcto. Si no, el servidor tiene código viejo o las rutas no se registran.
4. **`bootstrap/cache/` no debe tener `routes-v7.php`** (ni `config.php` viejo). Esos archivos de caché pueden haberse subido desde tu máquina por Git y hacen que el servidor use rutas desactualizadas. Si están, ejecuta `php artisan optimize:clear` y considera añadirlos al `.gitignore`.
5. **`php -v`**: Laravel 13 necesita PHP 8.3 o superior. En Hostinger la versión de la consola y la del sitio se configuran por separado en el panel, y conviene que ambas coincidan.

## Qué viene después del 404

Cuando el 404 se resuelva, lo más probable es que aparezcan **errores 500** por cosas que viven fuera de Git. Conviene confirmarlas ahora para no tropezar después:

- **`.env` en producción** (está en `.gitignore`), con `APP_KEY`, `JWT_SECRET` y las credenciales de la base de datos de Hostinger.
- **`vendor/`**: si no está en el repo, hay que ejecutar `composer install --no-dev` por SSH.
- **Permisos de escritura** en `storage/` y `bootstrap/cache/`.

Los errores de Laravel quedarán en `storage/logs/laravel.log` del servidor, igual que en local.

## Sobre el formulario "congelado"

Con el código que te pasé, un error del servidor no debería congelar nada. Debería aparecer el texto "Login failed" bajo el campo de contraseña y el botón volver a activarse. Si ves exactamente eso, el formulario funciona y solo falta el backend. Si no aparece nada, avísame.

Dime qué responde el Paso 1 (JSON o HTML) y la salida de `ls -la public/` junto con `route:list`, y con eso ubicamos cuál de estos casos es.



YO:

Bien, aquí te paso:  
[u236816975@lt-bnk-web924 laravel-api]$ php artisan route:list --path=api

POST api/login .................................. AuthController@login  
POST api/register ............................ AuthController@register  
GET|HEAD api/user-functionalities .......... UserFunctionalitiesController

```
                                                        Showing [3] routes
```

Por favor, también te paso el .htaccess:  
<IfModule mod_rewrite.c>  
<IfModule mod_negotiation.c>  
Options -MultiViews -Indexes  
</IfModule>

```
RewriteEngine On

# Handle Authorization Header  
RewriteCond %{HTTP:Authorization} .  
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

# Handle X-XSRF-Token Header  
RewriteCond %{HTTP:x-xsrf-token} .  
RewriteRule .* - [E=HTTP_X_XSRF_TOKEN:%{HTTP:X-XSRF-Token}]

# Redirect Trailing Slashes If Not A Folder...  
RewriteCond %{REQUEST_FILENAME} !-d  
RewriteCond %{REQUEST_URI} (.+)/$  
RewriteRule ^ %1 [L,R=301]

# Send Requests To Front Controller...  
RewriteCond %{REQUEST_FILENAME} !-d  
RewriteCond %{REQUEST_FILENAME} !-f  
RewriteRule ^ index.php [L]  
```

</IfModule> 
Es el que está en /laravel-api/public

Bueno, pero revisando, creo que encontré la causa, no existe el archivo index.php.  
Anteriormente había yo tenido ese problema y fue por que lo renonmbre index1.php para probar algo...  
Después rehice el archivo .gitignore y no sé de dónde saqué tanta cosa, pero creo que está mal.  
Es decir, si me interesa que no se suba al repositorio el archivo .env de laravel, pues eso lo subo manualmente al servidor.

Por favor dale una revisada al .gitingnore:  
(Ojo, estoy subiendo vendor y node_modules (aunque no lo use en el servidor de producción) )

#Laravel

laravel-api/.env

laravel-api/*.log  
laravel-api/.DS_Store  
laravel-api/.env  
laravel-api/.env.backup  
laravel-api/.env.production  
laravel-api/.phpactor.json  
laravel-api/.phpunit.result.cache  
laravel-api/.codex  
laravel-api/.cursor/  
laravel-api/.idea  
laravel-api/.nova  
laravel-api/.phpunit.cache  
laravel-api/.vscode  
laravel-api/.zed  
#laravel-api/auth.json  
#laravel-api/node_modules  
laravel-api/public/build  
laravel-api/public/fonts-manifest.dev.json  
laravel-api/public/hot  
laravel-api/public/storage  
laravel-api/public/index.php  
laravel-api/storage/*.key  
laravel-api/storage/pail  
#laravel-api/vendor  
laravel-api/_ide_helper.php  
laravel-api/Homestead.json  
laravel-api/Homestead.yaml  
laravel-api/Thumbs.db

#React

#Logs

reactfront/logs  
reactfront/*.log  
reactfront/npm-debug.log*  
reactfront/yarn-debug.log*  
reactfront/yarn-error.log*  
reactfront/pnpm-debug.log*  
reactfront/lerna-debug.log*

#reactfront/node_modules  
#reactfront/dist  
#reactfront/dist-ssr  
#reactfront/*.local

#Editor directories and files

reactfront/.vscode/*  
reactfront/!.vscode/extensions.json  
reactfront/.idea  
reactfront/.DS_Store  
reactfront/*.suo  
reactfront/*.ntvs*  
reactfront/*.njsproj  
reactfront/*.sln  
reactfront/*.sw?

#Base de datos local

#Archivos del sistema

.DS_Store  
Thumbs.db

#Docker / temporales

*.log

#VSCode Local History

.history/

Si podés corregilo por favor.



CLAUDE:

Encontraste la causa. Esta línea del `.gitignore` impide que `index.php` llegue al repositorio:

```
laravel-api/public/index.php
```

Todo lo demás cuadra con eso. `route:list` muestra tus 3 rutas, así que el código está bien desplegado, y el `.htaccess` es el estándar de Laravel. Su última regla manda las peticiones a `index.php`, que no existe, y de ahí el 404.

## El `.gitignore` corregido

```gitignore
# ───────── Laravel (laravel-api) ─────────
laravel-api/.env
laravel-api/.env.backup
laravel-api/.env.production
laravel-api/.phpactor.json
laravel-api/.phpunit.result.cache
laravel-api/.phpunit.cache
laravel-api/.codex
laravel-api/.cursor/
laravel-api/.idea
laravel-api/.nova
laravel-api/.vscode
laravel-api/.zed
laravel-api/_ide_helper.php
laravel-api/Homestead.json
laravel-api/Homestead.yaml
laravel-api/public/build
laravel-api/public/fonts-manifest.dev.json
laravel-api/public/hot
laravel-api/public/storage
laravel-api/storage/*.key
laravel-api/storage/pail
# vendor se sube a propósito: NO ignorarlo

# ───────── React (reactfront) ─────────
reactfront/node_modules
reactfront/dist
reactfront/dist-ssr
reactfront/*.local
reactfront/logs
reactfront/npm-debug.log*
reactfront/yarn-debug.log*
reactfront/yarn-error.log*
reactfront/pnpm-debug.log*
reactfront/lerna-debug.log*
reactfront/.vscode/*
!reactfront/.vscode/extensions.json
reactfront/.idea
reactfront/*.suo
reactfront/*.ntvs*
reactfront/*.njsproj
reactfront/*.sln
reactfront/*.sw?

# ───────── Base de datos local ─────────
*.sql

# ───────── General ─────────
*.log
.DS_Store
Thumbs.db
.history/
```

## Qué cambié y por qué

1. **Quité `laravel-api/public/index.php`.** Es el cambio importante.
2. **Quité duplicados:** `laravel-api/.env` aparecía dos veces. Las líneas `laravel-api/*.log`, `reactfront/*.log`, `.DS_Store` y `Thumbs.db` por carpeta sobraban, porque los patrones generales del final (`*.log`, `.DS_Store`, `Thumbs.db`) ya los cubren en cualquier carpeta.
3. **Arreglé la excepción de VSCode.** `reactfront/!.vscode/extensions.json` estaba mal escrita: el `!` debe ir al inicio de la línea, o Git no la interpreta como excepción.
4. **Descomenté `reactfront/node_modules`, `dist`, `dist-ssr` y `*.local`.** El detalle está en la siguiente sección.
5. **Añadí `*.sql`.** Tenías una sección "Base de datos local" vacía y supuse que era para esto. Si trabajas con exports de datos reales, un dump subido a GitHub sería un riesgo serio. Si necesitas versionar algún `.sql`, quita esa línea.

## Sobre subir `node_modules` y `vendor`

- **`node_modules`:** te recomiendo ignorarlo. Como compilas en local y copias el resultado a `public`, el servidor nunca lo usa. A cambio, hace cada deploy más lento y los planes compartidos suelen limitar la cantidad total de archivos. Si ya está en el repo, ignorarlo no basta: hay que sacarlo del índice (comando abajo). Los archivos locales no se borran, pero el próximo deploy sí los quitará del servidor.
- **`vendor`:** tiene sentido subirlo si no quieres depender de Composer en el servidor, y si el servidor ya tiene `vendor` completo (el `route:list` funcionó), está bien. Cuida dos cosas: la versión de PHP del servidor debe ser igual o mayor a la que usaste para generarlo, y las dependencias de desarrollo (PHPUnit y similares) también viajan a producción. Puedes comprobar si Composer está disponible por SSH con `composer -V`.
- **Otros `.gitignore`:** Laravel y Vite crean los suyos dentro de `laravel-api/` y `reactfront/`, y se suman al raíz. Si algo no se sube como esperas, `git check-ignore -v <ruta>` te dice exactamente qué regla lo está bloqueando.

## Pasos para aplicarlo

```bash
git check-ignore -v laravel-api/public/index.php   # no debe imprimir nada
git add laravel-api/public/index.php
git rm -r --cached --ignore-unmatch reactfront/node_modules reactfront/dist
git status                                          # revisa qué entra y qué sale
git commit -m "Restaurar public/index.php y limpiar .gitignore"
git push
```

Después haz el deploy desde Hostinger y prueba:

```bash
curl -i https://erp.apicoladonjusto.com/api/user-functionalities -H "Accept: application/json"
```

Si todo va bien, debe responder **401 en JSON**, no 404.

## Dos avisos para después de restaurar `index.php`

1. **Qué archivo sirve la raíz `/`.** Ahora que existen `index.html` e `index.php` en `public/`, la raíz del sitio puede servir cualquiera de los dos, según el orden de `DirectoryIndex` de Hostinger. Si al abrir `https://erp.apicoladonjusto.com/` ves algo de Laravel en vez del login de React, agrega esto al principio de `public/.htaccess`:
   
   ```apache
   DirectoryIndex index.html index.php
   ```
   
   Es mejor que renombrar `index.php`, porque no rompe el arranque de Laravel.

2. **Recargar en una ruta de React** (por ejemplo `/dashboard`) hará que la petición caiga en Laravel, que responderá 404, porque esa ruta existe solo en React Router. Se arregla con una regla en el `.htaccess`, pero te sugiero resolverlo después de confirmar que el login funciona.

Cuando el login funcione, quedarán por revisar el `.env` del servidor (`APP_KEY`, `JWT_SECRET`, base de datos) y los permisos de `storage/`, porque ahí es donde suelen aparecer los 500 siguientes. ¿Qué te responde el `curl` después del deploy?



YO:

Bueno, cambios hechos. El curl responde esto:

curl -i https://erp.apicoladonjusto.com/api/user-functionalities -H "Accept: application/json"  
HTTP/2 401  
date: Mon, 19 Oct 2026 02:25:37 GMT  
content-type: application/json  
vary: Accept-Encoding  
x-powered-by: PHP/8.3.35  
cache-control: no-cache, private  
access-control-allow-origin: *  
platform: hostinger  
panel: hpanel  
content-security-policy: upgrade-insecure-requests  
server: hcdn  
alt-svc: h3=":443"; ma=86400  
x-hcdn-request-id: a43119f15ee1bbfb8d4519de4a889502-san-edge2

{"message":"Unauthenticated."}

Ahora el problema está en que ya no entra al landing page que redirecciona /laravel-api/public/index.html por que toma como por defecto a index.php y me lleva a la página blade por defecto de Laravel.



CLAUDE:

Ese **401 en JSON con `{"message":"Unauthenticated."}`** es justo lo que se esperaba: Laravel arranca en producción, las rutas cargan y el guard `auth:api` rechaza la petición sin token. El problema de `index.php` está resuelto.

Lo que describes ahora es el efecto secundario que te adelanté. Cuando entras a `/`, el servidor está eligiendo `index.php` en lugar de `index.html`. Eso ocurre por el orden de `DirectoryIndex`: la regla de rewrite del `.htaccess` no interviene, porque `/` es un directorio y cae en el archivo índice por defecto.

## La solución

Edita `laravel-api/public/.htaccess` en tu máquina y agrega esta línea **al principio**, antes del bloque `<IfModule mod_rewrite.c>`:

```apache
DirectoryIndex index.html index.php

<IfModule mod_rewrite.c>
    ...el resto igual...
```

Con eso, `/` sirve primero `index.html` (React). `/api/*` sigue llegando a Laravel, porque esas rutas no son archivos reales y las atrapa la regla final del rewrite. Haz commit, push y deploy, y prueba:

```bash
curl -i https://erp.apicoladonjusto.com/ | head -n 20
```

Deberías ver el HTML de tu app React (el `<div id="root">` y los `<script>` de `assets/`), no la página de bienvenida de Laravel. Si en el navegador sigues viendo la vieja, prueba en una ventana privada: el CDN de Hostinger (`hcdn`) puede tener la respuesta en caché, y si persiste puedes limpiar la caché desde hPanel.

## Plan B si `DirectoryIndex` no surte efecto

Algunos hostings controlan el índice por su cuenta. En ese caso, agrega una regla de rewrite dentro del bloque `mod_rewrite`, **antes** de `# Send Requests To Front Controller...`:

```apache
    # Raíz del sitio -> React
    RewriteRule ^$ index.html [L]
```

Funciona porque la regla corre antes de que el servidor elija el archivo índice. La primera opción es más limpia y declarativa, así que intenta esa primero y deja esta como respaldo.

## Lo que sigue

1. **Prueba el login real en producción**, ahora con `curl`. Esa petición sí usa la base de datos y el JWT, así que será la primera que toque lo que vive en el `.env` del servidor:
   
   ```bash
   curl -i -X POST https://erp.apicoladonjusto.com/api/login \  -H "Accept: application/json" \  -H "Content-Type: application/json" \  -d '{"email":"test1@example.com","password":"TU_PASSWORD"}'
   ```
   
   Si algo falta, es aquí donde aparecería como un 500: `APP_KEY`, `JWT_SECRET`, credenciales de la base de datos de Hostinger, o permisos de `storage/`. El motivo quedaría en `storage/logs/laravel.log` del servidor.

2. **Recargar en rutas de React.** Cuando el login funcione, falta resolver que recargar en `/dashboard` caiga en Laravel y dé 404. Se arregla con una regla más en el `.htaccess`, y lo vemos entonces.

Cuéntame qué responde la raíz del sitio y el `curl` del login.


