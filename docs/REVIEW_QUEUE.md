# Review Queue

This is the list of every question in `data/questions.ts` currently marked `needsReview: true` — content authored without full confidence in the exact citation or correctness, mostly numeric table/formula values from the 2023 NEC. All 32 items are from the most recent content batch (Articles 215, 250, 310, 314, 430, 450, brought up to 15 questions each).

**Workflow:** Check an item off here once you've confirmed it against the actual 2023 NEC. Once checked off, the corresponding `needsReview: true` field on that question in `data/questions.ts` should be removed (the entry can just stay checked here as a record). If a question turns out to be wrong rather than just unconfirmed, let me know instead of checking it off and I'll correct it.

Within each article, items are ordered most-consequential first — a numeric value used to size or install something ranks above a wording/labeling nuance.

Total flagged: **32** questions across 6 articles (215, 250, 310, 314, 430, 450).

---

## Article 215 (2)

- [ ] **215-005** — 215.4(A) common neutral, "two or three sets" limit
  Citation: `215.4(A)` · Marked correct: "Up to two or three sets of feeder conductors installed in the same raceway or cable"
  Unsure about: Confirm the "two or three sets" figure and that installing them in the same raceway/cable is indeed a condition of this allowance.

- [ ] **215-004** — 215.2 Informational Note voltage-drop recommendation
  Citation: `215.2, Informational Note` · Marked correct: "A recommendation only, not a mandatory Code requirement"
  Unsure about: Confirm the recommended voltage-drop percentage figure (commonly cited as ~3% feeder / ~5% combined) is accurately represented, even though the mandatory-vs-recommended framing itself is solid.

## Article 250 (4)

- [ ] **250-009** — Table 250.66 grounding electrode conductor sizing basis
  Citation: `Table 250.66` · Marked correct: "The size of the largest ungrounded service-entrance conductor"
  Unsure about: Confirm Table 250.66 is genuinely keyed to the largest ungrounded service-entrance conductor as stated, and that this isn't being confused with the OCPD-based logic used for equipment grounding conductors instead.

- [ ] **250-011** — Table 250.102(C)(1) bonding jumper sizing, relation to Table 250.66
  Citation: `Table 250.102(C)(1)` · Marked correct: "Table 250.66 (grounding electrode conductor sizing)"
  Unsure about: Confirm Table 250.102(C)(1) is genuinely structured similarly to Table 250.66 as stated — the two tables use related but distinct logic and I want the general parallel confirmed rather than assumed.

- [ ] **250-006** — 250.53 rod electrode minimum driven length
  Citation: `250.53(G)` · Marked correct: **8 feet**
  Unsure about: Confirm the 8 ft minimum driven length for a single rod electrode against the current 250.53 text, and that I've cited the right subsection.

- [ ] **250-007** — 250.56 electrode resistance threshold
  Citation: `250.56` · Marked correct: **Supplemented with one additional electrode** (threshold: over 25 ohms)
  Unsure about: Confirm the 25-ohm threshold and that exceeding it requires exactly one additional electrode (not more).

## Article 310 (8)

- [ ] **310-004** — Table 310.16 ampacity, 12 AWG copper at 90°C
  Citation: `Table 310.16` · Marked correct: **30 amperes**
  Unsure about: Confirm 30A for 12 AWG copper at the 90°C column in the current table.

- [ ] **310-005** — Table 310.16 ampacity, 10 AWG copper at 75°C
  Citation: `Table 310.16` · Marked correct: **35 amperes**
  Unsure about: Confirm 35A for 10 AWG copper at the 75°C column.

- [ ] **310-006** — Table 310.16 ampacity, 8 AWG copper at 75°C
  Citation: `Table 310.16` · Marked correct: **50 amperes**
  Unsure about: Confirm 50A for 8 AWG copper at the 75°C column.

- [ ] **310-009** — Table 310.15(C)(1) fill adjustment, 4-6 conductors
  Citation: `Table 310.15(C)(1)` · Marked correct: **80%**
  Unsure about: Confirm 80% is the correct adjustment factor for 4-6 current-carrying conductors sharing a raceway or cable.

- [ ] **310-010** — Table 310.15(C)(1) fill adjustment, 7-9 conductors
  Citation: `Table 310.15(C)(1)` · Marked correct: **70%**
  Unsure about: Confirm 70% is the correct adjustment factor for 7-9 current-carrying conductors.

- [ ] **310-011** — Neutral conductor counting exception for fill adjustment
  Citation: `Table 310.15(C)(1), Note` · Marked correct: "Not counted as a current-carrying conductor"
  Unsure about: Confirm the neutral-counting exception (and its exact location/numbering, since I've cited it generically as "Table 310.15(C)(1), Note" rather than a specific note number) against the current text.

- [ ] **310-012** — General minimum conductor size for wiring
  Citation: `310.106(A)` · Marked correct: **14 AWG**
  Unsure about: Confirm 14 AWG copper is stated as the general minimum in 310.106(A) specifically, rather than in a different section (e.g., 210.19) — I'm not fully confident of the exact citation, even though the 14 AWG figure itself is well-established.

- [ ] **310-013** — Wet/dry 90°C insulation ratings (e.g., XHHW-2 vs. THHN)
  Citation: `Table 310.104(A)` · Marked correct: "Dry locations only at their 90°C rating" (for THHN)
  Unsure about: Confirm which specific insulation types are wet/dry-rated at 90°C vs. dry-only, since I generalized rather than citing an exact letter-code table entry.

## Article 314 (6)

- [ ] **314-012** — 314.28(A)(1) straight-pull box sizing multiplier
  Citation: `314.28(A)(1)` · Marked correct: "8 times the trade diameter of the largest raceway"
  Unsure about: Confirm the 8x multiplier for straight pulls of conductors 4 AWG or larger.

- [ ] **314-013** — 314.28(A)(2) angle/U-pull box sizing formula
  Citation: `314.28(A)(2)` · Marked correct: "The sum of the diameters of the other raceways on the same wall" (added to 6x the largest raceway)
  Unsure about: Confirm the 6x-plus-sum-of-other-raceways formula for angle/U pulls.

- [ ] **314-006** — Table 314.16(B) volume allowance for 12 AWG
  Citation: `Table 314.16(B)` · Marked correct: **2.25 cubic inches**
  Unsure about: Confirm 2.25 cubic inches is the correct allowance for 12 AWG specifically.

- [ ] **314-003** — 314.16(B)(4) device volume-allowance multiplier
  Citation: `314.16(B)(4)` · Marked correct: "Two volume allowances, based on the largest conductor connected to it"
  Unsure about: Confirm a device counts as exactly two volume allowances (not some other multiplier).

- [ ] **314-004** — 314.16(B)(5) equipment grounding conductor counting
  Citation: `314.16(B)(5)` · Marked correct: "One single volume allowance total, based on the largest one present"
  Unsure about: Confirm all equipment grounding conductors together count as exactly one allowance (based on the largest), not one per conductor.

- [ ] **314-005** — 314.16(B)(2) clamp volume-allowance counting
  Citation: `314.16(B)(2)` · Marked correct: "One volume allowance, based on the largest conductor in the box"
  Unsure about: Confirm clamps count as one combined allowance based on the largest conductor present, regardless of how many clamps are in the box.

## Article 430 (8)

- [ ] **430-004** — 430.22 single-motor branch-circuit conductor margin
  Citation: `430.22` · Marked correct: **125% of the motor's full-load current**
  Unsure about: Confirm 125% is the correct branch-circuit conductor margin over FLC.

- [ ] **430-005** — 430.24 conductors supplying several motors, formula
  Citation: `430.24` · Marked correct: "The sum of the full-load currents of the other motors" (added to 125% of the largest)
  Unsure about: Confirm the "largest motor at 125%, plus sum of the others at 100%" formula.

- [ ] **430-009** — Table 430.52 non-time-delay fuse maximum
  Citation: `Table 430.52` · Marked correct: **300% of full-load current**
  Unsure about: Confirm 300% is the correct non-time-delay fuse maximum.

- [ ] **430-010** — Table 430.52 inverse-time breaker maximum
  Citation: `Table 430.52` · Marked correct: **250% of full-load current**
  Unsure about: Confirm 250% is the correct inverse-time circuit breaker maximum.

- [ ] **430-006** — 430.32(A)(1) overload sizing, service factor ≥1.15
  Citation: `430.32(A)(1)` · Marked correct: **125%** of nameplate current
  Unsure about: Confirm 125% for motors with a marked service factor of 1.15 or greater.

- [ ] **430-007** — 430.32(A)(1) overload sizing, standard motors
  Citation: `430.32(A)(1)` · Marked correct: **115%** of nameplate current
  Unsure about: Confirm 115% for motors without that service-factor margin.

- [ ] **430-013** — 430.110(A) motor disconnect ampere rating
  Citation: `430.110(A)` · Marked correct: **115% of the motor's full-load current**
  Unsure about: Confirm 115% is the correct disconnect ampere-rating margin, and that it's genuinely distinct from (smaller than) the 125% conductor-sizing margin in 430.22.

- [ ] **430-014** — 430.109 motor disconnect type requirement
  Citation: `430.109` · Marked correct: "A horsepower-rated device, such as a motor-circuit switch or listed circuit breaker"
  Unsure about: Confirm the horsepower-rated-device requirement and typical examples against the current 430.109 text.

## Article 450 (4)

- [ ] **450-009** — 450.21(A) dry-type transformer clearance from combustibles
  Citation: `450.21(A)` · Marked correct: **12 inches**
  Unsure about: Confirm the 12-inch clearance figure for dry-type transformers rated 112.5 kVA or less.

- [ ] **450-003** — Table 450.3(B) primary-only overcurrent protection maximum
  Citation: `Table 450.3(B)` · Marked correct: **125% of primary full-load current**
  Unsure about: Confirm 125% is the correct primary-only maximum for this current/voltage bracket (primary FLC ≥ 9A, 1000V or less).

- [ ] **450-008** — 450.13(B) hollow-space dry-type transformer kVA cap
  Citation: `450.13(B)` · Marked correct: **50 kVA**
  Unsure about: Confirm the 50 kVA cap for dry-type transformers installed in hollow spaces.

- [ ] **450-006** — 450.11 impedance marking threshold
  Citation: `450.11` · Marked correct: **25 kVA and larger**
  Unsure about: Confirm 25 kVA is the correct threshold above which impedance marking is required on the nameplate.
