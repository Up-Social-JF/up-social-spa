# vite-shadcn template

Welcome to my vite-shadcn template!
Check it out here: [vite-shadcn](https://korbiqweidinger.github.io/vite-shadcn/)

## What is this template?

This template is a starting point for building a web application using [Vite](https://vite.dev/) and [Shadcn UI](https://ui.shadcn.com/).
It includes a basic setup for routing, state management, theming, testing and linting.

## Features

- Vite
- TypeScript
- Shadcn UI
- ESLint and Prettier for code quality
- Routing with `react-router` HashRouter (used because gh-pages doesn't support browser routers)
- State management with Redux Toolkit
- Pre-commit hooks with Husky
- Vitest for testing

## Hosting on gh-pages

This template is configured to auto deploy to gh-pages.
Therefore it includes a `pages.yml` file that autodeploys the main branch to gh-pages.

If you don't have a custom url, replace the `base` in `vite.config.ts` with your project name.
If you want to host this with a custom url, remove `base` from `vite.config.ts`.

File: `vite.config.ts`

```ts
export default defineConfig({
  //...
  base: '/github-repo-name/',
});
```

## What to replace

- replace all occurences of `vite-shadcn` with your project name

## Don't forget to

- `pnpm run prepare` to setup pre-commit hooks
