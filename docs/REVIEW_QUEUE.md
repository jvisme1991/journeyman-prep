# Review Queue

**✅ Review pass completed.** All 30 items below have been verified directly against the 2023 NEC PDF. 24 were confirmed correct as originally written. 6 needed a fix — 4 citation-only (the answer/value was right, only the cited section number was wrong) and 2 content corrections (the answer itself was wrong or conflated two provisions). All 6 have been corrected in `data/questions.ts` and their `needsReview: true` flags removed; each corrected item below is marked accordingly.

This was the list of every question in `data/questions.ts` that had been marked `needsReview: true` — content authored without full confidence in the exact citation or correctness, mostly numeric table/formula values from the 2023 NEC.

**Workflow:** Check an item off here once you've confirmed it against the actual 2023 NEC. Once checked off, the corresponding `needsReview: true` field on that question in `data/questions.ts` should be removed (the entry can just stay checked here as a record). If a question turns out to be wrong rather than just unconfirmed, let me know instead of checking it off and I'll correct it.

Within each article, items are ordered most-consequential first — a numeric value used to size or install something ranks above a wording/labeling nuance.

Total flagged: **30** questions across 5 articles (110, 220, 230, 240, 300) — **0 remaining**, all resolved.

---

## Article 110 (2)

- [x] **110-011** — Table 110.26(A)(1) working space depth, 151–600V, Condition 3
  Citation: `Table 110.26(A)(1)` · Marked correct: **4 feet (1.2 m)**
  Unsure about: Double-check the exact depth for Condition 3 at 151–600V — confirm it's 4 ft and not 3.5 ft, and that the 0–150V / 151–600V voltage-band split is still current for 2023.

- [x] **110-014** — 110.26(E) dedicated equipment space, what it's reserved for
  Citation: `110.26(E)` · Marked correct: "Be reserved for the electrical installation, generally excluding foreign systems like piping and ductwork"
  Unsure about: Confirm the dedicated space's vertical extent (commonly cited as 6 ft above the equipment or to the structural ceiling) and whether foreign systems are fully prohibited there vs. merely restricted.

## Article 220 (9)

- [x] **220-007** — Table 220.54 single dryer demand load minimum
  Citation: `Table 220.54` · Marked correct: **5000 watts**
  Unsure about: Confirm the 5000 W minimum-or-nameplate rule and that it applies to a single dryer as stated, not a multi-dryer scenario.

- [x] **220-008** — Table 220.55 single range (≤12 kW) demand load
  Citation: `Table 220.55` · Marked correct: **8 kW**
  Unsure about: Confirm the ~8 kW figure against the actual table column/notes — Table 220.55 has multiple columns depending on appliance count and kW rating, easy to cite the wrong one.

- [x] **220-005** — Table 220.45 general lighting demand factor, first 3000 VA *(citation corrected)*
  Citation: ~~`Table 220.42`~~ → `Table 220.45` · Marked correct: **100%**
  Corrected: the 3000 VA / 100% demand-factor value was right, but it lives in Table 220.45, not Table 220.42 (which is general lighting *unit loads by occupancy type*, not the demand factor table). Citation fixed in the question text and `references`.

- [x] **220-006** — 220.53 demand factor for 4+ fixed appliances
  Citation: `220.53` · Marked correct: **75%**
  Unsure about: Confirm 75% is still correct for 4+ fastened-in-place appliances, and that the excluded-appliance list (ranges/dryers/HVAC) is accurate.

- [x] **220-009** — 220.61(B) neutral demand factor on ranges/dryers >200A
  Citation: `220.61(B)` · Marked correct: **70%**
  Unsure about: Confirm the 70% figure and the >200A threshold for the unbalanced neutral load on ranges/dryers/similar appliances.

- [x] **220-010** — 220.82(B) optional method, first-tier breakpoint
  Citation: `220.82(B)` · Marked correct: **10 kVA**
  Unsure about: Confirm the 10 kVA breakpoint (and that the remainder is 40%) for the dwelling unit optional calculation method.

- [x] **220-003** — 220.14(I) default receptacle load, other than dwelling units
  Citation: `220.14(I)` · Marked correct: **180 VA per outlet**
  Unsure about: Confirm 180 VA/outlet is still the current default value and hasn't been superseded or scope-restricted in 2023.

- [x] **220-015** — Table 220.84 multifamily demand factor basis
  Citation: `Table 220.84` · Marked correct: "The number of dwelling units supplied by the feeder or service"
  Unsure about: Confirm the demand factor is keyed primarily to number of dwelling units and not some other variable.

- [x] **220-011** — 220.87 existing-load lookback period
  Citation: `220.87` · Marked correct: **12 months**
  Unsure about: Confirm 12 months is the correct lookback period for existing maximum demand data (vs. a different interval or a percentage-based rule).

## Article 230 (8)

- [x] **230-006** — 230.24(B)(4) vertical clearance over truck-traffic areas *(citation corrected)*
  Citation: ~~`230.24(B)(5)`~~ → `230.24(B)(4)` · Marked correct: **18 feet**
  Corrected: 18 ft for truck-traffic areas was right, but (B)(5) is actually the 24½ ft railroad-track clearance — the 18 ft truck-traffic value is under (B)(4).

- [x] **230-005** — 230.24(B)(2) vertical clearance over residential property, ≤300V
  Citation: `230.24(B)(2)` · Marked correct: **12 feet**
  Unsure about: Confirm the 12 ft figure and the ≤300V threshold for residential property/driveways.

- [x] **230-004** — 230.24(B)(1) vertical clearance at building entrance, ≤150V
  Citation: `230.24(B)(1)` · Marked correct: **10 feet**
  Unsure about: Confirm 10 ft applies specifically at the point of entrance/drip loop for ≤150V to ground, not a different voltage/location combination.

- [x] **230-003** — 230.9(A) window/door clearance for overhead conductors
  Citation: `230.9(A)` · Marked correct: **3 feet**
  Unsure about: Confirm the 3 ft figure and exactly which openings it applies to (windows designed to open vs. also doors/porches).

- [x] **230-011** — 230.79(C) minimum service disconnect rating, one-family dwelling
  Citation: `230.79(C)` · Marked correct: **100 amperes**
  Unsure about: Confirm 100A specifically applies to one-family dwellings and not a different occupancy tier in the 230.79 table.

- [x] **230-009** — 230.71(B) max number of grouped service disconnects *(citation corrected)*
  Citation: ~~`230.71(A)`~~ → `230.71(B)` · Marked correct: **Six**
  Corrected: "six" was right, but 230.71(A) only defines what does *not* count as a disconnecting means — the "up to six disconnects" rule itself is in (B).

- [x] **230-014** — 230.6 conductors under a building treated as outside
  Citation: `230.6` · Marked correct: "This statement is accurate"
  Unsure about: Confirm the specific conditions (concrete thickness, burial depth, etc.) under which under-building conductors are treated as outside the building, against the current 230.6 list rather than my paraphrase.

- [x] **230-013** — 230.85 emergency disconnect marking requirement *(content corrected)*
  Citation: `230.85` (unchanged) · Marked correct (corrected): Marked "EMERGENCY DISCONNECT" (red background, white text) and located in a **readily accessible outdoor location on or within sight of the dwelling unit**
  Corrected: the marking text was right, but the location requirement was wrong — it's not "nearest the point of entrance of the service conductors," it's specifically an outdoor location on or within sight of the dwelling. Answer text and explanation rewritten to match.

## Article 240 (7)

- [x] **240-008** — 240.21(B)(1) 10-ft tap rule length
  Citation: `240.21(B)(1)` · Marked correct: **10 feet**
  Unsure about: Confirm the 10 ft tap length and that no other condition of the 10-ft tap rule was misstated or omitted.

- [x] **240-009** — 240.21(B)(2) 25-ft tap rule ampacity fraction
  Citation: `240.21(B)(2)` · Marked correct: "One-third the rating of the feeder overcurrent device"
  Unsure about: Confirm the 1/3 ampacity fraction for the 25-ft tap rule and the exact conditions attached to it.

- [x] **240-006** — 240.4(B) next-size-up ceiling
  Citation: `240.4(B)` · Marked correct: **800 amperes**
  Unsure about: Confirm the 800A ceiling on the "round up to next standard size" allowance and that no additional conditions were omitted.

- [x] **240-007** — 240.6(A) standard ampere rating list
  Citation: `240.6(A)` · Marked correct: **70 amperes**
  Unsure about: Confirm 70A is on the current standard ampere rating list and that none of the distractor values are accidentally also standard sizes.

- [x] **240-015** — 240.87 arc energy reduction trigger/purpose
  Citation: `240.87` · Marked correct: "Reduce clearing time in the event of an arcing fault"
  Unsure about: Confirm the ampere rating / adjustable trip-setting thresholds that actually trigger this requirement — I described the concept correctly but I'm not confident on the exact numeric trigger.

- [x] **240-011** — 240.24(A) max breaker handle height *(citation corrected)*
  Citation: ~~`240.24(A)(5)`~~ → `240.24(A)` · Marked correct: **6 feet 7 inches**
  Corrected: 6 ft 7 in. was right, but there's no subsection (5) — the exceptions under 240.24(A) only go to (4), and the 6 ft 7 in. figure itself is stated in the main (A) paragraph, not a numbered subsection.

- [x] **240-014** — 240.83(B) breaker marking permanence for ≤100A breakers *(content corrected)*
  Citation: ~~`240.83(A)`, `240.83(B)`~~ → `240.83(B)` only · Marked correct (corrected): "Durably molded, stamped, or etched into the handle or escutcheon"
  Corrected: the original question conflated two separate provisions — 240.83(A) is a general *allowance* that a breaker's ampere marking may be made visible by removing a trim or cover, unrelated to any ampere threshold; 240.83(B) *separately* requires breakers rated 100A or less to have the rating durably molded/stamped/etched into the handle or escutcheon (a permanence requirement, not a visibility-without-cover-removal one). Rewritten to test 240.83(B) alone.

## Article 300 (4)

- [x] **300-004** — Table 300.5 general direct-burial cover depth
  Citation: `Table 300.5` · Marked correct: **24 inches**
  Unsure about: Confirm 24 in is still the general/default direct-burial cover depth in the current table, not a value carried over from an older edition.

- [x] **300-006** — Table 300.5 GFCI-protected residential branch circuit cover depth
  Citation: `Table 300.5` · Marked correct: **12 inches**
  Unsure about: Confirm 12 in applies to ≤120V/20A residential branch circuits with GFCI protection, and that both conditions (GFCI + 20A max) are required together, not independently sufficient.

- [x] **300-005** — Table 300.5 RMC/IMC cover depth
  Citation: `Table 300.5` · Marked correct: **6 inches**
  Unsure about: Confirm 6 in for RMC/IMC and that the column applies regardless of location (not just under buildings).

- [x] **300-007** — Table 300.5 low-voltage landscape circuit cover depth
  Citation: `Table 300.5` · Marked correct: **6 inches**
  Unsure about: Confirm 6 in for ≤30V landscape/irrigation circuits and that Type UF cable is correctly listed as a qualifying method.
