# Project Vision

Create the definitive platform that enables an electrician with real-world field experience to pass the Texas Journeyman Electrician exam on the first attempt while developing the ability to navigate the NEC quickly and confidently on the job.

The application should teach users **how to find answers**, not just remember them.

---

# Primary Goals

## 1. Pass the Texas Journeyman Exam

The platform should prepare someone to pass the exam using:

* 2023 NEC
* Texas licensing requirements
* PSI exam format
* Timed practice exams
* Realistic question difficulty

Success Metric:

> A first-time test taker should consistently score 85–90% on full simulated exams before scheduling the actual test.

---

## 2. Teach NEC Navigation

The exam is open book.

The real skill is locating information quickly.

Training should include:

* Finding Articles
* Using the Index
* Understanding Tables
* Cross references
* Informational Notes
* Annexes
* Chapter 9
* Article hierarchy

Every feature should reinforce navigation speed.

---

## 3. Build Real Electricians

Passing the exam is only the first milestone.

The application should improve:

* Code interpretation
* Installation decisions
* Conductor sizing
* Raceway selection
* Voltage drop
* Motors
* Grounding & bonding
* Overcurrent protection
* Box fill
* Conduit fill
* Calculations
* Load calculations
* Transformers
* Services
* Feeders

---

# Educational Philosophy

Instead of:

> Question → Answer

Teach:

Question

↓

Reasoning

↓

NEC Lookup Process

↓

Applicable Code

↓

Explanation

↓

Field Example

↓

Related Questions

The user should understand *why* the answer is correct.

---

# Learning System

The app should feel like Duolingo meets Mike Holt.

It should continuously determine:

* What the student knows
* What they struggle with
* What they're forgetting
* What should be reviewed next

The experience should become increasingly personalized.

---

# Core Modules

## Dashboard

Shows:

* Daily study goal
* Today's lessons
* Recent scores
* Weakest NEC chapters
* Study streak
* Time studied
* Recommended review
* Exam readiness percentage

---

## Learn Mode

Structured lessons.

Each lesson contains:

* Concept
* NEC reference
* Explanation
* Graphics
* Examples
* Practice questions
* Field application

---

## Flashcards

Support:

* Bookmarking
* Difficulty rating
* Mastery tracking
* Random mode
* Chapter mode
* Favorites
* Spaced repetition

---

## Question Bank

Thousands of questions.

Filter by:

* NEC Chapter
* Article
* Difficulty
* Calculation
* Motors
* Services
* Grounding
* Raceway
* Recently Missed
* Favorites

---

## Practice Exams

Generate realistic exams.

Options:

* 20
* 40
* 80
* Custom length

Timed or untimed.

Randomized.

Review after submission.

---

## Exam Simulator

Exactly mimic the real PSI experience.

Include:

* Four-hour timer
* Calculator
* NEC lookup panel
* Flag questions
* Review screen
* Submit confirmation
* Score report

---

## NEC Browser

One of the most important modules.

Users can browse:

```
Chapter
Article
Section
Subsection
Exception
Table
Figure
```

Search:

* Keywords
* Article numbers
* Definitions
* Tables

Bookmark frequently used sections.

---

## Calculation Center

Interactive calculators.

Examples:

* Voltage Drop
* Box Fill
* Conduit Fill
* Motor FLC
* Service Load
* Transformer Sizing
* Conductor Ampacity
* Derating
* Grounding Electrode Conductor
* Equipment Grounding Conductor
* OCPD sizing

Every calculator should explain the calculation and cite the applicable NEC sections.

---

## Performance Analytics

Track:

* Average score
* Weakest chapters
* Strongest chapters
* Time per question
* Lookup speed
* Accuracy trends
* Predicted exam score
* Readiness percentage

---

## Study Planner

Allow the user to set:

* Exam date
* Hours available per week
* Study days
* Daily goal

Automatically generate a personalized study plan.

---

## Review Engine

Track every question answered.

Classify each as:

* Correct
* Incorrect
* Guessed
* Slow
* Fast
* Mastered

Use this data to prioritize future review.

---

## Progress System

Display:

* XP
* Study streak
* Mastery percentage
* Articles mastered
* Chapters completed
* Questions answered
* Time studied

The goal is to motivate without distracting from learning.

---

# Admin Portal

A separate interface for maintaining the platform.

Capabilities include:

* Create/edit/delete questions
* Import question banks
* Manage explanations
* Upload diagrams
* Organize by NEC chapter and article
* Review analytics
* Manage users (if multi-user)
* Publish content updates

No code changes should be required to add new educational content.

---

# Technical Direction

* **Framework:** Next.js (App Router)
* **Language:** TypeScript (strict)
* **Styling:** Tailwind CSS
* **Database:** Supabase
* **Authentication:** Supabase Auth
* **State:** React patterns appropriate to the feature
* **Architecture:** Modular, scalable, production-ready

The project should be designed so that new modules (e.g., Master Electrician prep, residential wireman prep, continuing education) can be added without major restructuring.

---

# Long-Term Roadmap

Once the Texas Journeyman version is mature, the platform should expand into:

1. Texas Master Electrician Exam Prep
2. Residential Wireman Exam Prep
3. Texas Electrical Continuing Education
4. OSHA Safety Training
5. NFPA 70E Training
6. Electrical Theory Courses
7. Motor Controls and Industrial Systems
8. PLC Fundamentals
9. Commercial and Industrial Apprenticeship Curriculum
10. Company training portals with instructor dashboards and team progress tracking

---

# The End Goal

This should become a **comprehensive electrical education platform**, not just an exam-prep app. It should be the resource that electricians rely on from apprentice through master electrician, combining structured learning, realistic exam simulation, NEC mastery, interactive calculators, and long-term professional development in a single application. If executed well, it could compete with established providers like Mike Holt, Ray Holder, and Jade Learning by emphasizing adaptive learning, superior user experience, and practical field application.
