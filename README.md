# Bangladesh Youth Nuclear Congress — Official Website

The official website of the **Bangladesh Youth Nuclear Congress (BYNC)** — Bangladesh's first
youth-led nuclear organisation and the official National Partner of the International Youth Nuclear
Congress (IYNC), the 49th member nation.

🔗 Live (once GitHub Pages is enabled): `https://byncbd-org.github.io/Official-Website/`

## About the site

A lightweight, dependency-free **static site** (single `index.html` + assets). No build step, no
framework — just open it in a browser or serve the folder.

- **Sections:** Home · About · Programs · Join · Partners · Contact
- **Tech:** HTML, CSS, vanilla JavaScript (hash-based routing, scroll-reveal animations, animated
  atom hero, starfield canvas)
- **Fonts:** Space Grotesk + Inter (Google Fonts)

## Run locally

No tooling required. Either open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
.
├── index.html          # the entire site
├── assets/
│   ├── bync-logo.png   # atom emblem (transparent)
│   └── bync-banner.jpg # full logo lockup
├── .nojekyll           # serve files as-is on GitHub Pages
└── README.md
```

## Deploy (GitHub Pages)

1. Push to the `main` branch.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Branch: `main` / folder: `/ (root)` → **Save**.
4. The site publishes at the URL above within a minute or two.

## To-do (content)

- [ ] Wire the contact form to a Formspree form connected to **bync.bd@gmail.com**
- [ ] Custom domain (add a `CNAME` file when available)

---

© Bangladesh Youth Nuclear Congress. Built with ⚛️ for Bangladesh's nuclear future.
