# cerfly.net

Personal website of cerfly — a self-taught developer learning by building.

## Stack

- **Eleventy** (11ty) static site generator — templates in `src/`, output in `_site/`
- Vanilla HTML + CSS + JavaScript (no runtime frameworks)
- Dark/light theme toggle: `js/main.js`, persisted in `localStorage`
- Two languages: English (root) and Chinese (`/zh/`), with an EN|中文 switcher in the nav

## Local development

```bash
npm install
npm run serve    # dev server with live reload (http://localhost:8080)
npm run build    # one-shot build into _site/
```

Every page is a Nunjucks template with YAML front matter. The nav and footer live once in `src/_includes/` (`en-base.njk`, `zh-base.njk`) instead of being copied into every page. Blog posts are plain Markdown in `src/posts/`; the blog index loops over the `post` collection.

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Landing page with "right now" updates (personal homepage) |
| `/about.html` | Self-taught story |
| `/blog.html` | Blog index (generated from `src/posts/*.md`) |
| `/posts/<slug>.html` | Individual blog posts |
| `/projects.html` | Projects (things I've built) |
| `/now.html` | What I'm doing now |
| `/zh/*` | Chinese mirror of the main pages |

## Deploy

- Hosted on **Cloudflare Pages/Workers static assets** at `https://cerfly.net` and `https://www.cerfly.net`
- Connected to the GitHub repo `cerfly/cerfly-net`
- `www` is a CNAME record pointing to the Workers asset host; SSL and routing handled by Cloudflare
- Build is run locally, the generated `_site/` is committed, and `wrangler.toml` serves `./_site`
- Every `git push` auto-rebuilds and redeploys:

```bash
npm run build && git add -A && git commit -m "..." && git push
```

Note: `wrangler.toml` sets `not_found_handling = "404-page"` so `_site/404.html` is served for missing routes.

## Launch plumbing

- `favicon.svg` — site icon
- `robots.txt` + `sitemap.xml` — search engines
- `404.html` — styled not-found page
- Open Graph / Twitter card meta on every page

Built with help from [opencode](https://opencode.ai), an AI coding assistant running in the terminal.