# Backend Conventions (laravel-api)

## Routes
- `routes/api.php` (and any file within `routes/`) must contain ONLY route definitions.
- The use of closures or logic within routes is prohibited: no `Auth::user()` calls,
Eloquent queries, `if` statements, or `response()->json()` calls in route files.
- Every route must point to a controller method: `Route::get('/x', [XController::class, 'method'])`.
- For single-action endpoints, use an invokable controller (`__invoke`).

## Controllers
- All HTTP-related logic must reside in `app/Http/Controllers`.
- If the logic is complex or reusable (e.g., resolving user permissions),
move it to a service class in `app/Services` and call it from the controller.
- Use Form Requests for validation, rather than performing validation within the route.

## Before completing a task
- Verify that `routes/api.php` does not contain any closures.