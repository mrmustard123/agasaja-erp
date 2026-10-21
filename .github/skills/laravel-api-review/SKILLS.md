---
name: laravel-api-review
description: Use this skill when reviewing Laravel API routes, controllers, and database changes.
---

# Laravel API Review

Use this skill when the task involves:
- routes in the backend
- API endpoints
- controller logic
- model validation
- database migrations
- request/response data contracts

## Checklist
1. Inspect the relevant route in api/routes/api.php
2. Confirm which controller handles the endpoint
3. Check whether the model is the correct one
4. Review validation rules and request payloads
5. Verify the response structure is consistent
6. Check if the frontend expects a different shape
7. Confirm the migration is included if the database schema changes
8. Verify that routes/api.php and any file under routes/ contains only route definitions
9. Confirm no closures, Auth::user() calls, Eloquent queries, if statements, or response()->json() calls are present in route files
10. Ensure every route points to a controller method, using Route::get('/x', [XController::class, 'method'])
11. For single-action endpoints, confirm the endpoint uses an invokable controller (__invoke)
12. Verify all HTTP logic lives in app/Http/Controllers and not in routes
13. Check whether complex or reusable logic has been moved to app/Services
14. Confirm validation is handled with Form Requests instead of inline route validation
15. Before completion, verify routes/api.php does not contain any closures

## Good practices
- Keep routes organized and readable
- Prefer explicit validation
- Avoid placing complex logic inside controllers when a model/service is more appropriate
- Ensure the API contract is clear and stable
- Update frontend usage if the response structure changes
- Keep routes free of business logic and response-building code
- Keep controller logic focused on HTTP concerns and delegate reusable logic to services
- Use Form Requests for request validation and authorization

## Review standards
- Routes must be declarative only; no application logic belongs in route files.
- Use controller methods as the single entry point for API actions.
- Single-action endpoints should use invokable controllers when appropriate.
- Business logic should live in services when reused or complex.
- Request validation belongs in form requests, not in the route or controller flow.

## Output expectations
Explain:
- what endpoint was reviewed
- what file(s) matter
- what bug or inconsistency was found
- what the recommended fix is
- whether the route/controller structure follows the backend conventions in this project