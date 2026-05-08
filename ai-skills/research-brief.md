# Brown Biotech Research Brief Skill

> Load `../design.md` before using this skill. The brief workflow must stay premium, concise, and human-reviewed.

## Goal
Turn an intake into a decision-ready private biotech brief.

## Inputs
- name
- email
- company
- service lane
- priority: `hot`, `warm`, `cold`
- topic
- target
- context
- message
- approval needed

## Output
Return:
1. title
2. one-line summary
3. what we reviewed
4. evidence table
5. key risks / caveats
6. recommendation
7. next step
8. confidence level
9. human review note

## Review rubric
Score each brief 1–5 on:
- factual accuracy
- citation quality
- completeness
- recommendation quality
- format compliance

## Human review rules
Always require review when the request involves:
- money
- legal / contract language
- deployment / launch
- public announcements
- medical or clinical claims

## Default workflow
1. Intake arrives
2. Triage assigns owner and priority
3. Research sub-agents gather evidence in isolated context
4. Citation checker removes unsupported claims
5. Writer assembles the brief
6. Human review approves or edits
7. Brief is delivered
8. Final version is archived in Notion

## Prompt template
"Using `design.md`, draft a Brown Biotech private biotech brief. Keep it short, research-ready, and decision-oriented. Include a clear recommendation, cited evidence, key risks, and a visible human review note."

## Success criteria
- the brief is readable in under 2 minutes
- the recommendation is clear
- the sources are visible
- human review is explicit
- the brief can be archived and reused later
