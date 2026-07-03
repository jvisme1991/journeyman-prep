# Review Queue

**Status: 31 of 32 resolved.** This pass verified all 32 items from the previous batch against the actual 2023 NEC PDF: 25 were confirmed correct as written, 4 needed a citation-only fix, and 2 needed a content correction — all 31 have been fixed in `data/questions.ts` and checked off below. **One item (310-012) is still open** — the originally-cited section (310.106(A)) could not be located in the 2023 NEC, and the replacement question is a lower-risk substitute rather than a fully-verified fix (see its entry below).

**Workflow:** Check an item off here once you've confirmed it against the actual 2023 NEC. Once checked off, the corresponding `needsReview: true` field on that question in `data/questions.ts` should be removed (the entry can just stay checked here as a record). If a question turns out to be wrong rather than just unconfirmed, let me know instead of checking it off and I'll correct it.

Within each article, items are ordered most-consequential first — a numeric value used to size or install something ranks above a wording/labeling nuance.

Total flagged: **32** questions originally → **1 remaining** (310-012).

---

## Article 215 (2 — both resolved)

- [x] **215-005** — 215.4(A) common neutral limit *(content corrected)*
  Citation: `215.4(A)` (unchanged) · Marked correct (corrected): "Up to three sets of 3-wire feeders, or up to two sets of 4-wire or 5-wire feeders"
  Found: the original "two or three sets, regardless of configuration" was wrong — the actual limit depends on the feeder's wire configuration (3-wire vs. 4-wire/5-wire). Answer and explanation rewritten to reflect the conditional rule.

- [x] **215-004** — 215.2 Informational Note voltage-drop recommendation
  Citation: `215.2, Informational Note` · Marked correct: "A recommendation only, not a mandatory Code requirement"
  Confirmed correct as written.

## Article 250 (4 — all resolved)

- [x] **250-009** — Table 250.66 grounding electrode conductor sizing basis
  Citation: `Table 250.66` · Marked correct: "The size of the largest ungrounded service-entrance conductor"
  Confirmed correct as written.

- [x] **250-011** — Table 250.102(C)(1) bonding jumper sizing, relation to Table 250.66
  Citation: `Table 250.102(C)(1)` · Marked correct: "Table 250.66 (grounding electrode conductor sizing)"
  Confirmed correct as written.

- [x] **250-006** — rod electrode minimum driven length *(citation corrected)*
  Citation: ~~`250.53(G)`~~ → `250.53(A)(4)` · Marked correct: **8 feet**
  Found: 8 feet was right, but the correct subsection is 250.53(A)(4), not (G).

- [x] **250-007** — electrode resistance threshold *(citation corrected)*
  Citation: ~~`250.56`~~ → `250.53(A)(2), Exception` · Marked correct: **Supplemented with one additional electrode** (threshold: over 25 ohms)
  Found: the 25-ohm/supplemental-electrode rule was right, but it's actually stated as an Exception within 250.53(A)(2) (the electrode installation section), not in 250.56. Question text and references both updated.

## Article 310 (8 — 7 resolved, 1 still open)

- [x] **310-004** — Table 310.16 ampacity, 12 AWG copper at 90°C
  Citation: `Table 310.16` · Marked correct: **30 amperes**
  Confirmed correct as written.

- [x] **310-005** — Table 310.16 ampacity, 10 AWG copper at 75°C
  Citation: `Table 310.16` · Marked correct: **35 amperes**
  Confirmed correct as written.

- [x] **310-006** — Table 310.16 ampacity, 8 AWG copper at 75°C
  Citation: `Table 310.16` · Marked correct: **50 amperes**
  Confirmed correct as written.

- [x] **310-009** — Table 310.15(C)(1) fill adjustment, 4-6 conductors
  Citation: `Table 310.15(C)(1)` · Marked correct: **80%**
  Confirmed correct as written.

- [x] **310-010** — Table 310.15(C)(1) fill adjustment, 7-9 conductors
  Citation: `Table 310.15(C)(1)` · Marked correct: **70%**
  Confirmed correct as written.

- [x] **310-011** — neutral conductor counting exception for fill adjustment *(citation corrected)*
  Citation: ~~`Table 310.15(C)(1), Note`~~ → `310.15(E)(1)` · Marked correct: "Not counted as a current-carrying conductor"
  Found: the rule itself was right, but it's a numbered subsection (310.15(E)(1)), not an unnumbered table note.

- [x] **310-013** — wet/dry 90°C insulation ratings (e.g., XHHW-2 vs. THHN) *(citation corrected)*
  Citation: ~~`Table 310.104(A)`~~ → `Table 310.4(1)` · Marked correct: "Dry locations only at their 90°C rating" (for THHN)
  Found: the wet/dry distinction was right, but the correct table reference is Table 310.4(1).

- [ ] **310-012** — ⚠️ still open, question replaced but not fully verified
  Original citation `310.106(A)` could not be located in the 2023 NEC — that section doesn't appear to exist. Rather than guess at an alternate citation for the original "minimum conductor size" claim, the question was replaced with a lower-risk one: the smallest copper conductor size listed in **Table 310.16** (a citation I'm confident actually exists). Current marked-correct answer is **18 AWG**, with an explanation noting the table's smallest listed sizes (18/16 AWG) are restricted to specific applications elsewhere, not general branch-circuit wiring. This has **not** been independently verified — please confirm the 18 AWG figure (vs. 16 AWG or another value) directly against Table 310.16, and either check this off once confirmed or let me know the correction.

## Article 314 (6 — all resolved)

- [x] **314-012** — 314.28(A)(1) straight-pull box sizing multiplier
  Citation: `314.28(A)(1)` · Marked correct: "8 times the trade diameter of the largest raceway"
  Confirmed correct as written.

- [x] **314-013** — 314.28(A)(2) angle/U-pull box sizing formula
  Citation: `314.28(A)(2)` · Marked correct: "The sum of the diameters of the other raceways on the same wall" (added to 6x the largest raceway)
  Confirmed correct as written.

- [x] **314-006** — Table 314.16(B) volume allowance for 12 AWG
  Citation: `Table 314.16(B)` · Marked correct: **2.25 cubic inches**
  Confirmed correct as written.

- [x] **314-003** — 314.16(B)(4) device volume-allowance multiplier
  Citation: `314.16(B)(4)` · Marked correct: "Two volume allowances, based on the largest conductor connected to it"
  Confirmed correct as written.

- [x] **314-004** — equipment grounding conductor counting *(content corrected)*
  Citation: `314.16(B)(5)` (unchanged) · Marked correct (corrected): "Up to four count as one combined allowance (based on the largest); each additional one beyond four adds a quarter allowance"
  Found: the original "always one allowance no matter how many" was incomplete — it only holds for up to four equipment grounding conductors; a fifth or more each add a quarter-allowance on top. Question and answer rewritten to state the conditional rule instead of an unconditional one.

- [x] **314-005** — 314.16(B)(2) clamp volume-allowance counting
  Citation: `314.16(B)(2)` · Marked correct: "One volume allowance, based on the largest conductor in the box"
  Confirmed correct as written.

## Article 430 (8 — all resolved)

- [x] **430-004** — 430.22 single-motor branch-circuit conductor margin
  Citation: `430.22` · Marked correct: **125% of the motor's full-load current**
  Confirmed correct as written.

- [x] **430-005** — 430.24 conductors supplying several motors, formula
  Citation: `430.24` · Marked correct: "The sum of the full-load currents of the other motors" (added to 125% of the largest)
  Confirmed correct as written.

- [x] **430-009** — Table 430.52 non-time-delay fuse maximum
  Citation: `Table 430.52` · Marked correct: **300% of full-load current**
  Confirmed correct as written.

- [x] **430-010** — Table 430.52 inverse-time breaker maximum
  Citation: `Table 430.52` · Marked correct: **250% of full-load current**
  Confirmed correct as written.

- [x] **430-006** — 430.32(A)(1) overload sizing, service factor ≥1.15
  Citation: `430.32(A)(1)` · Marked correct: **125%** of nameplate current
  Confirmed correct as written.

- [x] **430-007** — 430.32(A)(1) overload sizing, standard motors
  Citation: `430.32(A)(1)` · Marked correct: **115%** of nameplate current
  Confirmed correct as written.

- [x] **430-013** — 430.110(A) motor disconnect ampere rating
  Citation: `430.110(A)` · Marked correct: **115% of the motor's full-load current**
  Confirmed correct as written.

- [x] **430-014** — 430.109 motor disconnect type requirement
  Citation: `430.109` · Marked correct: "A horsepower-rated device, such as a motor-circuit switch or listed circuit breaker"
  Confirmed correct as written.

## Article 450 (4 — all resolved)

- [x] **450-009** — 450.21(A) dry-type transformer clearance from combustibles
  Citation: `450.21(A)` · Marked correct: **12 inches**
  Confirmed correct as written.

- [x] **450-003** — Table 450.3(B) primary-only overcurrent protection maximum
  Citation: `Table 450.3(B)` · Marked correct: **125% of primary full-load current**
  Confirmed correct as written.

- [x] **450-008** — 450.13(B) hollow-space dry-type transformer kVA cap
  Citation: `450.13(B)` · Marked correct: **50 kVA**
  Confirmed correct as written.

- [x] **450-006** — 450.11 impedance marking threshold
  Citation: `450.11` · Marked correct: **25 kVA and larger**
  Confirmed correct as written.
