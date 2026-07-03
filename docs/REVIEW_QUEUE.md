# Review Queue

This is the list of every question in `data/questions.ts` currently marked `needsReview: true` — content I authored without full confidence in the exact citation or correctness, mostly numeric table/formula values from the 2023 NEC.

**Workflow:** Check an item off here once you've confirmed it against the actual 2023 NEC. Once checked off, the corresponding `needsReview: true` field on that question in `data/questions.ts` should be removed (the entry can just stay checked here as a record). If a question turns out to be wrong rather than just unconfirmed, let me know instead of checking it off and I'll correct it.

Within each article, items are ordered most-consequential first — a numeric value used to size or install something ranks above a wording/labeling nuance.

Total flagged: **30** questions across 5 articles (110, 220, 230, 240, 300).

---

## Article 110 (2)

- [ ] **110-011** — Table 110.26(A)(1) working space depth, 151–600V, Condition 3
  Citation: `Table 110.26(A)(1)` · Marked correct: **4 feet (1.2 m)**
  Unsure about: Double-check the exact depth for Condition 3 at 151–600V — confirm it's 4 ft and not 3.5 ft, and that the 0–150V / 151–600V voltage-band split is still current for 2023.

- [ ] **110-014** — 110.26(E) dedicated equipment space, what it's reserved for
  Citation: `110.26(E)` · Marked correct: "Be reserved for the electrical installation, generally excluding foreign systems like piping and ductwork"
  Unsure about: Confirm the dedicated space's vertical extent (commonly cited as 6 ft above the equipment or to the structural ceiling) and whether foreign systems are fully prohibited there vs. merely restricted.

## Article 220 (9)

- [ ] **220-007** — Table 220.54 single dryer demand load minimum
  Citation: `Table 220.54` · Marked correct: **5000 watts**
  Unsure about: Confirm the 5000 W minimum-or-nameplate rule and that it applies to a single dryer as stated, not a multi-dryer scenario.

- [ ] **220-008** — Table 220.55 single range (≤12 kW) demand load
  Citation: `Table 220.55` · Marked correct: **8 kW**
  Unsure about: Confirm the ~8 kW figure against the actual table column/notes — Table 220.55 has multiple columns depending on appliance count and kW rating, easy to cite the wrong one.

- [ ] **220-005** — Table 220.42 general lighting demand factor, first 3000 VA
  Citation: `Table 220.42` · Marked correct: **100%**
  Unsure about: Confirm the exact 3000 VA breakpoint and that the first tier is undiscounted (100%) in the current table.

- [ ] **220-006** — 220.53 demand factor for 4+ fixed appliances
  Citation: `220.53` · Marked correct: **75%**
  Unsure about: Confirm 75% is still correct for 4+ fastened-in-place appliances, and that the excluded-appliance list (ranges/dryers/HVAC) is accurate.

- [ ] **220-009** — 220.61(B) neutral demand factor on ranges/dryers >200A
  Citation: `220.61(B)` · Marked correct: **70%**
  Unsure about: Confirm the 70% figure and the >200A threshold for the unbalanced neutral load on ranges/dryers/similar appliances.

- [ ] **220-010** — 220.82(B) optional method, first-tier breakpoint
  Citation: `220.82(B)` · Marked correct: **10 kVA**
  Unsure about: Confirm the 10 kVA breakpoint (and that the remainder is 40%) for the dwelling unit optional calculation method.

- [ ] **220-003** — 220.14(I) default receptacle load, other than dwelling units
  Citation: `220.14(I)` · Marked correct: **180 VA per outlet**
  Unsure about: Confirm 180 VA/outlet is still the current default value and hasn't been superseded or scope-restricted in 2023.

- [ ] **220-015** — Table 220.84 multifamily demand factor basis
  Citation: `Table 220.84` · Marked correct: "The number of dwelling units supplied by the feeder or service"
  Unsure about: Confirm the demand factor is keyed primarily to number of dwelling units and not some other variable.

- [ ] **220-011** — 220.87 existing-load lookback period
  Citation: `220.87` · Marked correct: **12 months**
  Unsure about: Confirm 12 months is the correct lookback period for existing maximum demand data (vs. a different interval or a percentage-based rule).

## Article 230 (8)

- [ ] **230-006** — 230.24(B)(5) vertical clearance over truck-traffic areas
  Citation: `230.24(B)(5)` · Marked correct: **18 feet**
  Unsure about: Confirm 18 ft for truck-traffic areas and that it isn't confused with the 15 ft tier for non-truck-traffic commercial areas over 300V.

- [ ] **230-005** — 230.24(B)(2) vertical clearance over residential property, ≤300V
  Citation: `230.24(B)(2)` · Marked correct: **12 feet**
  Unsure about: Confirm the 12 ft figure and the ≤300V threshold for residential property/driveways.

- [ ] **230-004** — 230.24(B)(1) vertical clearance at building entrance, ≤150V
  Citation: `230.24(B)(1)` · Marked correct: **10 feet**
  Unsure about: Confirm 10 ft applies specifically at the point of entrance/drip loop for ≤150V to ground, not a different voltage/location combination.

- [ ] **230-003** — 230.9(A) window/door clearance for overhead conductors
  Citation: `230.9(A)` · Marked correct: **3 feet**
  Unsure about: Confirm the 3 ft figure and exactly which openings it applies to (windows designed to open vs. also doors/porches).

- [ ] **230-011** — 230.79(C) minimum service disconnect rating, one-family dwelling
  Citation: `230.79(C)` · Marked correct: **100 amperes**
  Unsure about: Confirm 100A specifically applies to one-family dwellings and not a different occupancy tier in the 230.79 table.

- [ ] **230-009** — 230.71(A) max number of grouped service disconnects
  Citation: `230.71(A)` · Marked correct: **Six**
  Unsure about: Confirm "six" is still the current disconnect count limit — this rule's wording has shifted across recent code cycles.

- [ ] **230-014** — 230.6 conductors under a building treated as outside
  Citation: `230.6` · Marked correct: "This statement is accurate"
  Unsure about: Confirm the specific conditions (concrete thickness, burial depth, etc.) under which under-building conductors are treated as outside the building, against the current 230.6 list rather than my paraphrase.

- [ ] **230-013** — 230.85 emergency disconnect marking requirement
  Citation: `230.85` · Marked correct: 'Marked "EMERGENCY DISCONNECT" and located outside, or nearest the point of entrance of the service conductors'
  Unsure about: Confirm the exact required marking text and location wording — this is a relatively recent (2020+) NEC addition I'm less sure of verbatim.

## Article 240 (7)

- [ ] **240-008** — 240.21(B)(1) 10-ft tap rule length
  Citation: `240.21(B)(1)` · Marked correct: **10 feet**
  Unsure about: Confirm the 10 ft tap length and that no other condition of the 10-ft tap rule was misstated or omitted.

- [ ] **240-009** — 240.21(B)(2) 25-ft tap rule ampacity fraction
  Citation: `240.21(B)(2)` · Marked correct: "One-third the rating of the feeder overcurrent device"
  Unsure about: Confirm the 1/3 ampacity fraction for the 25-ft tap rule and the exact conditions attached to it.

- [ ] **240-006** — 240.4(B) next-size-up ceiling
  Citation: `240.4(B)` · Marked correct: **800 amperes**
  Unsure about: Confirm the 800A ceiling on the "round up to next standard size" allowance and that no additional conditions were omitted.

- [ ] **240-007** — 240.6(A) standard ampere rating list
  Citation: `240.6(A)` · Marked correct: **70 amperes**
  Unsure about: Confirm 70A is on the current standard ampere rating list and that none of the distractor values are accidentally also standard sizes.

- [ ] **240-015** — 240.87 arc energy reduction trigger/purpose
  Citation: `240.87` · Marked correct: "Reduce clearing time in the event of an arcing fault"
  Unsure about: Confirm the ampere rating / adjustable trip-setting thresholds that actually trigger this requirement — I described the concept correctly but I'm not confident on the exact numeric trigger.

- [ ] **240-011** — 240.24(A)(5) max breaker handle height
  Citation: `240.24(A)(5)` · Marked correct: **6 feet 7 inches**
  Unsure about: Confirm this figure isn't confused with the separate 6.5 ft working-space height rule in 110.26(A)(3).

- [ ] **240-014** — 240.83 breaker marking visibility threshold
  Citation: `240.83(A)`, `240.83(B)` · Marked correct: "Visible after installation, without needing to remove the panel trim or cover for breakers rated 100 amperes or less"
  Unsure about: Confirm the 100A breakpoint for visible-marking-without-cover-removal and that I haven't conflated it with a different threshold.

## Article 300 (4)

- [ ] **300-004** — Table 300.5 general direct-burial cover depth
  Citation: `Table 300.5` · Marked correct: **24 inches**
  Unsure about: Confirm 24 in is still the general/default direct-burial cover depth in the current table, not a value carried over from an older edition.

- [ ] **300-006** — Table 300.5 GFCI-protected residential branch circuit cover depth
  Citation: `Table 300.5` · Marked correct: **12 inches**
  Unsure about: Confirm 12 in applies to ≤120V/20A residential branch circuits with GFCI protection, and that both conditions (GFCI + 20A max) are required together, not independently sufficient.

- [ ] **300-005** — Table 300.5 RMC/IMC cover depth
  Citation: `Table 300.5` · Marked correct: **6 inches**
  Unsure about: Confirm 6 in for RMC/IMC and that the column applies regardless of location (not just under buildings).

- [ ] **300-007** — Table 300.5 low-voltage landscape circuit cover depth
  Citation: `Table 300.5` · Marked correct: **6 inches**
  Unsure about: Confirm 6 in for ≤30V landscape/irrigation circuits and that Type UF cable is correctly listed as a qualifying method.
