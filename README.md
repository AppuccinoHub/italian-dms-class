# Italian DMs · Class Mode

**Separate app** from solo Italian DMs. Students pair up and practice **essere / avere** (+ fame, sete, freddo, caldo, sonno) in partner DMs for a grade. Teacher browser is the session hub (PeerJS) — no student cloud login.

- **Student join:** https://appuccinohub.github.io/italian-dms-class/
- **Teacher host:** https://appuccinohub.github.io/italian-dms-class/teacher.html
- **Solo practice (original):** https://appuccinohub.github.io/italian-dms/

## How Sue runs a graded session (5 steps)

1. Open **Teacher** on a laptop/Chromebook: `teacher.html` — keep this tab open.
2. Tap **Create session** (optional class name + PIN). Big **6-character code** appears.
3. Students open the Class URL on phones → **Join class** → enter code + first name.
4. On the teacher screen: **Auto-pair** (or tap two students). Watch live transcripts & %.
5. When pairs finish, students tap **Turn in**. Teacher **Export CSV** / **Copy summary** for the gradebook.

## Scoring rules

- **10 rounds** of prompted partner exchanges (ask + reply chips).
- Each chip choice that uses the **correct conjugation** scores a point.
- Running score shown to students; teacher sees pair **% = correct / tried**.
- Gentle wrong feedback (no shame UX). Free typing is not required — chips are the graded path.
- Help levels (More / Just right / Challenge) change chip count only.

## Pass & play fallback

If PeerJS is blocked on school Wi‑Fi, students use **Pass & play** on one phone, then paste the `IDMS1.…` code into teacher **Import submission**.

## School-network caveats

- Signaling uses the public PeerJS broker; some districts block WebRTC/WebSocket. Prefer Pass & play if joins fail.
- Teacher tab must stay open — it is the hub.
- Session roster/transcripts persist in the teacher browser’s `localStorage` (optional PIN to reopen).

## Link preview

`og.png` + Open Graph / Twitter card meta on student and teacher pages.
