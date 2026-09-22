---
layout: post.njk
title: "The Save That Wouldn't Travel: How My PvZ 2 Sync Failed"
ogTitle: The save that wouldn't travel
date: 2026-09-23
category: Projects
tags:
  - post
description: "I tried to back up a Plants vs. Zombies 2 save with git so it could survive a device change. The files copied fine. Then EA's servers reset the profile anyway. Here's what I learned."
excerpt: "A save backup project that worked right up until it didn't: copying PvZ 2's files was easy, but EA keys online progress to a per-install GUID that no file copy can move."
zhTitle: 带不走的存档：我的《植物大战僵尸2》同步为什么失败了
zhCategory: 项目
zhExcerpt: 一个备份工程，成功到一半就撞墙：复制《植物大战僵尸2》的存档文件很容易，但 EA 把在线进度绑定在每台设备各自生成的 GUID 上——这部分，文件复制搬不走。
permalink: /posts/pvz2-save-sync-failed.html
---
PvZ 2 doesn't offer a plain save file you can pick up and move. When the game runs without an EA, Google, or Apple account, there's no cloud save at all — the whole profile just lives in one folder on the phone. So I thought: fine, back it up myself.

The plan was simple. Android's `No_Backup` folder holds `pp.dat`, the snapshots, the quest state, everything. A small `adb` script pulls those files into a git repo, a matching script pushes them back onto another device. No cloud, no accounts, no money. My profile "User Dave" would survive any device change.

**And it worked — offline.**

Export from the phone, import to a tablet, boot the game with the network off, and there it is: 114,990 coins, 1,682 gems, all 76 plants. The files genuinely carry everything. I even wrapped the workflow in two scripts and wrote a full README with troubleshooting.

Then came the part I couldn't script around.

About twenty seconds into the first *online* launch on the new device, the restored profile collapsed. Same player ID, but coins and gems back to zero. The methodical narrowing: it wasn't the files (they always restored fine offline), it wasn't the package (same `com.ea.game.pvz2_na` build), it wasn't any file I could see. The reset only happened once the game talked to EA's servers.

Here's what I finally understood: **online progress is keyed to a per-install anonymous GUID** that EA stores in the app's private storage — `/data/data/...`, a sandboxed folder `adb` can't reach without root. That GUID is the game's real identity to EA. My phone's GUID is known to the servers and carries my progress. Any other device boots with a *new* GUID, so the first time it syncs, the server takes the profile back to zero — the client file copy is ignored.

So the project failed for a reason no tinkering could fix:

- The offline trick only delays it. An offline boot holds; the very next online boot on that device resets it.
- There's no in-game cloud/account icon in this version to attach an EA account instead.
- The last resort — an EA support ticket asking them to link my email to the anonymous GUID — may or may not come back.

I'm keeping the repo, but I've stopped calling it a solution. The README now says plainly: *"online progress is keyed to a per-install anonymous GUID; online-boot reset on a different device is not file-fixable."* I also got a genuinely nice artifact out of it — a fully decoded profile snapshot, with coordinates of the contract between "your files" and "their servers."

Three takeaways, in order of value:

1. **Document the wall, not just the work.** The final README — written after the failure — is more useful than the code that preceded it.
2. **The interesting boundary isn't always the file format.** It can be the identity layer above it.
3. **Failed small projects still teach the most per hour.** This one cost an evening and gave me the clearest picture I've had of how "your save" relates to "their cloud."

And for what it's worth, the lesson transfers: any offline-first tool that later meets a server that asserts its own truth about *who you are* will behave exactly like this. Epic, Valve, EA — the mechanics are always the same. Your files are what you get to keep; the id is what they get to keep.