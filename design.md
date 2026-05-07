# Brown Biotech Design.md

> Use this file as the canonical design contract for Brown Biotech. Attach it to AI prompts whenever generating UI, copy, pitch decks, or motion direction.

## 1) Brand Essence

Brown Biotech should feel:
- premium, calm, and research-ready
- biotech-first, not generic SaaS
- human-reviewed, not fully automated
- selective, not busy
- credible enough for founders, labs, and partners

The emotional target is **"decision confidence"**.

## 2) Brand DNA

### Keywords
- research-ready
- human review
- clear lanes
- premium service
- measurable outcomes
- quiet authority
- warm precision
- biotech intelligence

### Voice
- short
- specific
- grounded
- no hype
- no futurism for its own sake
- no jargon unless it earns its place

### Don’t sound like
- an AI demo
- a hackathon landing page
- a generic biotech startup
- a futuristic moonshot deck

## 3) Visual References

Use these as taste references, not as copy targets:
- **Stripe** for premium restraint and clear hierarchy
- **Notion** for clean structure and breathing room
- **Linear** for crisp product logic
- **Vercel** for technical minimalism
- **Superhuman** for premium polish and confidence

Brown Biotech should feel like a **hybrid of Stripe + Notion + a serious biotech advisory firm**.

## 4) Color System

### Core Surfaces
- `bg-page`: `#09090d`
- `bg-section`: `#120f14`
- `bg-panel`: `#1c1117`
- `bg-panel-2`: `#21141a`
- `bg-card-soft`: `rgba(255,255,255,0.035)`

### Core Text
- `text-strong`: `#ffffff`
- `text-main`: `rgba(255,255,255,0.90)`
- `text-secondary`: `rgba(255,255,255,0.72)`
- `text-muted`: `rgba(255,255,255,0.52)`

### Brand Accents
- `accent-primary`: `#ffd88a`  
- `accent-primary-deep`: `#d88a2c`
- `accent-secondary`: `#8b5cf6`
- `accent-quiet`: `rgba(255,216,138,0.12)`

### Borders
- `border-soft`: `rgba(255,255,255,0.08)`
- `border-strong`: `rgba(255,216,138,0.20)`

### Usage Rules
- Use **gold** for the primary brand signal and CTA emphasis.
- Use **violet** only for secondary depth, not as the main identity.
- Avoid bright rainbow gradients.
- Avoid saturated cyan/blue marketing colors.
- Keep contrast high enough that content is readable on a dim screen.

## 5) Typography

### Fonts
- **Headings:** `Instrument Serif` or a similarly elegant serif
- **Body:** `Inter`
- **Mono / labels:** `IBM Plex Mono` or `ui-monospace`

### Hierarchy
- H1: large, confident, minimal copy
- H2: section titles with strong spacing
- H3: card titles, concise and scannable
- Body: 15–18px, easy to read, restrained line length
- Labels: small caps or uppercase only when it improves clarity

### Rules
- Prefer fewer words over more words.
- Headings should sound like decisions, not slogans.
- Body text should explain value in one breath.

## 6) Layout Principles

### Homepage
- one strong hero
- one visible service snapshot
- one primary CTA
- one secondary CTA
- 3 service lanes max in the first screen
- clear proof or process below the fold

### Service Hub
- lane cards
- one-line lane summary
- who it is for
- what happens next
- clear handoff into the intake flow

### Spacing
- generous outer padding
- dense internal structure
- enough negative space to feel premium
- never cram four equal-priority ideas into one card

## 7) Component Language

### Cards
- rounded but not bubbly
- subtle border
- layered depth instead of heavy shadows
- content should feel like an information object, not a decoration

### Buttons
- one primary CTA
- one secondary CTA
- no more than two high-emphasis actions above the fold
- primary button should clearly win the hierarchy

### Badges
- use for status or route labels only
- keep them small and restrained
- never let badges outshine headings

### Panels / Snapshots
- use strong framing
- add a header strip or label
- make one lane or route clearly primary
- keep supporting detail shorter than the headline

## 8) Motion Rules

- motion should feel expensive, not playful
- use subtle float, fade, and lift
- no bouncy easing
- no flashy parallax
- no excessive glowing effects
- motion must never reduce readability

## 9) Copy Rules

### Use
- "Request a Brief"
- "Service Snapshot"
- "Human review"
- "Decision-ready"
- "Scope"
- "Route"
- "Deliver"

### Avoid
- "revolutionary"
- "game-changing"
- "AI-powered everything"
- "unlock the future"
- "next-gen" unless truly necessary

### Copy Style
- short sentences
- concrete nouns
- action verbs
- no over-explaining
- premium tone, but still direct

## 10) Design Rules That Must Not Break

1. Keep the first screen simple.
2. Keep one primary CTA.
3. Keep service lanes obvious.
4. Keep human review visible.
5. Keep contrast high.
6. Keep copy short.
7. Keep the brand consistent across homepage, service hub, deck, and intake.

## 11) How to Use This File with AI

When prompting an AI agent, attach this file and ask for a specific deliverable.

### Example prompts
- "Use design.md to redesign the homepage hero and service snapshot."
- "Use design.md to create a service hub page with three lanes and one intake CTA."
- "Use design.md to draft a pitch deck cover and section divider slides."
- "Use design.md to make the mobile UI feel premium, readable, and consistent."

## 12) Skill Stack Built on Top of Design.md

Build reusable AI skills that reference this file:
- `homepage-skill.md`
- `service-hub-skill.md`
- `deck-skill.md`
- `motion-skill.md`
- `intake-skill.md`

Each skill should:
- load this design.md first
- apply the same tokens and rules
- produce one clear deliverable
- preserve the Brown Biotech tone

## 13) Second Brain for Taste

Save good references as you find them:
- premium landing pages
- elegant pitch decks
- strong service cards
- polished biotech or enterprise UIs
- layouts with excellent hierarchy

The rule is simple:
**taste is trained by repeated exposure to good references, then encoded into this file.**

## 14) Baseline Checklist

Before shipping any Brown Biotech design, confirm:
- [ ] Is the brand readable in 3 seconds?
- [ ] Is the primary CTA obvious?
- [ ] Is the service snapshot understandable?
- [ ] Does it feel premium, not busy?
- [ ] Does it still feel like Brown Biotech?
- [ ] Would a serious buyer trust this page?
