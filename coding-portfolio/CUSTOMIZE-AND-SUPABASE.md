# Customize your Midnight Desktop portfolio + set up private feedback

This version uses the **uploaded, edited `main1.jsx`** as your site source. Every Home/About/Projects/Feedback heading, paragraph, input, placeholder, and button label remains unchanged. The only JSX changes were adding a stylesheet import and correcting the `name` typo in the footer to `NAME` so React can render.

## 1. Replace your files safely

1. **Back up your current folder** first (for example, copy it to `coding-portfolio-backup`).
2. Extract `coding-portfolio-midnight-purple.zip`.
3. Open the newly extracted **inner** `coding-portfolio` folder in VS Code. The correct folder has `package.json`, `src`, and `index.html` directly inside it.
4. Run in the terminal:

   ```powershell
   npm.cmd install
   npm.cmd run dev
   ```

5. Open the Local URL printed by Vite (usually `http://localhost:5173`).

To keep your current folder instead, copy these two files from the new ZIP to `src/`:
- `retro-theme.css` (new)
- `main.jsx` (the version based on your uploaded edited file)

You do **not** need to copy `style.css` unless you want to restore the original base style.

## 2. Customize colors without editing text

Edit `src/retro-theme.css`, at the **top of the file**:

```css
:root {
  --retro-bg: #0c0819;            /* page background */
  --retro-panel: #1c1532;         /* window/panel surfaces */
  --retro-purple: #b57bff;        /* primary accent */
  --retro-purple-strong: #8b48eb;
  --retro-lilac: #ddc5ff;         /* light lilac text */
  --retro-border: #6d4d9c;        /* outline color */
}
```

The retro theme imports **after** `style.css`, so it overrides existing colors without deleting your original styles. It uses a dark purple grid wallpaper, violet window title bars, squared-off retro borders, purple accents, and soft lilac highlights inspired by your reference images (without reusing the watermarked stock artwork).

## 3. Connect Supabase (private feedback)

### Create a Supabase project

1. Visit `https://supabase.com` and create/sign in to a free account.
2. Click **New project**, choose an organization, a project name, a database password, and a region; create the project.
3. Open **Authentication > Users**. Create **your own admin user** with an email and a strong password; ensure the user can sign in. Copy that user's **UUID (User ID)**. The exact UI labels can vary by dashboard version.
4. For a portfolio with only one administrator, turn off **public user signups** in Supabase Authentication settings, where available. This does not prevent anonymous feedback inserts through the table policy.

### Create the feedback database with Row-Level Security (RLS)

5. Open `supabase-setup.sql` from this ZIP in VS Code.
6. Replace `YOUR_ADMIN_USER_UUID_HERE` in **both places** with the admin user's UUID you copied. Keep the single quotes and `::uuid` suffix.
7. In the Supabase dashboard open **SQL Editor > New query**. Paste the completed SQL and click **Run**.
8. In **Table Editor**, confirm there is a `public.feedback` table. **Do not turn off RLS**.

The policies permit anonymous *inserts only*. Only the authenticated admin UUID can *select* and *delete* feedback. No other visitor should be able to read submissions. The `/admin` route is just an interface; Supabase RLS is the actual privacy control.

### Add your public project credentials to React

9. In Supabase open the **Project URL** and **API Keys** page (often under **Project Settings > API** or **API Keys**). Copy:
   - Your project URL: `https://YOUR-PROJECT.supabase.co`
   - The **publishable** key (or legacy `anon` key). **Do not copy a secret/service_role key**.
10. In VS Code, duplicate `.env.example` in the project root and rename the duplicate `.env`. Fill in:

   ```env
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
   ```

   `src/supabase.js` already reads these two variables. The publishable key is intended to be used in a browser; privacy comes from the RLS policies, **not** the key being hidden. Do not commit `.env` to GitHub.
11. Restart Vite after editing `.env`:

   ```powershell
   # Ctrl+C to stop the server, then:
   npm.cmd run dev
   ```

### Test the site and privacy

12. Open `http://localhost:5173/feedback` in a regular or private browser window and submit a test message with 10+ characters.
13. Open `http://localhost:5173/admin` and sign in as your admin account. Your message should appear.
14. Sign out; a visitor should **not** see a list of submissions. For confidence, inspect the database policies in Supabase before sharing publicly.

If feedback shows "not configured", check `.env` and restart Vite. If it shows "Submission failed", check `supabase-setup.sql`, API key, URL, and Supabase logs. If admin can't read, verify that the UUID in the policies matches the account you signed into.

**Important**: The anonymous insert policy is easy to integrate but allows automated spam. Before promoting the live site, consider using a server-side Supabase Edge Function with a rate limiter and CAPTCHA verification instead of direct public inserts. Do not ask visitors to enter sensitive information into your feedback form.

## 4. View on iPad

The `dev` script already includes `vite --host 0.0.0.0`. While the Windows server runs, use `ipconfig` to find the computer's IPv4 address. On the same Wi-Fi, visit `http://YOUR-PC-IP:5173` on your iPad. If it does not load, check Windows Firewall (Private networks) and Wi-Fi client isolation.

## 5. Publish later

Connect your GitHub repository to Vercel, set the same two `VITE_` environment variables in Vercel, then deploy. Test the live `/feedback` and `/admin` routes. Never commit `.env` or any service-role/secret key.
