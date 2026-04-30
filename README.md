# Wayne Yu — Personal site

Premium, minimal portfolio built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS v4**, **shadcn/ui** (Base UI), **next-themes**, and **Framer Motion**.

Repository: https://github.com/yky32/me

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production URL

Set `NEXT_PUBLIC_SITE_URL` in `.env` (see `.env.example`) so `metadataBase` and Open Graph use your real domain.

## Scripts

| Command        | Description          |
| -------------- | -------------------- |
| `npm run dev`  | Development server   |
| `npm run build`| Production build     |
| `npm run start`| Start production app |
| `npm run lint` | ESLint               |

## Structure

- `src/app` — Routes: home, about, blog (+ dynamic post), tools (+ JSON / timezone / units).
- `src/components` — Layout (header, footer), home sections, tool UIs.
- `src/lib` — Site config, blog data, timezone list.

Default theme is **light**; header includes a smooth **dark mode** toggle.
