# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Create the file .env in the root directory and add the configs from .env.example and adapt the right paths

** SHOULD NOT GO INTO PRODUCTION **
NUXT_AI_API_PATH=http://localhost:8091/api
NUXT_FUSEKI_API_PATH=http://localhost:3030/odws
** ----------------------------- **

Make sure to install dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```
