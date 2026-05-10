import { buildComputedIntake, buildStatusFlow, excerpt, type IntakeBody, NOTION_FIELDS } from "./intake";

export const PRODUCT_KINDS = [
  "lead-intake-router",
  "paid-brief-generator",
  "literature-scan-copilot",
  "competitor-watcher",
  "meeting-to-action-system",
  "client-update-autopilot",
  "sop-builder",
  "approval-gate-workflow",
  "content-repurposing-engine",
  "ops-dashboard-sync",
] as const;

export type ProductKind = (typeof PRODUCT_KINDS)[number];

export type ProductBody = IntakeBody & {
  kind?: string;
  objective?: string;
  audience?: string;
  trigger?: string;
  output?: string;
  sources?: string | string[];
  keywords?: string | string[];
  question?: string;
  constraints?: string;
};

export type ProductBlueprint = {
  kind: ProductKind;
  title: string;
  summary: string;
  serviceLane: string;
  priority: string;
  route: string;
  owner: string;
  approvalNeeded: boolean;
  nextStep: string;
  objective: string;
  audience: string;
  trigger: string;
  output: string;
  sources: string[];
  keywords: string[];
  question: string;
  constraints: string;
  phases: Array<{ step: string; detail: string }>;
  checklist: string[];
  statusFlow: Array<{ step: string; detail: string }>;
  notionFields: typeof NOTION_FIELDS;
};

type ProductSpecific = {
  titleLabel: string;
  summary: string;
  phases: Array<{ step: string; detail: string }>;
  checklist: string[];
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function list(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.map((entry) => entry.trim()).filter(Boolean);
  }
  if (!value) return [];
  return value
    .split(/[\n,;]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function inferKind(payload: ProductBody, serviceLane: string): ProductKind {
  const raw = text(payload.kind).toLowerCase();
  if ((PRODUCT_KINDS as readonly string[]).includes(raw)) return raw as ProductKind;
  if ((PRODUCT_KINDS as readonly string[]).includes(serviceLane)) return serviceLane as ProductKind;

  const source = `${text(payload.objective)} ${text(payload.message)} ${text(payload.question)} ${list(payload.keywords).join(" ")}`.toLowerCase();
  if (source.includes("literature") || source.includes("paper") || source.includes("citation") || source.includes("search")) return "literature-scan-copilot";
  if (source.includes("lead") || source.includes("intake") || source.includes("routing") || source.includes("inbound")) return "lead-intake-router";
  return "paid-brief-generator";
}

function inferTitle(kind: ProductKind, company: string, name: string, email: string) {
  const anchor = company || name || email || "website";
  switch (kind) {
    case "lead-intake-router":
      return `Lead intake router · ${anchor}`;
    case "paid-brief-generator":
      return `Paid brief · ${anchor}`;
    case "literature-scan-copilot":
      return `Literature scan copilot · ${anchor}`;
    case "competitor-watcher":
      return `Competitor watcher · ${anchor}`;
    case "meeting-to-action-system":
      return `Meeting-to-action system · ${anchor}`;
    case "client-update-autopilot":
      return `Client update autopilot · ${anchor}`;
    case "sop-builder":
      return `SOP builder · ${anchor}`;
    case "approval-gate-workflow":
      return `Approval gate workflow · ${anchor}`;
    case "content-repurposing-engine":
      return `Content repurposing engine · ${anchor}`;
    case "ops-dashboard-sync":
      return `Ops dashboard sync · ${anchor}`;
    default:
      return `Product workflow · ${anchor}`;
  }
}

function productSpecific(kind: ProductKind, objective: string, audience: string, trigger: string, output: string, sources: string[], keywords: string[], question: string): ProductSpecific {
  const joinedKeywords = keywords.join(" + ");
  switch (kind) {
    case "lead-intake-router":
      return {
        titleLabel: "Lead routing",
        summary: `Route inbound requests into the right owner and next action. ${excerpt(objective || "Classify inbound requests and route them cleanly.", 90)}`,
        phases: [
          { step: "Capture", detail: "Receive inbound requests from form, email, or message." },
          { step: "Classify", detail: "Identify lane, priority, and approval needs." },
          { step: "Route", detail: "Assign owner, next step, and queue location in Notion." },
          { step: "Notify", detail: "Alert the owner when the request needs attention." },
          { step: "Close the loop", detail: "Log the outcome so the routing rule improves over time." },
        ],
        checklist: ["Inbound source", "Owner map", "Routing rule set", "Fallback path", "Review gate"],
      };
    case "paid-brief-generator":
      return {
        titleLabel: "Paid brief",
        summary: `Turn a request into a scoped, reviewable brief. ${excerpt(objective || "Create a decision-ready brief.", 90)}`,
        phases: [
          { step: "Scope", detail: "Define the decision the brief must support." },
          { step: "Assumptions", detail: "State boundaries, exclusions, and open questions." },
          { step: "Draft", detail: "Write a concise brief the buyer can review fast." },
          { step: "Approve", detail: "Require human review before sending externally." },
          { step: "Deliver", detail: "Store the brief in Notion and hand off the next step." },
        ],
        checklist: ["Decision target", "Scope boundary", "Assumptions", "Risks", "Approval gate"],
      };
    case "literature-scan-copilot":
      return {
        titleLabel: "Literature scan",
        summary: `Synthesize papers into a decision-ready research brief. ${excerpt(question || objective || "Synthesize evidence for a decision.", 90)}`,
        phases: [
          { step: "Define question", detail: "Lock the research question, scope, and citation standard." },
          { step: "Search", detail: "Gather a focused set of papers and supporting sources." },
          { step: "Extract", detail: "Pull claims, methods, strengths, and gaps into a structured note." },
          { step: "Synthesize", detail: "Produce a concise summary with cautions and next questions." },
          { step: "Review", detail: "Require human check before client-facing or public use." },
        ],
        checklist: ["Research question", "Keyword set", "Source list", "Citation format", "Human review"],
      };
    case "competitor-watcher":
      return {
        titleLabel: "Competitor watch",
        summary: `Track market movement and competitor changes. ${excerpt(objective || "Monitor named competitors and surface change.", 90)}`,
        phases: [
          { step: "Watchlist", detail: "Define companies, domains, and signal sources." },
          { step: "Monitor", detail: "Check for updates on a fixed cadence." },
          { step: "Flag", detail: "Highlight notable changes and possible implications." },
          { step: "Brief", detail: "Produce a short competitive summary for review." },
          { step: "Log", detail: "Store the change record for future comparison." },
        ],
        checklist: ["Watchlist", "Sources", "Cadence", "Signal rules", "Review owner"],
      };
    case "meeting-to-action-system":
      return {
        titleLabel: "Meeting actions",
        summary: `Convert meetings into tasks, decisions, and follow-through. ${excerpt(objective || "Turn notes into execution.", 90)}`,
        phases: [
          { step: "Capture", detail: "Ingest notes, transcript, or agenda." },
          { step: "Extract", detail: "Pull decisions, blockers, owners, and deadlines." },
          { step: "Assign", detail: "Route each action to the right person." },
          { step: "Follow up", detail: "Create reminders or a carry-forward queue." },
          { step: "Review", detail: "Check completion at the next meeting or review cycle." },
        ],
        checklist: ["Notes source", "Owner map", "Deadline rule", "Carry-forward log", "Review cadence"],
      };
    case "client-update-autopilot":
      return {
        titleLabel: "Client update",
        summary: `Draft concise client updates from current status. ${excerpt(objective || "Keep clients informed without extra meetings.", 90)}`,
        phases: [
          { step: "Collect status", detail: "Gather milestones, blockers, and recent changes." },
          { step: "Draft", detail: "Write a short update with clear next steps." },
          { step: "Review", detail: "Keep human approval before sending." },
          { step: "Send", detail: "Deliver the approved update to the client." },
          { step: "Log", detail: "Track the sent message and response." },
        ],
        checklist: ["Status source", "Client list", "Review gate", "Tone guide", "Log path"],
      };
    case "sop-builder":
      return {
        titleLabel: "SOP builder",
        summary: `Turn repeated work into a clean SOP and checklist. ${excerpt(objective || "Standardize a recurring workflow.", 90)}`,
        phases: [
          { step: "Observe", detail: "Capture how the task is actually done today." },
          { step: "Structure", detail: "Break the process into steps, inputs, and outputs." },
          { step: "Draft", detail: "Write the SOP and the execution checklist." },
          { step: "Validate", detail: "Have a human review the edge cases and handoffs." },
          { step: "Publish", detail: "Store the SOP in the operating hub and set a review date." },
        ],
        checklist: ["Observed process", "Inputs/outputs", "Edge cases", "Owner", "Review date"],
      };
    case "approval-gate-workflow":
      return {
        titleLabel: "Approval gate",
        summary: `Detect risk and route sensitive items for human review. ${excerpt(objective || "Keep approvals explicit.", 90)}`,
        phases: [
          { step: "Detect", detail: "Identify money, legal, deployment, or claim risk." },
          { step: "Route", detail: "Send the item to the correct approver." },
          { step: "Record", detail: "Store the decision and rationale in Notion." },
          { step: "Release", detail: "Only proceed after approval lands." },
          { step: "Audit", detail: "Keep a clean trail for future review." },
        ],
        checklist: ["Risk labels", "Approver map", "Decision record", "Escalation rule", "Audit trail"],
      };
    case "content-repurposing-engine":
      return {
        titleLabel: "Content repurpose",
        summary: `Turn one approved artifact into multiple channel drafts. ${excerpt(objective || "Repurpose research into marketing assets.", 90)}`,
        phases: [
          { step: "Source", detail: "Start from one approved brief, report, or transcript." },
          { step: "Segment", detail: "Split the source into channel-ready angles." },
          { step: "Draft", detail: "Generate website, newsletter, and social versions." },
          { step: "Review", detail: "Preserve the approved meaning and require human sign-off." },
          { step: "Publish", detail: "Store the final assets in the content queue." },
        ],
        checklist: ["Source asset", "Channel list", "Voice rules", "Approval gate", "Publishing queue"],
      };
    case "ops-dashboard-sync":
      return {
        titleLabel: "Ops dashboard",
        summary: `Keep the HQ view current across intake, briefs, and approvals. ${excerpt(objective || "Sync the operating view.", 90)}`,
        phases: [
          { step: "Collect", detail: "Pull status from the active Notion queues." },
          { step: "Normalize", detail: "Convert updates into a single dashboard format." },
          { step: "Highlight", detail: "Surface blockers, aging items, and decision needs." },
          { step: "Refresh", detail: "Update the HQ page and weekly review inputs." },
          { step: "Archive", detail: "Save the prior state for comparison." },
        ],
        checklist: ["Source databases", "Dashboard fields", "Blocker rules", "Refresh cadence", "Archive path"],
      };
  }
}

function productNextStep(kind: ProductKind) {
  switch (kind) {
    case "lead-intake-router":
      return "Confirm sources, routing rules, and owner map before shipping.";
    case "paid-brief-generator":
      return "Confirm scope, assumptions, and approval boundary before drafting the brief.";
    case "literature-scan-copilot":
      return "Confirm the research question, keywords, and citation standard.";
    case "competitor-watcher":
      return "Confirm the watchlist, sources, and review cadence.";
    case "meeting-to-action-system":
      return "Confirm note source, owner mapping, and follow-up cadence.";
    case "client-update-autopilot":
      return "Confirm client list, review gate, and update cadence.";
    case "sop-builder":
      return "Confirm the process to standardize and the review owner.";
    case "approval-gate-workflow":
      return "Confirm the risk labels, approver map, and escalation rule.";
    case "content-repurposing-engine":
      return "Confirm source asset, target channels, and approval gate.";
    case "ops-dashboard-sync":
      return "Confirm the source databases and the HQ fields to sync.";
    default:
      return "Confirm scope and owner before shipping.";
  }
}

export function buildProductBlueprint(payload: ProductBody): ProductBlueprint {
  const name = text(payload.name);
  const email = text(payload.email);
  const company = text(payload.company);
  const objective = text(payload.objective) || text(payload.message);
  const audience = text(payload.audience);
  const trigger = text(payload.trigger);
  const output = text(payload.output);
  const sources = list(payload.sources);
  const keywords = list(payload.keywords);
  const question = text(payload.question);
  const constraints = text(payload.constraints);
  const priority = text(payload.priority) || "warm";
  const source = text(payload.source) || "website";

  const serviceLane = inferKind(payload, text(payload.serviceLane));
  const computed = buildComputedIntake({
    ...payload,
    message: objective || question,
    source,
    serviceLane,
    priority,
  });

  const title = inferTitle(serviceLane, company, name, email);
  const spec = productSpecific(serviceLane, objective, audience, trigger, output, sources, keywords, question);
  const summary = [spec.summary, keywords.length ? keywords.join(" + ") : "", sources.length ? sources.join(" · ") : ""]
    .filter(Boolean)
    .join(" · ");

  return {
    kind: serviceLane,
    title,
    summary,
    serviceLane: computed.serviceLane,
    priority: computed.priority,
    route: computed.route,
    owner: computed.owner,
    approvalNeeded: computed.approvalNeeded,
    nextStep: productNextStep(serviceLane),
    objective: objective || question || "Product workflow request",
    audience,
    trigger,
    output,
    sources,
    keywords,
    question,
    constraints,
    phases: spec.phases,
    checklist: spec.checklist,
    statusFlow: buildStatusFlow({
      route: computed.route,
      approvalNeeded: computed.approvalNeeded,
      serviceLane: computed.serviceLane,
    }),
    notionFields: NOTION_FIELDS,
  };
}
