# Project Agent Guidelines

## Goal
Keep the codebase simple while refactoring and adding an admin panel. Avoid unnecessary dependencies.

## Tech Stack (current)
- Backend: Laravel (PHP)
- Frontend: React + Inertia.js
- Frontend tooling: Vite, TypeScript, ESLint
- Package managers: Composer, npm

## Working Principles
- Prefer built-in Laravel features (controllers, policies, middleware) over adding packages.
- Keep the admin panel minimal: server-rendered pages first, minimal JS unless required.
- Small, readable modules over clever abstractions.
- Avoid premature optimization and over-configuration.
- Admin UI should be implemented in React via Inertia.

## Dependencies
- Only add a dependency if it clearly reduces complexity or maintenance.
- If adding one, explain why existing tools are insufficient.
- Prefer well-maintained, widely used packages with a clear purpose.

## Code Style
- Follow existing conventions in the codebase.
- Keep functions small and testable.
- Avoid deep inheritance; prefer composition.
- To format code use command "./vendor/bin/pint --preset psr12" after every code change

## Testing
- Update or add tests for new admin features when practical.
- Do not introduce heavy testing frameworks.

## File Layout (suggested)
- Admin routes: `routes/admin.php` (or grouped under `routes/web.php` if simpler)
- Admin controllers: `app/Http/Controllers/Admin`
- Admin views: `resources/views/admin`
- Admin assets: `resources/js/admin` and `resources/css/admin` if needed

## Performance / DX
- Favor clarity over micro-optimizations.
- Keep build steps minimal.

## Commit Guidance
- Keep commits focused and small.
- Describe why a dependency was added, if any.
