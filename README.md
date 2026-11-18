# Dashboard

Tableau de bord personnalisable à widgets, inspiré de Netvibes : chaque utilisateur compose son dashboard à partir de services externes (météo, League of Legends, Spotify, YouTube, anime), et ses widgets sont rafraîchis automatiquement.

> Projet scolaire Epitech réalisé en une semaine (janvier–février 2024). C'est un prototype, pas une application de production : voir [Limites connues](#limites-connues).

## Widgets

| Widget | Service | Contenu |
|---|---|---|
| Météo | WeatherAPI | Météo actuelle d'une ville |
| League Profile | API Riot Games + Data Dragon | Rang et emblème de ligue, ratio victoires/défaites (Chart.js), carrousel des derniers matchs |
| Spotify | API Spotify (OAuth2) + Web Playback SDK | Playlists de l'utilisateur et lecteur intégré |
| YouTube | API YouTube Data (OAuth2 Google) | Recherche d'une chaîne et ses statistiques (abonnés, vues, vidéos) |
| Anime Search | API Kitsu | Fiche d'un anime : affiche, synopsis, note, épisodes, dates de diffusion |

Chaque utilisateur peut ajouter, retirer et redimensionner ses widgets ; la configuration est sauvegardée dans MongoDB et les données sont rafraîchies toutes les 5 minutes.

## Stack

- **Front** : React 18, TypeScript, Vite, Tailwind CSS, NextUI, React Router, Chart.js, Framer Motion, thème clair/sombre
- **Back** : Node.js, Express, TypeScript, MongoDB (Mongoose), Axios
- **Infra** : Docker, Docker Compose

## Architecture

```
┌──────────────┐   REST + token    ┌──────────────────┐      ┌───────────────┐
│ React (Vite) │ ────────────────▶ │  API Express     │ ───▶ │  MongoDB      │
│  :8081       │                   │  :8080 /api      │      │  (users,      │
└──────────────┘                   └────────┬─────────┘      │   widgets)    │
       │ OAuth2 (Google, Spotify)           │                └───────────────┘
       ▼                                    ▼
  Google / Spotify            Riot · Spotify · YouTube · WeatherAPI · Kitsu
```

Le back est découpé par domaine (`auth`, `user`, `riot`, `spotify`, `google`, `weather`, `anime`, `data`), chacun avec son router, son controller et son service. Les appels aux API externes passent par le back, ce qui garde les clés d'API côté serveur (seuls le login OAuth et le lecteur Spotify tournent dans le navigateur). Toutes les routes métier sont protégées par un middleware d'authentification par token.

## Lancer le projet

Prérequis : Docker, une base MongoDB (locale ou Atlas) et les clés des API utilisées.

```bash
cp back/.env.example back/.env     # MongoDB + clés d'API
cp front/.env.example front/.env   # client IDs OAuth
docker compose up --build
```

- Front : http://localhost:8081
- API : http://localhost:8080/api

En local sans Docker : `yarn && yarn start` dans `back/`, `yarn && yarn dev` dans `front/`.

## Limites connues

Projet réalisé en temps limité ; ce que je changerais aujourd'hui :

- **Pas de tests** automatisés.
- **Mots de passe hachés en HMAC-SHA256** avec sel : il faudrait un algorithme lent dédié (bcrypt / Argon2).
- **Pas de gestion de rôles** : tout utilisateur connecté peut lister ou supprimer les comptes via `/api/user`.
- **MongoDB absent du `docker-compose.yml`** : la base doit être fournie à part.
- **URLs codées en dur** (`localhost`) pour le CORS et l'URL de l'API côté front.
- Certains types sont encore en `any` côté front.
