# Brown Biotech Discovery Strategy

Date: 2026-05-06

## Requested
Translate the latest AI/tech research signals into actionable Brown Biotech discovery strategy and homepage/service messaging.

## Analysis
The latest digest reinforces three priorities:

1. **Affinity prediction is becoming more accurate and architecture-driven**
   - Transformer-GNN and cross-attention models are a strong fit for virtual screening.
   - This supports a sharper front-end for Brown Biotech Discovery around target-to-hit prioritization.

2. **Discovery is shifting from prediction to generation**
   - De novo design with geometric deep learning, hierarchical VAEs, and RL is now a practical next layer.
   - Brown Biotech should present a pipeline that can move from target selection to novel molecule generation, not just screening.

3. **Trust infrastructure matters more than model claims**
   - Explainability, causal inference, privacy-preserving ML, and local/efficient LLM tooling are all strategic differentiators.
   - For partner-facing biotech work, the value is stronger when outputs are explainable, auditable, and privacy-aware.

## Decisions
- Reframed the discovery pipeline around:
  - target discovery
  - affinity modeling
  - de novo design
  - explainability checks
  - causal validation
  - translation packaging for partners
- Updated homepage copy to emphasize:
  - MolXProt-style affinity modeling
  - de novo design + optimization
  - XAI / causal validation
  - multi-omics + regulatory packaging
- Added local-LLM friendliness to the Paperclip messaging to reflect efficient orchestration and lightweight internal tooling.

## Outcomes
- Discovery positioning now reads as a modern AI drug-discovery stack rather than a generic screening service.
- The homepage is better aligned with the current research signal set and more credible for B2B partner conversations.
- The platform story now includes both **high-performance compute** and **efficient local workflow support**.

## Files Changed
- `src/App.tsx`
- `BROWN_BIOTECH_DISCOVERY_STRATEGY_2026-05-06.md`
