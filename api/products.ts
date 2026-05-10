type ProductBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  source?: string;
  serviceLane?: string;
  plan?: string;
  priority?: string;
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

const PRODUCT_KINDS = new Set([
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
]);

const NOTION_VERSION = "2022-06-28";
const DEFAULT_DB_ID = "201ef22d-4086-47c6-a33c-707150572c05";
const TELEGRAM_API_BASE = "https://api.telegram.org";
const ENV = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function list(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value.map((v) => v.trim()).filter(Boolean);
  if (!value) return [];
  return value.split(/[\n,;]+/).map((v) => v.trim()).filter(Boolean);
}

function excerpt(message: string, limit = 90) {
  const normalized = message.replace(/\s+/g, " ").trim();
  return normalized.length > limit ? `${normalized.slice(0, limit - 1)}…` : normalized;
}

function inferPriority(payload: ProductBody) {
  const requested = text(payload.priority).toLowerCase();
  if (["hot", "warm", "cold"].includes(requested)) return requested;
  const message = `${text(payload.objective)} ${text(payload.message)} ${text(payload.question)}`.toLowerCase();
  if (/urgent|asap|today|immediately|hot/.test(message)) return "hot";
  if (/later|next week|explore|maybe|soon/.test(message)) return "cold";
  return "warm";
}

function normalizeKind(payload: ProductBody) {
  const raw = text(payload.kind).toLowerCase();
  if (PRODUCT_KINDS.has(raw)) return raw;
  const lane = text(payload.serviceLane).toLowerCase();
  if (PRODUCT_KINDS.has(lane)) return lane;
  const signal = `${text(payload.objective)} ${text(payload.message)} ${text(payload.question)} ${list(payload.keywords).join(" ")}`.toLowerCase();
  if (signal.includes("literature") || signal.includes("paper") || signal.includes("citation") || signal.includes("search")) return "literature-scan-copilot";
  if (signal.includes("lead") || signal.includes("intake") || signal.includes("routing") || signal.includes("inbound")) return "lead-intake-router";
  return "paid-brief-generator";
}

function ownerFor(kind: string) {
  switch (kind) {
    case "lead-intake-router":
    case "competitor-watcher":
    case "meeting-to-action-system":
    case "ops-dashboard-sync":
      return "Ops";
    case "literature-scan-copilot":
    case "sop-builder":
    case "approval-gate-workflow":
      return "Research / Ops";
    default:
      return "Founder / Strategy";
  }
}

function titleFor(kind: string, company: string, name: string, email: string) {
  const anchor = company || name || email || "website";
  if (kind === "lead-intake-router") return `Lead intake router · ${anchor}`;
  if (kind === "paid-brief-generator") return `Paid brief · ${anchor}`;
  if (kind === "literature-scan-copilot") return `Literature scan copilot · ${anchor}`;
  if (kind === "competitor-watcher") return `Competitor watcher · ${anchor}`;
  if (kind === "meeting-to-action-system") return `Meeting-to-action system · ${anchor}`;
  if (kind === "client-update-autopilot") return `Client update autopilot · ${anchor}`;
  if (kind === "sop-builder") return `SOP builder · ${anchor}`;
  if (kind === "approval-gate-workflow") return `Approval gate workflow · ${anchor}`;
  if (kind === "content-repurposing-engine") return `Content repurposing engine · ${anchor}`;
  if (kind === "ops-dashboard-sync") return `Ops dashboard sync · ${anchor}`;
  return `Product workflow · ${anchor}`;
}

function routeFor(priority: string, approvalNeeded: boolean) {
  if (approvalNeeded) return "Escalate";
  if (priority === "hot") return "Book call";
  if (priority === "cold") return "Nurture";
  return "Review";
}

function approvalNeeded(message: string) {
  return /money|legal|contract|deploy|deployment|launch|medical|clinical|claim/i.test(message);
}

function nextStepFor(kind: string, priority: string, approval: boolean) {
  if (approval) return "Review the request with a human before any external action.";
  if (priority === "hot") return "Book a call and confirm the smallest viable next step today.";
  if (kind === "paid-brief-generator") return "Confirm scope, assumptions, and the approval boundary before drafting the brief.";
  if (kind === "literature-scan-copilot") return "Confirm the research question, keywords, and citation standard.";
  if (kind === "lead-intake-router") return "Confirm the inbound sources, routing rules, and owner map.";
  return "Review the request, confirm fit, and route to the correct owner.";
}

function statusFlow(route: string, approval: boolean, kind: string) {
  const flow = [
    { step: "Received", detail: "Request captured from the website intake." },
    { step: "Saved", detail: "Recorded in the Brown Biotech Notion intake database." },
    { step: "Triage", detail: `${route} · ${kind}` },
    { step: "Owner", detail: approval ? "Human review required before external action." : "Assigned to the active lane owner." },
  ];
  flow.push(approval ? { step: "Next action", detail: "Pause until a human approves the request." } : { step: "Next action", detail: "Move to the review queue or schedule a call." });
  return flow;
}

function buildBlueprint(payload: ProductBody) {
  const kind = normalizeKind(payload);
  const company = text(payload.company);
  const name = text(payload.name);
  const email = text(payload.email);
  const objective = text(payload.objective) || text(payload.message) || text(payload.question) || "Create a decision-ready brief.";
  const audience = text(payload.audience) || "Brown Biotech";
  const trigger = text(payload.trigger) || "Website request";
  const output = text(payload.output) || "Decision-ready brief";
  const question = text(payload.question) || objective;
  const constraints = text(payload.constraints);
  const sources = list(payload.sources);
  const keywords = list(payload.keywords);
  const priority = inferPriority(payload);
  const ap = approvalNeeded(text(payload.message));
  const route = routeFor(priority, ap);
  const owner = ownerFor(kind);
  const title = titleFor(kind, company, name, email);
  const nextStep = nextStepFor(kind, priority, ap);
  return {
    kind,
    title,
    summary: `${kind} · ${company || name || email || "website"} · ${excerpt(objective, 90)}`,
    serviceLane: kind,
    priority,
    route,
    owner,
    approvalNeeded: ap,
    nextStep,
    objective,
    audience,
    trigger,
    output,
    sources,
    keywords,
    question,
    constraints,
    phases: [
      { step: "Scope", detail: "Confirm the decision the brief must support." },
      { step: "Draft", detail: "Write a concise, reviewable brief." },
      { step: "Review", detail: ap ? "Human approval gate required." : "Standard review." },
      { step: "Deliver", detail: "Store the record in Notion and hand off the next step." },
    ],
    checklist: ["Decision target", "Scope boundary", "Assumptions", "Risks", "Approval gate"],
    statusFlow: statusFlow(route, ap, kind),
  };
}

function telegramAlertText(params: {
  title: string;
  automationType: string;
  serviceLane: string;
  priority: string;
  route: string;
  owner: string;
  approvalNeeded: boolean;
  name: string;
  email: string;
  company: string;
  source: string;
  objective: string;
  systems: string[];
  trigger: string;
  output: string;
  nextStep: string;
  notionUrl?: string;
}) {
  const lines = [
    `Brown Biotech product workflow · ${params.priority.toUpperCase()}${params.approvalNeeded ? " · APPROVAL" : ""}`,
    params.title,
    `Kind: ${params.automationType}`,
    `Service lane: ${params.serviceLane}`,
    `Route: ${params.route}`,
    `Owner: ${params.owner}`,
    `Keywords: -`,
    `Trigger: ${params.trigger || "-"}`,
    `Output: ${params.output || "-"}`,
    `Source: ${params.source}`,
    `Name: ${params.name || "-"}`,
    `Email: ${params.email || "-"}`,
    `Company: ${params.company || "-"}`,
    `Next step: ${params.nextStep}`,
    `Objective: ${params.objective}`,
  ];
  if (params.notionUrl) lines.push(`Notion: ${params.notionUrl}`);
  return lines.join("\n");
}

async function sendTelegramAlert(message: string) {
  const botToken = ENV.TELEGRAM_BOT_TOKEN || ENV.BROWN_BIOTECH_TELEGRAM_BOT_TOKEN;
  const chatId = ENV.TELEGRAM_CHAT_ID || ENV.BROWN_BIOTECH_TELEGRAM_CHAT_ID;
  const threadId = ENV.TELEGRAM_THREAD_ID || ENV.BROWN_BIOTECH_TELEGRAM_THREAD_ID;
  if (!botToken || !chatId) return { sent: false as const, reason: "missing-telegram-config" };
  const body = new URLSearchParams({ chat_id: chatId, text: message, disable_web_page_preview: "true" });
  if (threadId) body.set("message_thread_id", threadId);
  const resp = await fetch(`${TELEGRAM_API_BASE}/bot${botToken}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, body });
  const textResp = await resp.text();
  if (!resp.ok) return { sent: false as const, reason: textResp };
  return { sent: true as const, reason: textResp };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const dbId = ENV.INTAKE_DATABASE_ID || DEFAULT_DB_ID;
  const notionToken = ENV.NOTION_API_KEY;

  let payload: ProductBody = {};
  try {
    payload = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const blueprint = buildBlueprint(payload);
  const source = text(payload.source) || "website";

  if (!notionToken) {
    const telegramAlert = await sendTelegramAlert(
      telegramAlertText({
        title: blueprint.title,
        automationType: blueprint.kind,
        serviceLane: blueprint.serviceLane,
        priority: blueprint.priority,
        route: blueprint.route,
        owner: blueprint.owner,
        approvalNeeded: blueprint.approvalNeeded,
        name: text(payload.name),
        email: text(payload.email),
        company: text(payload.company),
        source,
        objective: blueprint.objective,
        systems: [],
        trigger: blueprint.trigger,
        output: blueprint.output,
        nextStep: blueprint.nextStep,
      }),
    );

    const localId = `local-${Date.now().toString(36)}`;
    return res.status(200).json({
      ok: true,
      id: localId,
      url: null,
      title: blueprint.title,
      automationType: blueprint.kind,
      serviceLane: blueprint.serviceLane,
      priority: blueprint.priority,
      route: blueprint.route,
      owner: blueprint.owner,
      approvalNeeded: blueprint.approvalNeeded,
      nextStep: blueprint.nextStep,
      statusFlow: blueprint.statusFlow,
      phases: blueprint.phases,
      checklist: blueprint.checklist,
      systems: blueprint.sources,
      trigger: blueprint.trigger,
      output: blueprint.output,
      telegram: telegramAlert,
      notion: { created: false, reason: "missing-config" },
    });
  }

  const pageBody = {
    parent: { database_id: dbId },
    properties: {
      Name: { title: [{ type: "text", text: { content: blueprint.title } }] },
      Contact: { rich_text: [{ type: "text", text: { content: text(payload.email) } }] },
      Company: { rich_text: [{ type: "text", text: { content: text(payload.company) } }] },
      Status: { select: { name: "new" } },
      Priority: { select: { name: blueprint.priority } },
      Source: { select: { name: source } },
      "Service Lane": { select: { name: blueprint.serviceLane } },
      Summary: { rich_text: [{ type: "text", text: { content: blueprint.summary } }] },
      "Next Step": { rich_text: [{ type: "text", text: { content: blueprint.nextStep } }] },
      "Approval Needed": { checkbox: blueprint.approvalNeeded },
      Owner: { select: { name: blueprint.owner } },
      Date: { date: { start: new Date().toISOString() } },
    },
  };

  const notionResp = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: { Authorization: `Bearer ${notionToken}`, "Notion-Version": NOTION_VERSION, "Content-Type": "application/json" },
    body: JSON.stringify(pageBody),
  });

  const textResp = await notionResp.text();
  if (!notionResp.ok) {
    return res.status(502).json({ error: "Failed to create Notion product page", details: textResp });
  }

  let notionPage: any = {};
  try { notionPage = JSON.parse(textResp); } catch { notionPage = { raw: textResp }; }

  const telegramMessage = telegramAlertText({
    title: blueprint.title,
    automationType: blueprint.kind,
    serviceLane: blueprint.serviceLane,
    priority: blueprint.priority,
    route: blueprint.route,
    owner: blueprint.owner,
    approvalNeeded: blueprint.approvalNeeded,
    name: text(payload.name),
    email: text(payload.email),
    company: text(payload.company),
    source,
    objective: blueprint.objective,
    systems: [],
    trigger: blueprint.trigger,
    output: blueprint.output,
    nextStep: blueprint.nextStep,
    notionUrl: notionPage.url,
  });

  const [telegramResult] = await Promise.allSettled([sendTelegramAlert(telegramMessage)]);
  const telegramAlert = telegramResult.status === "fulfilled" ? telegramResult.value : { sent: false as const, reason: String(telegramResult.reason) };

  return res.status(200).json({
    ok: true,
    id: notionPage.id,
    url: notionPage.url,
    title: blueprint.title,
    automationType: blueprint.kind,
    serviceLane: blueprint.serviceLane,
    priority: blueprint.priority,
    route: blueprint.route,
    owner: blueprint.owner,
    approvalNeeded: blueprint.approvalNeeded,
    nextStep: blueprint.nextStep,
    statusFlow: blueprint.statusFlow,
    phases: blueprint.phases,
    checklist: blueprint.checklist,
    systems: blueprint.sources,
    trigger: blueprint.trigger,
    output: blueprint.output,
    telegram: telegramAlert,
  });
}
