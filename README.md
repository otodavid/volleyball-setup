# Volleyball Setup

pnpm workspace for the volleyball app.

## Getting started

Use Node.js 24 LTS and pnpm 10.25.0 (pinned in `package.json`). If pnpm is not installed, run `corepack enable` with a Corepack-enabled Node installation.

```sh
pnpm install
pnpm dev
```

The web app runs at the URL printed by Vite, usually http://localhost:5173.
Its environment variables live in `apps/web/.env`:

```dotenv
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL=http://localhost:5173
```

The NestJS API uses Clerk's Express middleware. Configure `apps/api/.env`
with keys from the same Clerk instance as the frontend:

```dotenv
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
ADMIN_CLERK_USER_ID=user_your_admin_id
FRONTEND_URL=http://localhost:5173
PORT=3000
```

Keep the secret key in the API environment only. `FRONTEND_URL` must match
the frontend origin, including its port. Start the API with
`pnpm --filter @volleyball/api start:dev`.

`GET /users/admin` requires a Clerk session token in the Authorization bearer
header. It returns a boolean for the authenticated user's admin status, or
401 when unauthenticated. It does not accept a user ID from the caller.
Future admin-only API operations must enforce admin permission on the server;
the frontend's admin status display does not protect those operations.

## Workspace layout

- `apps/web`: React, TypeScript, and Vite frontend (`@volleyball/web`).
- `apps/api`: NestJS API with the Express adapter (`@volleyball/api`).
- `packages/*`: optional shared packages; create each with its own `package.json`.

Internal dependencies should use `workspace:*`. Install dependencies from the repository root:

```sh
pnpm --filter @volleyball/web add <dependency>
pnpm --filter @volleyball/web add -D <dev-dependency>
pnpm add -Dw <shared-tool>
```

## Commands

Run these from the repository root:

| Command             | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `pnpm dev`          | Start workspace development servers in parallel |
| `pnpm build`        | Build workspace packages in dependency order    |
| `pnpm lint`         | Lint workspace packages                         |
| `pnpm typecheck`    | Check TypeScript projects                       |
| `pnpm format`       | Format the repository                           |
| `pnpm format:check` | Check formatting without modifying files        |
| `pnpm preview`      | Preview the built web app                       |

Commit the root `pnpm-lock.yaml`. Use `pnpm install --frozen-lockfile` in CI.
