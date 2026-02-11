# Chirpy API Server

A TypeScript + Express API for the Chirpy app. Includes authentication with JWTs, refresh tokens, user management, chirps, and webhook handling.

## Features

- User registration and login
- JWT access tokens (1 hour) and refresh tokens (60 days)
- Authenticated chirp creation and deletion
- User profile updates (email/password)
- Polka webhook for Chirpy Red upgrades
- Chirp filtering and sorting

## Requirements

- Node.js (20+ recommended)
- PostgreSQL

## Setup

1) Install dependencies:

```bash
npm install
```

1) Create a `.env` file in the project root:

```dotenv
DB_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/chirpy
PLATFORM=dev
JWT_SECRET=change-me
POLKA_KEY=f271c81ff7084ee5b99a5091b42d486e
```

1) Ensure the database exists:

```sql
CREATE DATABASE chirpy;
```

1) Start the server (runs migrations on startup):

```bash
npm run dev
```

## Scripts

- `npm run dev` - Build and start the server
- `npm run build` - Compile TypeScript
- `npm run start` - Run the compiled server
- `npm run generate` - Generate drizzle migrations
- `npm run migrate` - Run drizzle migrations
- `npm test` - Run tests (Vitest)

## API Overview

Base URL: `http://localhost:8080`

### Health

- `GET /api/healthz`

### Admin

- `GET /admin/metrics`
- `POST /admin/reset` (dev only)

### Users

- `POST /api/users`
  - Body: `{ "email": "user@example.com", "password": "..." }`
  - Response: user object without `hashedPassword`

- `PUT /api/users` (auth required)
  - Header: `Authorization: Bearer <access-token>`
  - Body: `{ "email": "new@example.com", "password": "..." }`
  - Response: updated user object

### Auth

- `POST /api/login`
  - Body: `{ "email": "user@example.com", "password": "..." }`
  - Response: user object + `token` + `refreshToken`

- `POST /api/refresh`
  - Header: `Authorization: Bearer <refresh-token>`
  - Response: `{ "token": "..." }`

- `POST /api/revoke`
  - Header: `Authorization: Bearer <refresh-token>`
  - Response: `204 No Content`

### Chirps

- `GET /api/chirps`
  - Optional query params:
    - `authorId` (filter by user id)
    - `sort` (`asc` | `desc`, default `asc`)

- `GET /api/chirps/:chirpId`

- `POST /api/chirps` (auth required)
  - Header: `Authorization: Bearer <access-token>`
  - Body: `{ "body": "Hello world" }`

- `DELETE /api/chirps/:chirpId` (auth required)
  - Header: `Authorization: Bearer <access-token>`
  - Only the author can delete the chirp

### Webhooks

- `POST /api/polka/webhooks`
  - Header: `Authorization: ApiKey <polka-key>`
  - Body:

    ```json
    {
      "event": "user.upgraded",
      "data": {
        "userId": "<uuid>"
      }
    }
    ```

  - Returns `204` on success or if event is not `user.upgraded`

## Notes

- Access tokens expire after 1 hour.
- Refresh tokens are stored server-side and can be revoked.
- Keep `.env` out of version control.
