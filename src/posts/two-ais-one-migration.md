---
layout: post.njk
title: Two AIs, One Migration
ogTitle: Two AIs, one migration
date: 2026-09-16
category: Building
tags:
  - post
description: How cerfly's site moved to Eleventy — a second AI suggested it, opencode built it, and the pages still ship as plain HTML.
excerpt: The move to Eleventy, step by step — proposed by Claude, built with opencode, still plain HTML on the client.
zhTitle: 两个 AI，一次迁移
zhCategory: 建站
zhExcerpt: 迁移到 Eleventy 的主意来自 Claude——导航已经改错两回，多语言页面越叠越多。opencode 动手落地：一套共享模板，几行命令，发给浏览器的仍是朴素 HTML。
permalink: /posts/two-ais-one-migration.html
---
The idea for this wasn't mine — it was Claude's. In a planning session it said the highest-leverage change left was moving the site to a static site generator: I'd already tripped over the nav-sync bug twice, and every new page made keeping language versions in sync by hand harder. A shared template would end it permanently.

opencode and I did the work. The main steps:

1. **Install:** `npm install --save-dev @11ty/eleventy`; configure `.eleventy.js` to read `src/` and output `_site/`.
2. **Templates:** one shared layout per language in `src/_includes/` for the nav and footer; each page becomes a template with a `permalink` that keeps the old `.html` URLs.
3. **Blog:** posts are Markdown in `src/posts/` with a date and category; the index builds itself from the `post` collection.
4. **Build:** `npm run build` writes everything to `_site/`; `npm run serve` live-previews at `localhost:8080`.
5. **Deploy:** `wrangler.toml` now serves `./_site`; the generated `_site/` is committed, so `git push` still ships the site.

What didn't change matters more. The pages the browser loads are still plain HTML — same CSS, same JavaScript, same URLs. Eleventy is a build tool, not a runtime framework, so the "no frameworks" spirit survives. The difference is pages get assembled instead of pasted.

The honest footnote: this site is written by opencode and steered by me — and the migration idea came from Claude. Three parties, one tiny website. It's true, so the site says so.