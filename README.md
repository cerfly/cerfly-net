# cerfly.net

Personal website of cerfly — a self-taught developer learning by building.

## Stack

- Vanilla HTML + CSS + JavaScript (no frameworks)
- Dark/light theme toggle: `js/main.js`, persisted in `localStorage`
- Two languages: English (root) and Spanish (`/es/`), with an EN|ES switcher in the nav

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Landing page with "right now" updates (personal homepage) |
| `/about.html` | Self-taught story |
| `/blog.html` | Blog index (excerpts, unique links per post) |
| `/posts/<slug>.html` | Individual blog posts |
| `/projects.html` | Projects (things I've built) |
| `/now.html` | What I'm doing now |
| `/ai.html` | How I use opencode / AI |
| `/es/*` | Spanish mirror of the main pages |

## Deploy

- Hosted on **Cloudflare Pages** at `https://cerfly.net`
- Connected to the GitHub repo `cerfly/cerfly-net`
- Build command: none. Output directory: `/`
- Every `git push` auto-builds and redeploys:

```bash
git add -A && git commit -m "..." && git push
```

Note: the project deploy as a Workers static-assets app, so `wrangler.toml` configures `not_found_handling = "404-page"` to serve `404.html`.

## Launch plumbing

- `favicon.svg` — site icon
- `robots.txt` + `sitemap.xml` — search engines
- `404.html` — styled not-found page
- Open Graph / Twitter card meta on every page

Built with help from [opencode](https://opencode.ai), an AI coding assistant running in the terminal.