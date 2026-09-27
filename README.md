# WanderAI 🧭

**"Your AI guide to everywhere."**

An AI-powered global travel discovery app. Search any city, country or destination, browse AI-curated places to visit, then tap **Visit** to see the exact spot on Google Maps.

The journey is deliberately: **Search → Discover → Explore → Visit → Locate** — never Search → Map. The map never appears on the homepage or the results grid; it only loads once you open a specific destination's page.

---

## 1. Install dependencies

```bash
cd wanderai
npm install
```

## 2. Run it

```bash
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production: `npm run build` (output goes to `dist/`). To preview that build: `npm run preview`.

## 3. Project structure

```
src/
  components/     Reusable UI: Navbar, Hero, SearchBar, DestinationCard, MapView, AIChat, TripPlanner...
  pages/          Home.jsx, Explore.jsx (search results), DestinationDetails.jsx (map lives here)
  data/           destinations.js — the global destination dataset + category/style lists
  services/       aiService.js (mock AI), mapsService.js (Google Maps loader)
  hooks/          useFavorites.js (localStorage), useTheme.js (destination-driven accent colors)
  App.jsx         Routes: / , /explore/:slug , /destination/:id
```

## 4. Add your Google Maps API key

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Get a key from the [Google Cloud Console](https://console.cloud.google.com/), and enable the **"Maps JavaScript API"** for your project.
3. Paste it into `.env`:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_real_key_here
   ```
4. Restart `npm run dev`.

Without a key, destination pages still work — they show a friendly "Map unavailable" state with a working **"Open in Google Maps"** link instead of a silent failure.

The key is never hardcoded and `.env` is git-ignored. Only `.env.example` (with a placeholder) is committed.

## 5. Add more destinations

Everything lives in `src/data/destinations.js`:

- `PLACES` — a searchable place (country/state/city) with a name, flag, short AI-style intro, and map center.
- `DESTINATIONS` — an array of attractions/experiences per place, following this shape:

```js
{
  id: 'munnar',
  name: 'Munnar',
  placeId: 'kerala',
  city: 'Munnar', country: 'India',
  emoji: '🌿', category: 'nature', tags: ['Nature', 'Mountains'],
  description: '...',
  duration: '1–2 days', rating: 4.8,
  latitude: 10.0889, longitude: 77.0595,
  image: 'https://...',
  bestTime: '...', estimatedBudget: '₹₹',
  activities: ['...'],
  nearbyPlaces: [{ name: '...', emoji: '📸', latitude: 0, longitude: 0 }],
  travelTips: ['...'],
}
```

Any place **not** in `PLACES`/`DESTINATIONS` still works: `genericDestinationsFor()` generates three fallback destinations (city center, viewpoint, local market) around the searched place's approximate coordinates, so search never dead-ends. Replace this fallback with a real API once you have one (see below).

## 6. Connect a real AI API

Right now `src/services/aiService.js` uses mock logic (`discoverPlace`, `askAI`). To wire in a real AI:

1. Keep the same function signatures so no component needs to change.
2. Inside `discoverPlace(query)`, call your backend / the Anthropic API instead of `findPlace()` + local data, and return `{ place, destinations }` in the same shape.
3. Inside `askAI(message, context)`, forward the message (and `context.currentPlace`) to your AI endpoint and return its text reply.
4. **Never call a paid AI API directly from the browser with a secret key.** Put the real call behind your own backend endpoint, and have `aiService.js` `fetch()` that endpoint instead.

## 7. Deploy it for free

Any static host works since this is a Vite + React SPA:

- **Vercel**: `npm i -g vercel` → `vercel` (auto-detects Vite).
- **Netlify**: connect the repo, build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: `npm run build`, then deploy the `dist/` folder (e.g. with the `gh-pages` package).

Remember to add `VITE_GOOGLE_MAPS_API_KEY` as an environment variable in your host's dashboard — never commit the real key.

## 8. Turning this into a real global platform later

- Replace `src/data/destinations.js` with calls to a real destinations database or API (Google Places, a travel content API, or your own CMS).
- Move `aiService.js`'s logic behind a backend that calls a real LLM, so API keys stay server-side.
- Add authentication if you want favorites/trip plans to sync across devices instead of living in `localStorage`.
- Add real photos via an image API instead of the static Unsplash URLs used here as placeholders.
- Restrict your Google Maps API key (HTTP referrer restrictions) before going to production.

---

Built with React + Vite, Tailwind CSS, Framer Motion, Lucide icons, and the Google Maps JavaScript API.
