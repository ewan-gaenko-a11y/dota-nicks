# Dota Nick Hub 🎮✨

Quick app to generate and moderate Dota 2 nicknames.  
Random nickname, suggestions, leaderboard, and a minimal admin panel.

## Features
- 🎲 Random nickname generator
- ✍️ Suggest a nickname (moderated)
- 🏆 Leaderboard with search
- 🛡️ Admin panel for approvals

## Tech Stack
- Laravel (PHP)
- React + Inertia.js
- Vite + TypeScript
- Tailwind CSS

## Requirements
- PHP 8.4
- Composer
- Node.js + npm
- SQLite (default) or your preferred DB

## Quick Start
```bash
composer run setup
```

### Dev server
```bash
composer run dev
```

### SSR dev
```bash
composer run dev:ssr
```

## Useful Scripts
```bash
npm run dev
npm run build
npm run build:ssr
npm run lint
npm run format
npm run types
```

## Tests (not there yet)
```bash
composer run test
```

## Contributing Notes
- Keep it minimal and readable.
- After PHP changes, pls run:
  ```bash
  ./vendor/bin/pint --preset psr12
  ```

