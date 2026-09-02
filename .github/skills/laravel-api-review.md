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

## Good practices
- Keep routes organized and readable
- Prefer explicit validation
- Avoid placing complex logic inside controllers when a model/service is more appropriate
- Ensure the API contract is clear and stable
- Update frontend usage if the response structure changes

## Output expectations
Explain:
- what endpoint was reviewed
- what file(s) matter
- what bug or inconsistency was found
- what the recommended fix is