---
layout: post.njk
title: My Library Loan Tracker
ogTitle: My library loan tracker
date: 2026-09-20
category: Projects
tags:
  - post
description: Two small projects that read Shenzhen's library sites for me — a loan tracker CLI and a borrow-history dashboard skill. Reversed, read-only, and kept simple.
excerpt: "Shenzhen's libraries don't offer public APIs, so I wrote my own tools: a loan tracker CLI and a borrow-history dashboard, both packaged as opencode skills."
zhTitle: 我的图书馆借书跟踪器
zhCategory: 项目
zhExcerpt: 图书馆没公开 API？那就自己顺着接口写两个小工具：一个命令行跟踪器——查在借、标逾期、存快照，凭据加密、卡号打码；一个技能——自动登录抓借阅史，出统计、报告和单文件看板。全程只读。至于代码？它写，我看，这是我的学法。
permalink: /posts/my-library-loan-tracker.html
---
Shenzhen's libraries don't offer public APIs — and they don't even share a system — so this became two small projects, both packaged as opencode skills:

**The loan tracker.** A command-line tool that checks all my reader accounts in one go: what's currently borrowed, due dates, and locations, with overdue books flagged right in the table. Each run writes a dated JSON/CSV snapshot, and a companion command lists past snapshots so I can look back at my reading history. Credentials are encrypted on disk (the passphrase lives in a `chmod 600` key file), account numbers are masked everywhere they might reach a file or screen, and a scheduler keeps it running on its own.

**The history dashboard.** The other system keeps a fuller reading ledger, guarded by a captcha login. Its skill logs me in by reading the captcha automatically, pulls months of borrow history, and computes simple statistics like monthly trends and top categories. That becomes two outputs: a Markdown report and a single-file HTML dashboard with the charting library inlined, so it opens anywhere with nothing to install.

Being packaged as skills means the know-how is written down, not just in my head. opencode can re-run a check, regenerate the dashboard, or fix a script when an endpoint shifts — which they do — without me re-teaching everything from scratch.

The lesson I keep re-learning: the most interesting code hides in the most ordinary problems. Nobody needs a trendy API to justify the fiddling — overdue books are enough. And the usual note on this site: opencode writes the code, I review and decide what ships. I don't claim to read every line, but reading its code is genuinely interesting to me.