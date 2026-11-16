# Party Riders website

One-page website for Party Riders (Stage 1 of PRD v3): the planner's workspace, the couple's mobile portal and the public guest RSVP. Every view is built on the Stitch markup and its Tailwind config (Regal Celebration: plum, gold, Plus Jakarta Sans). `app.css` is the compiled Tailwind; photos are in `assets/img` (run `get-images.sh` once to download them).

Open `index.html` in a browser, or serve the folder (`npx serve .`).

- `index.html` — public marketing site (brand: plum #4A1942, gold #C9A227 — same palette as the planner demo; Poppins + Lato). Built from the Business Analysis, Marketing Analysis Report, pitch deck and survey charts. Includes the interactive Jollof Index Calculator and survey charts drawn in code.
- `app.html` — the planner workspace / client portal / guest RSVP demo below (loads `app.js`). Routes like `app.html#rsvp` work as listed.
- `index.backup-2026-11-16.html`, `app.backup-2026-11-16.css` — copies of the files as they were before the site rebuild.

## Pages

| Address | Who | What |
| --- | --- | --- |
| `app.html#events` | Planner | All events, stat tiles, event roster, due today |
| `#tasks` | Planner | All tasks across events, filter by event |
| `#clients` | Planner | Each client's invite status, package, fee and payment |
| `#event-adaeze-plan` | Planner | Planning sheet: add and edit items, budget |
| `#event-adaeze-guests` | Planner | Guest list, RSVP numbers, WhatsApp reminders |
| `#event-adaeze-approvals` | Planner | Decisions drafted, sent and approved |
| `#event-adaeze-people` | Planner | Client invite, family and collaborators with roles, engagement and payments |
| `#event-adaeze-notes` | Planner | Internal notes the client never sees |
| `#send-adaeze-i2` | Planner | Send approval request (shortlisted vendors, note, WhatsApp) |
| `#event-bisi-closeout` | Planner | Close-out: save as template, actual costs, vendor ratings, lessons |
| `#vendors` | Planner | Vetted vendor list; **Add vendor** |
| `#templates` | Planner | Templates; start a new event from one |
| `#new-event` | Planner | Create an event from a template |
| `#client-welcome` | Client | Invite landing: accept and open the portal |
| `#client-home` | Client | The client's portal: countdown, decisions, budget, invite family |
| `#client-decisions` | Client | Approve the planner's options |
| `#rsvp` | Guest | Invitation, RSVP and check-in pass |

## Picking a vendor for an item

Open any line on the planning sheet (or **Find vendor**). The drawer lists vetted vendors in that category:

- Tick one → **Book selected**: the item is confirmed with that vendor.
- Tick two or more → **Send N to the client**: opens the Send Approval Request page. Adjust quotes, mark your recommendation, write the note, **Send for Approval**.
- **The client has their own vendor**: add their name and number; the item is tracked as pending.
- The client chooses on her phone; the item becomes Confirmed and the budget updates.

## How the flow connects

1. Workspace → Approvals → **Review & send** (catering) → **Send for Approval**.
2. **See what Adaeze sees** opens her portal; she chooses and approves.
3. **Back to workspace**: the catering line is now Confirmed and the budget updates.
4. Guests tab → **Preview invitation** shows the guest RSVP page.
5. Mama Bisi at 60 → Close-out → rate vendors → **Close event** adds a new template.

Changes are saved in the browser. **Reset sample data** (bottom of the sidebar) restores the starting state.

All business, vendor and people names are invented sample data.
6. Aramide → People → **Send invite** → **Preview invite** → **Accept & open my portal**. On her portal, **Invite family** adds someone with view or approve access.
7. People tab → **Record a payment** updates the balance and payment status on the Clients page.
