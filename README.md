# CFB — Chandan Foundation Batch

Official brand website for **CFB (Chandan Foundation Batch)** — an educational initiative focused on helping students build strong foundations, develop knowledge and practical skills, and work toward their academic and future goals.

Live design concept: **"Blueprint / Foundation Stack"** — a premium dark theme built around the idea of learning as something constructed layer by layer (Fundamentals → Practice → Mastery → Leadership), echoed through the hero's animated stack visual, blueprint grid backdrop, and architectural corner-bracket details on cards.

---

## File structure

```
cfb-website/
├── index.html      # All page markup and content (single page site)
├── styles.css       # Design system, layout, animations, dark/light themes
├── script.js        # Nav, theme toggle, scroll reveal, FAQ, programs data, contact form
└── README.md
```

No build tools, frameworks, or dependencies required — just three static files plus Google Fonts loaded via CDN link tags in `index.html`.

---

## Running it locally

Just open `index.html` in a browser. For best results (so relative paths and smooth scroll behave normally), serve it with a local server instead of opening the file directly:

```bash
# from inside the cfb-website folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Deploying to GitHub Pages

1. Push this folder's contents to a GitHub repository (files at the repo root, or in a `/docs` folder).
2. In the repo, go to **Settings → Pages**.
3. Set the source branch (e.g. `main`) and folder (`/root` or `/docs`).
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`.

---

## What's a placeholder right now

The site is built to be easy to update once real information is available. The following are intentionally placeholder content, clearly marked in the UI:

| Section | Placeholder |
|---|---|
| Leadership → Chairman | Shown as "To Be Decided — Position Awaiting Appointment" |
| Leadership bios | "Biography to be added" |
| Profile photos | Icon placeholder (swap in real photos) |
| Programs | Sample program cards — see `script.js` |
| Testimonials | Marked "Placeholder" — replace with real student feedback |
| Contact details | Email, phone, Instagram, YouTube, LinkedIn, WhatsApp — all placeholder values |
| Contact form | Front-end only — not yet wired to a backend/inbox |
| Student Dashboard | Frontend prototype only, not connected to real accounts/data |

No fabricated statistics, achievements, or credentials are included anywhere.

---

## How to customize

**Leadership team**
Edit the leader cards directly in `index.html` under `<section id="leadership">`. Update name, role, bio, and photo (replace the placeholder SVG icon inside `.leader-photo` with an `<img>` tag). When the Chairman is appointed, update that card the same way — remove the "vacant" styling by deleting the `leader-card-vacant` / `leader-photo-vacant` classes.

**Programs**
Edit the `programs` array at the top of the "Programs" section in `script.js`. Each entry supports `name`, `description`, `duration`, `level`, and `instructor` — the cards render automatically.

**Colors & type**
All design tokens (colors, fonts, spacing, radius) are defined as CSS custom properties at the top of `styles.css` under `:root` (dark theme) and `[data-theme="light"]` (light theme).

**Contact info & social links**
Update the placeholder values in `index.html` under `<section id="contact">` and in the footer.

**Contact form backend**
The form in `#contactForm` currently only validates and shows a confirmation message client-side. To make it functional, connect it to a form service (e.g. Formspree, Netlify Forms) or your own backend endpoint in `script.js`.

---

## Accessibility & performance notes

- Semantic HTML throughout, visible keyboard focus states, `aria-live` status messages on the contact form, `aria-expanded`/`aria-controls` on interactive nav and FAQ elements.
- Respects `prefers-reduced-motion`.
- No external JS frameworks or libraries — fast load, small footprint.
- Fully responsive from mobile through desktop.

---

© 2026 CFB — Chandan Foundation Batch. All Rights Reserved.
