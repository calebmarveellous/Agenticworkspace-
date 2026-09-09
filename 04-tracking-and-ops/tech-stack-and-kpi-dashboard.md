# Tech Stack Wiring & KPI Dashboard

Purpose: know within 48 hours which channel/message is underperforming so you can kill it per the A/B testing framework's kill criteria, rather than discovering it on Day 20.

## Stack wiring

### HubSpot CRM (central source of truth)
- Create a pipeline: `Lead In → Contacted → Replied → Call Booked → Proposal Sent → Closed Won/Lost`.
- Tag every contact by ICP (1-5, per `icp-profiles.md`) and by source channel (Cold Email / LinkedIn / Referral / Ads / Content).
- Log every send, reply, and call outcome here — not in a spreadsheet, not in your memory.

### Mailchimp (nurture, not cold send)
- Use for warming/nurturing replied-but-not-yet-booked leads with case-study content, not for cold outbound (cold outbound runs through dedicated sending infrastructure to protect domain reputation — see note below).
- Segment by ICP for relevant case-study nurture content.

### GA4 + Looker Studio (attribution + portfolio performance)
- GA4 on the Lovable portfolio site: track CTA clicks (Book a Call), scroll depth on case studies, traffic source.
- Looker Studio dashboard combining GA4 + HubSpot data: one view showing lead volume by source, cost-per-lead (once ads are live), and call-to-close rate by ICP.

### Job application tracker (simple table — Notion, Airtable, or spreadsheet is fine here, doesn't need HubSpot)
Columns: Company | Role | Date Applied | Source (board name) | JD Keyword Match % | Status | Follow-up Date.

## Deliverability protection (don't skip this — it silently kills outbound)
- Use a dedicated sending domain (subdomain of your main domain) for cold email, separate from your primary business email — protects your main domain's reputation if deliverability dips.
- Warm up any new sending domain for 5-7 days before full volume (start at 10-15/day, ramp to 40-60/day).
- Never exceed ~50 cold sends per mailbox per day.

## Weekly KPI review (every Sunday, non-negotiable)
| Metric | Where tracked | Week 1 target | Kill/scale threshold |
|---|---|---|---|
| Cold emails sent | HubSpot | 300+ | — |
| Reply rate | HubSpot | ≥4%, target 6%+ | Kill any sequence <2% after 50 sends |
| Calls booked | HubSpot | 3-5 | — |
| Applications sent | Job tracker | 35-40 | — |
| Application → screen rate | Job tracker | track, no target yet Week 1 | Revisit resume if <5% by Week 2 |
| Portfolio CTA click rate | GA4 | track baseline | Improve hero/proof-bar if <2% |
| Cost per lead (once ads live) | Looker Studio | <$25 | Kill ad set >$25 after $50 spend |
| Blended CAC | Looker Studio (manual calc: total spend / clients closed) | track vs. $850 industry benchmark | Investigate any channel pushing blended CAC above benchmark |

## Dashboard build order (don't over-engineer before you have data)
1. Week 1: HubSpot pipeline + job tracker only — get the process running.
2. Week 2: GA4 on portfolio site, basic Looker Studio pipeline-volume view.
3. Week 3: Full Looker Studio dashboard blending ad spend (once live) + HubSpot close data for real CAC tracking.
