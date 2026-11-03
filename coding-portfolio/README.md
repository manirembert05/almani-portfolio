# Developer Portfolio — Midnight Purple Edition

**START HERE:** Read [`CUSTOMIZE-AND-SUPABASE.md`](CUSTOMIZE-AND-SUPABASE.md) for complete, up-to-date instructions for installing on Windows, editing the purple theme, creating the Supabase project, and protecting private feedback.

The uploaded `main1.jsx` is the source for this edition. All page wording, form inputs, headings, and placeholders remain as supplied. Only a new CSS import and a `name` → `NAME` footer typo fix were made to the JSX.

## Run on Windows

1. Extract ZIP and open the **inner** `coding-portfolio` folder with `package.json` directly inside it.
2. In VS Code terminal run:
   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```
3. Visit the Local URL printed by Vite, usually `http://localhost:5173`.

## Edit the color theme

`src/retro-theme.css` contains the new dark/purple theme. All theme colors are at the top as CSS variables. The original `src/style.css` is kept as the base stylesheet; the retro theme is imported after it.

## Supabase privacy

Set up an admin user in Supabase Authentication, take the **admin UUID**, replace both `YOUR_ADMIN_USER_UUID_HERE` strings in `supabase-setup.sql`, and execute the SQL in Supabase SQL Editor. Enter your Project URL and **publishable/anon** key in a new `.env` file as illustrated by `.env.example`. Then restart Vite. Never use a secret/service_role key in frontend code. See the detailed guide for step-by-step instructions, testing, and spam-protection limitations.

## Pages

- `/` — Home
- `/about` — About
- `/projects` — Projects
- `/feedback` — public form with private storage
- `/admin` — authenticated administrator inbox

---

