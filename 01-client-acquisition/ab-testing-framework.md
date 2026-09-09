# A/B Testing Framework — Outreach, Ads, and Applications

Discipline over intuition. Every variable below gets tested with a defined sample size and a kill/scale decision — no "vibes-based" iteration.

## Testing rules
1. **One variable per test.** Never change subject line AND CTA in the same test.
2. **Minimum sample size before deciding:** 50 sends per variant for email, 20 impressions-per-dollar-spent minimum for ads (roughly $50+ spend before judging).
3. **Statistical honesty:** a 3-reply difference between two 50-send batches is noise, not a winner. Require at least a 2x gap in rate before calling it.
4. **Kill criteria:** any variant under 2% reply rate after 50 sends gets killed immediately — that's below half the 2026 B2B floor benchmark (3.43%).
5. **Document every test** in the tracker (`04-tracking-and-ops/25-day-sprint-tracker.md`) — variant, sample size, result, decision.

## What to test, in priority order

### 1. Subject lines (highest leverage, cheapest to test)
Test 3 variants per ICP sequence simultaneously (split list into thirds):
- Curiosity-based ("the fix I'd make first")
- Specificity-based ("[Brand]'s ROAS leak")
- Question-based ("quick question on [Company]'s ads")
Target: identify winner by Day 5, roll 100% of remaining Week 1 volume to it.

### 2. Opening hook (first 2 lines)
- Research-based observation vs. direct stat-drop vs. shared-connection/social-proof opener.

### 3. CTA framing
- "15-min free audit" vs. "3 fixes I'd make (free)" vs. "want the sketch?" (lower-commitment ask).
- Lower-friction CTAs typically outperform "book a call" for cold (unfamiliar) audiences — test this explicitly, don't assume.

### 4. Send time/day
- Tuesday-Thursday, 8-10am recipient local time vs. mid-afternoon. Track reply rate by send-hour in HubSpot.

### 5. Ad creative (once Meta/Google retargeting is live)
- Static image vs. UGC-style video vs. carousel case-study format.
- Hook variants: pain-first ("Still guessing on ad spend?") vs. proof-first ("We took this brand from $X to $Y ROAS").
- Budget guardrail: kill any ad set with CPL >$25 after $50 spend; scale anything under $15 CPL.

### 6. Landing page / lead magnet
- "Free Funnel Audit" vs. "Free Value-Ladder PDF" as the primary CTA — track opt-in rate, not just traffic.

## Weekly test cadence
| Week | Primary Test | Decision by |
|---|---|---|
| 1 | Subject lines (3 variants) | Day 5 |
| 2 | CTA framing + opening hook | Day 12 |
| 3 | Ad creative + landing page | Day 19 |
| 4 | Consolidate winners into permanent SOP | Day 25 |

## Reporting format (log every test this way)
```
Test: [variable tested]
Variant A: [description] — sends: __ replies: __ rate: __%
Variant B: [description] — sends: __ replies: __ rate: __%
Winner: __
Action: [rolled out / killed / needs more data]
```
