import { buildComputedIntake, buildStatusFlow, excerpt, type IntakeBody, NOTION_FIELDS } from "./intake";

export type AutomationBody = IntakeBody & {
  objective?: string;
  systems?: string | string[];
  trigger?: string;
  output?: string;
  constraints?: string;
};

export type AutomationBlueprint = {
  title: string;
  summary: string;
  serviceLane: string;
  priority: string;
  route: string;
  owner: string;
  approvalNeeded: boolean;
  nextStep: string;
  objective: string;
  systems: string[];
  trigger: string;
  output: string;
  constraints: string;
  automationType: string;
  phases: Array<{ step: string; detail: string }>;
  checklist: string[];
  statusFlow: Array<{ step: string; detail: string }>;
  notionFields: typeof NOTION_FIELDS;
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

function inferAutomationType(objective: string, systems: string[], output: string) {
  const source = `${objective} ${systems.join(" ")} ${output}`.toLowerCase();
  if (source.includes("alert") || source.includes("notify") || source.includes("slack") || source.includes("telegram")) return "alerting";
  if (source.includes("sync") || source.includes("notion") || source.includes("crm") || source.includes("database")) return "sync";
  if (source.includes("report") || source.includes("brief") || source.includes("summary")) return "reporting";
  if (source.includes("schedule") || source.includes("cron") || source.includes("remind")) return "scheduling";
  if (source.includes("triage") || source.includes("route") || source.includes("intake")) return "triage";
  if (source.includes("research") || source.includes("scan") || source.includes("monitor")) return "research";
  return "workflow";
}

export function buildAutomationBlueprint(payload: AutomationBody): AutomationBlueprint {
  const name = text(payload.name);
  const email = text(payload.email);
  const company = text(payload.company);
  const objective = text(payload.objective) || text(payload.message);
  const systems = list(payload.systems);
  const trigger = text(payload.trigger);
  const output = text(payload.output);
  const constraints = text(payload.constraints);
  const priority = text(payload.priority) || "warm";
  const source = text(payload.source) || "website";

  const computed = buildComputedIntake({
    ...payload,
    message: objective,
    source,
    serviceLane: "ai-automation-service",
    priority,
  });

  const automationType = inferAutomationType(objective, systems, output);
  const title = `Automation brief · ${company || name || email || "website"}`;
  const summary = [
    automationType,
    systems.join(" + "),
    excerpt(objective || "Design an automation workflow.", 120),
  ]
    .filter(Boolean)
    .join(" · ");

  const phases = [
    { step: "Scope", detail: "Define the trigger, owner, inputs, and the exact output that should be produced." },
    { step: "Contract", detail: "Normalize the payload and decide which systems are authoritative." },
    { step: "Build", detail: "Implement the workflow, fanout, and storage path." },
    { step: "Guardrails", detail: "Add human approval, retry handling, and failure alerts where needed." },
    { step: "Ship", detail: "Test one real request end-to-end, then document the operating loop." },
  ];

  const checklist = [
    "One trigger",
    "One owner",
    "One source of truth",
    "Clear fallback path",
    "Human review gate if sensitive",
  ];

  return {
    title,
    summary,
    serviceLane: computed.serviceLane,
    priority: computed.priority,
    route: computed.route,
    owner: computed.owner,
    approvalNeeded: computed.approvalNeeded,
    nextStep: computed.nextStep,
    objective: objective || "Automation request",
    systems,
    trigger,
    output,
    constraints,
    automationType,
    phases,
    checklist,
    statusFlow: buildStatusFlow({
      route: computed.route,
      approvalNeeded: computed.approvalNeeded,
      serviceLane: computed.serviceLane,
    }),
    notionFields: NOTION_FIELDS,
  };
}
