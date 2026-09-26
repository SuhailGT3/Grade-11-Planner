# Sudhuma — Know what's next

A timetable companion for high-school students: enter your timetable once,
see your day at a glance, and get reminded before every lesson.

Built step-by-step as a learning project. Current step: **Step 1 — foundation**.

## Repo map

| Path | What it is |
|---|---|
| `sudhuma/` | The new Next.js web app (the real product). |
| `index.html` | The original single-file "StudentOS" prototype. Kept as reference — ideas and design tokens may be carried over. Not part of the new app. |
| `gt09/` | GT-09 Racing engineering workspace: go-kart CAD lessons, generated cut list / plan view / design checks, and the path to the matric motorsport entrance. Start at `gt09/README.md`. |

## Run the app (Step 1)

Requirements: Node.js 20+.

```bash
cd sudhuma
npm install   # first time only, takes a few minutes
npm run dev   # start the local server
```

Then open http://localhost:3000 in your browser.

## Build plan

1. **Foundation** — project setup + branded landing hero. ← we are here
2. Timetable data model + manual entry form.
3. Today view with live "next lesson" logic.
4. Week view + edit/delete.
5. Reminders/notifications + PWA installability.
6. Polish, export/import backup, deploy.
