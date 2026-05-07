# Brown Biotech Service Hub Skill

> Load `../design.md` before using this skill. The service hub must follow the Brown Biotech Design.md contract.

## Goal
Create a service hub that routes visitors into the right Brown Biotech lane with minimal confusion.

## Inputs
- service lanes: `peptide-service`, `biostatx`, `genox-site`
- CTA: `Request a Brief`
- routing target: intake form / Notion workflow
- tone: premium, clear, decision-ready

## Output
Return:
1. lane summary cards
2. who-it-is-for line for each lane
3. what-you-get line for each lane
4. primary CTA for each lane
5. a short routing paragraph

## Rules
- Use three lanes max.
- Make one lane feel primary if needed.
- Keep each lane summary under 2 sentences.
- Avoid over-explaining the company.
- Make the next step obvious.
- Show human review when high-stakes decisions are involved.

## Prompt Template
Use this pattern when prompting an AI model:

"Using `design.md`, build a Brown Biotech service hub with three clear lanes. Make the lanes premium, scannable, and trustworthy. Keep one primary route into the intake flow and keep all copy concise."

## Success Criteria
- users can tell the difference between the lanes immediately
- the page looks like part of the same brand as the homepage
- every lane has a clear next action
- the intake route is obvious
