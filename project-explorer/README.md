# Project Explorer

A small project management portal built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Check the production build with `npm run build` and lint with `npm run lint`.

## Routes

- `/` - Home
- `/about` - About the workspace
- `/dashboard` - Dashboard with its own navigation layout and streamed recent activity
- `/dashboard/analytics`, `/dashboard/reports`, `/dashboard/team` - Dashboard sections
- `/projects` - Project list; filter with `?search=nextjs&status=active`
- `/projects/1` - Project overview
- `/projects/1/team`, `/projects/1/tasks`, `/projects/1/activity` - Project sections
- `/projects/1/docs`, `/projects/1/docs/setup/database` - Project documentation catch-all
- `/settings` - Workspace settings

Project details are stored in `data/projects.json`. Project ID `999` demonstrates the not-found state. Add `?simulateError=1` to a project overview URL to see the error screen and retry button.

The app uses Server Components by default. Client Components are limited to project filters, section links that preserve query parameters, and favorite buttons.