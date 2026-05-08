export type IntakeBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  source?: string;
  serviceLane?: string;
  plan?: string;
  priority?: string;
};

export type ComputedIntake = {
  serviceLane: string;
  priority: string;
  owner: string;
  route: string;
  approvalNeeded: boolean;
  nextStep: string;
  title: string;
  summary: string;
};

export const ALLOWED_LANES = new Set([
  "ai-automation-service",
  "business-pipeline",
  "genox-site",
  "biostatx",
  "peptide-service",
]);

export const LANE_ALIASES: Record<string, string> = {
  general: "business-pipeline",
  other: "business-pipeline",
  "general/other": "business-pipeline",
};

export const ALLOWED_PRIORITIES = new Set(["hot", "warm", "cold"]);

export const NOTION_FIELDS = {
  title: "Name",
  contact: "Contact",
  company: "Company",
  status: "Status",
  priority: "Priority",
  source: "Source",
  serviceLane: "Service Lane",
  summary: "Summary",
  nextStep: "Next Step",
  approvalNeeded: "Approval Needed",
  owner: "Owner",
  date: "Date",
} as const;

export const NOTION_STATUS_FLOW = ["new", "triaged", "in-review", "archived"] as const;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function excerpt(message: string, limit = 180) {
  const normalized = message.replace(/\s+/g, " ").trim();
  return normalized.length > limit ? `${normalized.slice(0, limit - 1)}…` : normalized;
}

function containsAny(haystack: string, needles: string[]) {
  const lower = haystack.toLowerCase();
  return needles.some((needle) => lower.includes(needle));
}

export function normalizeServiceLane(rawLane: string) {
  const lane = rawLane.trim().toLowerCase();
  return LANE_ALIASES[lane] ?? lane;
}

export function inferPriority(payload: IntakeBody) {
  const requested = text(payload.priority).toLowerCase();
  if (ALLOWED_PRIORITIES.has(requested)) return requested;

  const message = `${text(payload.message)} ${text(payload.plan)} ${text(payload.serviceLane)}`.toLowerCase();
  if (containsAny(message, ["urgent", "asap", "today", "immediately", "hot"])) return "hot";
  if (containsAny(message, ["later", "next week", "explore", "maybe", "soon"])) return "cold";
  return "warm";
}

export function inferOwner(serviceLane: string) {
  switch (serviceLane) {
    case "ai-automation-service":
      return "Founder / Strategy";
    case "biostatx":
      return "Founder / Strategy";
    case "genox-site":
      return "Research";
    case "peptide-service":
      return "Ops";
    case "business-pipeline":
    default:
      return "Founder / Strategy";
  }
}

export function inferSummary(payload: IntakeBody, serviceLane: string) {
  const parts = [
    serviceLane,
    payload.company?.trim(),
    payload.name?.trim(),
    excerpt(payload.message ?? "", 140),
  ].filter(Boolean);
  return parts.join(" · ");
}

export function humanApprovalNeeded(message: string) {
  return containsAny(message, ["money", "legal", "contract", "deploy", "deployment", "launch", "medical", "clinical", "claim"]);
}

export function triageRoute(priority: string, approvalNeeded: boolean) {
  if (approvalNeeded) return "Escalate";
  if (priority === "hot") return "Book call";
  if (priority === "cold") return "Nurture";
  return "Review";
}

export function inferNextStep(serviceLane: string, priority: string, approvalNeeded: boolean) {
  if (approvalNeeded) return "Review the request with a human before any external action.";
  if (priority === "hot") return "Book a call and confirm the smallest viable next step today.";
  if (serviceLane === "ai-automation-service") return "Review the workflow, estimate effort, and decide whether to scope a paid proof-of-work.";
  if (serviceLane === "peptide-service") return "Confirm target, format, and turnaround, then scope the brief.";
  if (serviceLane === "biostatx") return "Confirm the dataset, endpoint, and decision the analysis must support.";
  if (serviceLane === "genox-site") return "Clarify the target, stage, and partner context, then route to discovery review.";
  return "Review the request, confirm fit, and route to the correct owner.";
}

export function buildComputedIntake(payload: IntakeBody): ComputedIntake {
  const name = text(payload.name);
  const email = text(payload.email);
  const company = text(payload.company);
  const message = text(payload.message);
  const source = text(payload.source) || "website";
  const requestedLane = normalizeServiceLane(text(payload.serviceLane));
  const priority = inferPriority(payload);
  const serviceLane = ALLOWED_LANES.has(requestedLane) ? requestedLane : "business-pipeline";
  const owner = inferOwner(serviceLane);
  const approvalNeeded = humanApprovalNeeded(message);
  const route = triageRoute(priority, approvalNeeded);
  const nextStep = inferNextStep(serviceLane, priority, approvalNeeded);
  const title = `${serviceLane} inquiry · ${company || name || email || "website"}`;
  const summary = inferSummary(payload, serviceLane);

  void source;

  return { serviceLane, priority, owner, route, approvalNeeded, nextStep, title, summary };
}

export function buildStatusFlow(params: { route: string; approvalNeeded: boolean; serviceLane: string }) {
  const flow = [
    { step: "Received", detail: "Request captured from the website intake." },
    { step: "Saved", detail: "Recorded in the Brown Biotech Notion intake database." },
    { step: "Triage", detail: `${params.route} · ${params.serviceLane}` },
    { step: "Owner", detail: params.approvalNeeded ? "Human review required before external action." : "Assigned to the active lane owner." },
  ];

  if (!params.approvalNeeded) {
    flow.push({ step: "Next action", detail: "Move to the review queue or schedule a call." });
  } else {
    flow.push({ step: "Next action", detail: "Pause until a human approves the request." });
  }

  return flow;
}

export function buildIntakePreview(payload: IntakeBody) {
  const computed = buildComputedIntake(payload);
  return {
    title: computed.title,
    serviceLane: computed.serviceLane,
    priority: computed.priority,
    route: computed.route,
    owner: computed.owner,
    approvalNeeded: computed.approvalNeeded,
    source: text(payload.source) || "website",
    company: text(payload.company),
    name: text(payload.name),
    email: text(payload.email),
    message: text(payload.message),
    nextStep: computed.nextStep,
    notionFields: NOTION_FIELDS,
    statusFlow: buildStatusFlow(computed),
  };
}
