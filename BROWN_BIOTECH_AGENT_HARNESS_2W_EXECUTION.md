# Brown Biotech Agent Harness — 2-Week Execution Plan

Date: 2026-05-08

## Executive recommendation
Build one narrow, billable system first: **a human-reviewed private biotech research brief harness**.

### The offer
- **Input:** target, context, urgency, service lane, approval need
- **Process:** triage → parallel research sub-agents → citation check → synthesis → human review
- **Output:** a decision-ready brief with sources, risks, and a next-step recommendation
- **Operating hub:** Notion
- **Delivery rule:** no public or clinical claim without human approval

### Why this wedge
- It is narrow enough to ship in 2 weeks.
- It maps directly to Brown Biotech's current service positioning.
- It produces a reusable artifact, not just a demo.
- It can become a paid pilot fast.

---

## 2-week plan

### Week 1 — build the harness
Goal: make the workflow run end-to-end inside Brown Biotech's operating system.

#### Day 1 — scope and contract
- Freeze the offer: `private biotech research brief`
- Define one input form
- Define one output template
- Define the human approval gate
- Define success criteria

#### Day 2 — Notion operating hub
- Intake database
- Brief database
- Sources database
- Review database
- Archive database
- Status flow: `new → triaged → researching → review → delivered → archived`

#### Day 3 — agent loop
- Planner agent
- Research agent
- Citation checker
- Writer agent
- Human review gate

#### Day 4 — tools
- `read_intake`
- `search_literature`
- `search_market`
- `extract_sources`
- `write_brief`
- `save_to_notion`

#### Day 5 — context engineering
Implement the four primitives:
- **Write:** scratchpad / working notes
- **Select:** pull only the relevant sources
- **Compress:** summarize older context before it bloats the run
- **Isolate:** spawn sub-agents for separate research threads

#### Day 6 — first end-to-end run
- Run one real brief request through the full flow
- Record where it breaks
- Fix the weakest link first

#### Day 7 — review gate
- Add a required human approval step before anything is shared externally
- Add a checklist for citations, claims, and tone
- Add a simple failure log

---

### Week 2 — make it pilot-ready
Goal: make the output measurable, reusable, and saleable.

#### Day 8 — output template
Lock the brief structure:
- 3-line summary
- evidence table
- recommendation
- risk flags
- confidence / caveats

#### Day 9 — evals
Create 10 golden prompts:
- 4 easy
- 3 medium
- 3 hard

Score for:
- factual correctness
- citation quality
- relevance
- completeness
- format compliance

#### Day 10 — tracing and logs
- Log each run
- Record tools used
- Record sub-agent roles
- Record time and cost

#### Day 11 — archive and reuse
- Save prior briefs in a searchable archive
- Tag by service lane and topic
- Make reuse easy for similar requests

#### Day 12 — pilot packaging
Create:
- 1-page service description
- 1 sample brief
- intake form
- human review policy
- delivery expectations

#### Day 13 — stress test
Run three cases:
- easy
- medium
- ambiguous

Check:
- where the system hesitates
- where it hallucinates
- where the human review step catches issues

#### Day 14 — freeze v1
- Freeze the workflow
- Document the operating rules
- Publish the internal handoff
- Define the next 30-day backlog

---

## Brown Biotech MVP architecture

### 1) Intake layer
Captures:
- name
- email
- company / lab
- service lane
- priority
- target / context
- approval flag

### 2) Triage agent
Decides:
- what the request is
- whether it is high priority
- whether human approval is required
- which service lane owns it

### 3) Research sub-agents
Parallel threads for:
- literature
- market / competitive context
- technical / risk review

### 4) Citation checker
Ensures:
- claims are sourced
- weak claims are flagged
- unsupported statements are removed

### 5) Writer
Produces the final brief in Brown Biotech tone:
- short
- premium
- decision-ready
- research-aware

### 6) Human review gate
No external delivery without review when:
- money is involved
- legal / contract wording is involved
- public announcement is involved
- clinical / medical claims are involved

### 7) Archive
Everything gets stored in Notion for:
- search
- reuse
- quality review
- future prompts / skills

---

## Notion template

### Databases

#### Intake
Fields:
- Request ID
- Date
- Name
- Email
- Company / Lab
- Service Lane
- Priority
- Topic
- Approval Needed
- Status
- Owner
- Next Action

#### Briefs
Fields:
- Brief ID
- Linked Intake
- Title
- Summary
- Confidence
- Recommendation
- Review Status
- Delivered?

#### Sources
Fields:
- Source ID
- Linked Brief
- Title
- URL
- Source Type
- Key Quote
- Relevance Score

#### Reviews
Fields:
- Review ID
- Linked Brief
- Reviewer
- Approved?
- Issues Found
- Notes

#### Archive
Fields:
- Topic
- Service Lane
- Reusable Pattern
- Outcome
- Follow-up

---

## Landing copy draft

### Hero
**AI-assisted biotech support.**
We turn complex targets into clear decisions with private briefs, research review, and human approval.

### Subhead
Brown Biotech helps teams move from uncertainty to a scoped next step with less overhead and cleaner evidence.

### Primary CTA
**Request a Brief**

### Secondary CTA
**See the Workflow**

### Service lane summary
- **Discovery briefs** — target review, risk flags, next-step recommendations
- **Biostatistics support** — analysis review, interpretation, and reporting
- **Peptide service intake** — scoped projects, quotes, and consults
- **Business / partner briefs** — decision-ready summaries for internal or external discussion

### Trust line
Human-reviewed. Research-ready. No hype.

---

## Implementation TODO

### Build
- [ ] Define the intake payload contract
- [ ] Define the brief output schema
- [ ] Add triage routing
- [ ] Add sub-agent research fan-out
- [ ] Add citation checker
- [ ] Add human approval gating
- [ ] Add Notion archive writeback

### Measure
- [ ] Create 10 golden prompts
- [ ] Add a pass/fail rubric
- [ ] Track time per brief
- [ ] Track citation quality
- [ ] Track review rejection rate

### Ship
- [ ] Freeze a sample brief
- [ ] Publish a 1-page service description
- [ ] Publish a pilot intake form
- [ ] Use the first pilot as the calibration set

---

## Success criteria
You are done with v1 when:
- one request can flow from intake to brief without manual scrambling
- every brief has sources and a clear recommendation
- human review is a visible step, not a hidden afterthought
- the system can be rerun on the same input with similar results
- the brief can be archived and reused later
- the offer is clear enough to sell as a pilot

---

## Final priority order
1. Intake form
2. Notion hub
3. Workflow logic
4. Brief template
5. Eval harness
6. Human review gate
7. Pilot delivery

---

## Operating contract v1

### Intake fields
Use these fields everywhere — homepage form, Notion intake, and internal triage:
- `name`
- `email`
- `company`
- `serviceLane`
- `priority` (`hot`, `warm`, `cold`)
- `topic`
- `target`
- `context`
- `message`
- `approvalNeeded` (boolean)
- `owner`
- `status`

### Brief output schema
Every brief should contain:
1. **Title**
2. **One-line summary**
3. **What we reviewed**
4. **Evidence table**
5. **Key risks / caveats**
6. **Recommendation**
7. **Next step**
8. **Confidence level**
9. **Human review note**

### Review rubric
Score each brief 1–5 on:
- factual accuracy
- citation quality
- completeness
- recommendation quality
- format compliance

### Human review rules
Always require review when the request involves:
- money
- legal / contract language
- deployment / launch
- public announcements
- medical or clinical claims

### Daily operating loop
1. New intake arrives
2. Triage assigns owner and priority
3. Research sub-agents gather evidence
4. Citation checker removes unsupported claims
5. Writer assembles the brief
6. Human review approves or edits
7. Brief is delivered
8. Final version is archived in Notion
