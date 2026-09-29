---
layout: post.njk
title: "Moving My PvZ 2 Save: Part Two"
ogTitle: Moving my PvZ 2 save, part two
date: 2026-09-29
category: Projects
tags:
  - post
description: "Part two of the PvZ 2 save migration: the icons were hidden by a birth year, the move worked offline, and the server zeroed my coins seconds after I registered my email. What's next: converting currency into plants."
excerpt: "The PvZ 2 migration continued: a birth year hid the account icons, the save moved fine, then the server zeroed my coins. Next up: spend everything on plant upgrades and re-import."
zhTitle: 存档迁移（下）
zhCategory: 项目
zhExcerpt: 《植物大战僵尸2》存档迁移的下半部分：出生年份藏起了账号按钮，存档搬家成功，绑上邮箱联网几秒金币清零。下一步：把金币全换成植物升级，再导一次。
permalink: /posts/pvz2-migration-part-two.html
---
The [last post](/posts/pvz2-save-sync-failed.html) ended with a failed sync. Here's what happened next, in order:

1. **The icons were hidden by a birth year.** Years ago I entered 2020 at install, so the game treated me as a child and hid every account button. A test profile with an adult year brought them back. The save was never broken — the door was just invisible.
2. **Moved to the new phone.** Exported the save with the adb script, imported it, verified offline. Profile intact.
3. **Registered my email, went online, lost the coins.** Seconds after the first online launch, coins and gems dropped to zero. Plants, levels, everything else untouched. The email signed itself out on its own.
4. **Same signature as the tablet failure.** Updated theory: coins and gems live on the server's per-account ledger, and my fresh registration opened one that said zero. The client copy is a suggestion; the server's word is law. Plants and progress live on the device, so the server has no say over them.
5. **Verified the backup.** The repo copy is byte-identical to what I pushed — the phone can't alter it. Whatever happens next, the pre-migration state is safe.

**What's next:**

- **Hold for a few days.** Nothing degrades by waiting. The old phone keeps its full balances, the new phone stays offline with the email signed out. Waiting keeps every option open — most importantly, the support ticket stays viable until I spend anything.
- **The spending spree.** On the old phone: screenshot the balances, then spend everything offline — coins into plant upgrades, gems into unlocks. This moves value from the part the server controls into the part I control. Then re-export, push, re-import to the new phone, and verify offline. After that, an empty wallet is all the server can zero.
- **Decide on the email account.** Once there's no currency left to lose, re-linking it is low-risk and buys cloud backup for the progression. Or I leave it signed out and stay fully offline. Still undecided.
- **Done looks like:** the profile on the new phone, upgraded plants, no currency worth stealing, and a repo backup that actually restores.

The lesson, sharpened from last time: your files are what you get to keep. Everything else is a negotiation — know which parts you're negotiating over before you sit down.
