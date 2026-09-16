---
layout: post.njk
title: "GitHub + Cloudflare Pages: Deploy by Push"
ogTitle: Deploy by push
date: 2026-09-06
category: Deployment
tags:
  - post
description: How cerfly made 'git push = new site' real with GitHub and Cloudflare Pages.
excerpt: "How I made \"git push = new site\" real, and the one stubborn CNAME that got in the way."
zhTitle: "GitHub + Cloudflare Pages: Deploy by Push"
zhCategory: 部署
zhExcerpt: 怎么做到"push 一下代码，网站就更新"，以及那个死活搞不定的 CNAME 是怎么挡我路的。
permalink: /posts/deploy-by-push.html
---
My goal was boring: one <code class="inline-code">git push</code> updates the site. No FTP, no file managers. Here's the path, including the bumps.

**1. Trust.** Added my SSH key to GitHub as an *Authentication key* — the wrong type means GitHub silently refuses it. Verified with <code class="inline-code">ssh -T git@github.com</code>.

**2. Push.** Made an *empty* public repo, then <code class="inline-code">git init -b main && git add . && git commit && git push -u origin main</code>.

**3. Connect.** Cloudflare Pages: Workers & Pages → Create application → connect a repository. Build command **blank**, output directory <code class="inline-code">/</code>.

**4. Domain.** Added <code class="inline-code">cerfly.net</code> under Custom domains. An old CNAME (<code class="inline-code">cerfly.net → cerfly.github.io</code>) was squatting on the name — deleted it, retried, activated.

Total cost: zero. The loop now is <code class="inline-code">git commit</code> + <code class="inline-code">git push</code>, and Cloudflare rebuilds and deploys for me.