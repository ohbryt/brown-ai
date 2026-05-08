type IntakeBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  source?: string;
  serviceLane?: string;
  plan?: string;
  priority?: string;
};

const NOTION_VERSION = "2022-06-28";
const DEFAULT_DB_ID = "201ef22d-4086-47c6-a33c-707150572c05";
const ALLOWED_LANES = new Set([
  "ai-automation-service",
  "business-pipeline",
  "genox-site",
  "biostatx",
  "peptide-service",
]);
const LANE_ALIASES: Record<string, string> = {
  general: "business-pipeline",
  other: "business-pipeline",
  "general/other": "business-pipeline",
};
const ALLOWED_PRIORITIES = new Set(["hot", "warm", "cold"]);
const TELEGRAM_API_BASE = "https://api.telegram.org";

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function excerpt(message: string, limit = 180) {
  const normalized = message.replace(/\s+/g, " ").trim();
  return normalized.length > limit ? `${normalized.slice(0, limit - 1)}…` : normalized;
}

function containsAny(haystack: string, needles: string[]) {
  const lower = haystack.toLowerCase();
  return needles.some((needle) => lower.includes(needle));
}

function normalizeServiceLane(rawLane: string) {
  const lane = rawLane.trim().toLowerCase();
  return LANE_ALIASES[lane] ?? lane;
}

function inferPriority(payload: IntakeBody) {
  const requested = text(payload.priority).toLowerCase();
  if (ALLOWED_PRIORITIES.has(requested)) return requested;

  const message = `${text(payload.message)} ${text(payload.plan)} ${text(payload.serviceLane)}`.toLowerCase();
  if (containsAny(message, ["urgent", "asap", "today", "immediately", "hot"])) return "hot";
  if (containsAny(message, ["later", "next week", "explore", "maybe", "soon"])) return "cold";
  return "warm";
}

function inferOwner(serviceLane: string) {
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

function inferSummary(payload: IntakeBody, serviceLane: string) {
  const parts = [
    serviceLane,
    payload.company?.trim(),
    payload.name?.trim(),
    excerpt(payload.message ?? "", 140),
  ].filter(Boolean);
  return parts.join(" · ");
}

function inferNextStep(serviceLane: string, priority: string, approvalNeeded: boolean) {
  if (approvalNeeded) return "Review the request with a human before any external action.";
  if (priority === "hot") return "Book a call and confirm the smallest viable next step today.";
  if (serviceLane === "ai-automation-service") return "Review the workflow, estimate effort, and decide whether to scope a paid proof-of-work.";
  if (serviceLane === "peptide-service") return "Confirm target, format, and turnaround, then scope the brief.";
  if (serviceLane === "biostatx") return "Confirm the dataset, endpoint, and decision the analysis must support.";
  if (serviceLane === "genox-site") return "Clarify the target, stage, and partner context, then route to discovery review.";
  return "Review the request, confirm fit, and route to the correct owner.";
}

function humanApprovalNeeded(message: string) {
  return containsAny(message, ["money", "legal", "contract", "deploy", "deployment", "launch", "medical", "clinical", "claim"]);
}

function triageRoute(priority: string, approvalNeeded: boolean) {
  if (approvalNeeded) return "Escalate";
  if (priority === "hot") return "Book call";
  if (priority === "cold") return "Nurture";
  return "Review";
}

function telegramAlertText(params: {
  title: string;
  serviceLane: string;
  priority: string;
  owner: string;
  route: string;
  approvalNeeded: boolean;
  name: string;
  email: string;
  company: string;
  source: string;
  nextStep: string;
  message: string;
  notionUrl?: string;
}) {
  const lines = [
    `Brown Biotech intake · ${params.priority.toUpperCase()}${params.approvalNeeded ? " · APPROVAL" : ""}`,
    params.title,
    `Service lane: ${params.serviceLane}`,
    `Route: ${params.route}`,
    `Owner: ${params.owner}`,
    `Source: ${params.source}`,
    `Name: ${params.name || "-"}`,
    `Email: ${params.email || "-"}`,
    `Company: ${params.company || "-"}`,
    `Next step: ${params.nextStep}`,
    `Message: ${excerpt(params.message, 240) || "-"}`,
  ];

  if (params.notionUrl) {
    lines.push(`Notion: ${params.notionUrl}`);
  }

  return lines.join("\n");
}

async function sendTelegramAlert(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.BROWN_BIOTECH_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.BROWN_BIOTECH_TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID || process.env.BROWN_BIOTECH_TELEGRAM_THREAD_ID;

  if (!botToken || !chatId) {
    return { sent: false as const, reason: "missing-telegram-config" };
  }

  const body = new URLSearchParams({
    chat_id: chatId,
    text: message,
    disable_web_page_preview: "true",
  });

  if (threadId) {
    body.set("message_thread_id", threadId);
  }

  const resp = await fetch(`${TELEGRAM_API_BASE}/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body,
  });

  const textResp = await resp.text();
  if (!resp.ok) {
    return { sent: false as const, reason: textResp };
  }

  return { sent: true as const, reason: textResp };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const dbId = process.env.INTAKE_DATABASE_ID || DEFAULT_DB_ID;
  const notionToken = process.env.NOTION_API_KEY;
  if (!notionToken) {
    return res.status(500).json({ error: "NOTION_API_KEY is not configured" });
  }

  let payload: IntakeBody = {};
  try {
    payload = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

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

  const pageBody = {
    parent: { database_id: dbId },
    properties: {
      Name: {
        title: [{ type: "text", text: { content: title } }],
      },
      Contact: {
        rich_text: [{ type: "text", text: { content: email } }],
      },
      Company: {
        rich_text: [{ type: "text", text: { content: company } }],
      },
      Status: {
        select: { name: "new" },
      },
      Priority: {
        select: { name: ALLOWED_PRIORITIES.has(priority) ? priority : "warm" },
      },
      Source: {
        select: { name: source || "website" },
      },
      "Service Lane": {
        select: { name: serviceLane },
      },
      Summary: {
        rich_text: [{ type: "text", text: { content: inferSummary(payload, serviceLane) } }],
      },
      "Next Step": {
        rich_text: [{ type: "text", text: { content: nextStep } }],
      },
      "Approval Needed": {
        checkbox: approvalNeeded,
      },
      Owner: {
        select: { name: owner },
      },
      Date: {
        date: { start: new Date().toISOString() },
      },
    },
  };

  const notionResp = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionToken}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pageBody),
  });

  const textResp = await notionResp.text();
  if (!notionResp.ok) {
    return res.status(502).json({
      error: "Failed to create Notion intake page",
      details: textResp,
    });
  }

  let notionPage: any = {};
  try {
    notionPage = JSON.parse(textResp);
  } catch {
    notionPage = { raw: textResp };
  }

  const telegramMessage = telegramAlertText({
    title,
    serviceLane,
    priority,
    owner,
    route,
    approvalNeeded,
    name,
    email,
    company,
    source,
    nextStep,
    message,
    notionUrl: notionPage.url,
  });

  const [telegramResult] = await Promise.allSettled([sendTelegramAlert(telegramMessage)]);
  const telegramAlert = telegramResult.status === "fulfilled" ? telegramResult.value : { sent: false as const, reason: String(telegramResult.reason) };

  return res.status(200).json({
    ok: true,
    id: notionPage.id,
    url: notionPage.url,
    serviceLane,
    priority,
    route,
    owner,
    approvalNeeded,
    telegram: telegramAlert,
  });
}
