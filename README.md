# Dashboard

Customizable widget dashboard inspired by Netvibes: each user builds their own dashboard from external services (weather, League of Legends, Spotify, YouTube, anime), and widgets refresh automatically.

> Epitech school project built in one week (January–February 2024). It is a prototype, not a production app: see [Known limitations](#known-limitations).

## Widgets

| Widget | Service | Content |
|---|---|---|
| Weather | WeatherAPI | Current weather for a city |
| League Profile | Riot Games API + Data Dragon | Rank and league emblem, win/loss ratio (Chart.js), carousel of recent matches |
| Spotify | Spotify API (OAuth2) + Web Playback SDK | User playlists and embedded player |
| YouTube | YouTube Data API (Google OAuth2) | Channel lookup and statistics (subscribers, views, videos) |
| Anime Search | Kitsu API | Anime card: poster, synopsis, rating, episode count, airing dates |

Users can add, remove and resize widgets; their layout is saved in MongoDB and widget data refreshes every 5 minutes.

## Stack

- **Front**: React 18, TypeScript, Vite, Tailwind CSS, NextUI, React Router, Chart.js, Framer Motion, light/dark theme
- **Back**: Node.js, Express, TypeScript, MongoDB (Mongoose), Axios
- **Infra**: Docker, Docker Compose

## Architecture

```
┌──────────────┐   REST + token    ┌──────────────────┐      ┌───────────────┐
│ React (Vite) │ ────────────────▶ │  Express API     │ ───▶ │  MongoDB      │
│  :8081       │                   │  :8080 /api      │      │  (users,      │
└──────────────┘                   └────────┬─────────┘      │   widgets)    │
       │ OAuth2 (Google, Spotify)           │                └───────────────┘
       ▼                                    ▼
  Google / Spotify            Riot · Spotify · YouTube · WeatherAPI · Kitsu
```

The back end is split by domain (`auth`, `user`, `riot`, `spotify`, `google`, `weather`, `anime`, `data`), each with its own router, controller and service. External API calls go through the back end, which keeps API keys server-side (only the OAuth login and the Spotify player run in the browser). All business routes are protected by a token authentication middleware.

## Getting started

Requirements: Docker, a MongoDB database (local or Atlas) and keys for the APIs used.

```bash
cp back/.env.example back/.env     # MongoDB + API keys
cp front/.env.example front/.env   # OAuth client IDs
docker compose up --build
```

- Front: http://localhost:8081
- API: http://localhost:8080/api

Locally without Docker: `yarn && yarn start` in `back/`, `yarn && yarn dev` in `front/`.

## Known limitations

Built under a tight deadline; what I would change today:

- **No automated tests.**
- **Passwords hashed with salted HMAC-SHA256**: a dedicated slow algorithm (bcrypt / Argon2) should be used.
- **No role management**: any logged-in user can list or delete accounts through `/api/user`.
- **MongoDB is not in `docker-compose.yml`**: the database must be provided separately.
- **Hard-coded URLs** (`localhost`) for CORS and the front-end API URL.
- Some front-end types are still `any`.
