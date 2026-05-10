import { buildProductBlueprint, type ProductBody } from "../src/lib/products";
import { NOTION_FIELDS } from "../src/lib/intake";

const NOTION_VERSION = "2022-06-28";
const DEFAULT_DB_ID = "201ef22d-4086-47c6-a33c-707150572c05";
const TELEGRAM_API_BASE = "https://api.telegram.org";
const ENV = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

function telegramAlertText(params: {
  title: string;
  kind: string;
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
  audience: string;
  trigger: string;
  output: string;
  keywords: string[];
  nextStep: string;
  notionUrl?: string;
}) {
  const lines = [
    `Brown Biotech product workflow · ${params.priority.toUpperCase()}${params.approvalNeeded ? " · APPROVAL" : ""}`,
    params.title,
    `Kind: ${params.kind}`,
    `Service lane: ${params.serviceLane}`,
    `Route: ${params.route}`,
    `Owner: ${params.owner}`,
    `Keywords: ${params.keywords.length ? params.keywords.join(", ") : "-"}`,
    `Trigger: ${params.trigger || "-"}`,
    `Output: ${params.output || "-"}`,
    `Source: ${params.source}`,
    `Name: ${params.name || "-"}`,
    `Email: ${params.email || "-"}`,
    `Company: ${params.company || "-"}`,
    `Next step: ${params.nextStep}`,
    `Objective: ${params.objective}`,
  ];

  if (params.notionUrl) {
    lines.push(`Notion: ${params.notionUrl}`);
  }

  return lines.join("\n");
}

async function sendTelegramAlert(message: string) {
  const botToken = ENV.TELEGRAM_BOT_TOKEN || ENV.BROWN_BIOTECH_TELEGRAM_BOT_TOKEN;
  const chatId = ENV.TELEGRAM_CHAT_ID || ENV.BROWN_BIOTECH_TELEGRAM_CHAT_ID;
  const threadId = ENV.TELEGRAM_THREAD_ID || ENV.BROWN_BIOTECH_TELEGRAM_THREAD_ID;

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

  const dbId = ENV.INTAKE_DATABASE_ID || DEFAULT_DB_ID;
  const notionToken = ENV.NOTION_API_KEY;
  if (!notionToken) {
    return res.status(500).json({ error: "NOTION_API_KEY is not configured" });
  }

  let payload: ProductBody = {};
  try {
    payload = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const blueprint = buildProductBlueprint(payload);
  const source = typeof payload.source === "string" && payload.source.trim() ? payload.source.trim() : "website";

  const pageBody = {
    parent: { database_id: dbId },
    properties: {
      [NOTION_FIELDS.title]: {
        title: [{ type: "text", text: { content: blueprint.title } }],
      },
      [NOTION_FIELDS.contact]: {
        rich_text: [{ type: "text", text: { content: typeof payload.email === "string" ? payload.email.trim() : "" } }],
      },
      [NOTION_FIELDS.company]: {
        rich_text: [{ type: "text", text: { content: typeof payload.company === "string" ? payload.company.trim() : "" } }],
      },
      [NOTION_FIELDS.status]: {
        select: { name: "new" },
      },
      [NOTION_FIELDS.priority]: {
        select: { name: blueprint.priority },
      },
      [NOTION_FIELDS.source]: {
        select: { name: source },
      },
      [NOTION_FIELDS.serviceLane]: {
        select: { name: blueprint.serviceLane },
      },
      [NOTION_FIELDS.summary]: {
        rich_text: [{ type: "text", text: { content: blueprint.summary } }],
      },
      [NOTION_FIELDS.nextStep]: {
        rich_text: [{ type: "text", text: { content: blueprint.nextStep } }],
      },
      [NOTION_FIELDS.approvalNeeded]: {
        checkbox: blueprint.approvalNeeded,
      },
      [NOTION_FIELDS.owner]: {
        select: { name: blueprint.owner },
      },
      [NOTION_FIELDS.date]: {
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
      error: "Failed to create Notion product page",
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
    title: blueprint.title,
    kind: blueprint.kind,
    serviceLane: blueprint.serviceLane,
    priority: blueprint.priority,
    route: blueprint.route,
    owner: blueprint.owner,
    approvalNeeded: blueprint.approvalNeeded,
    name: typeof payload.name === "string" ? payload.name.trim() : "",
    email: typeof payload.email === "string" ? payload.email.trim() : "",
    company: typeof payload.company === "string" ? payload.company.trim() : "",
    source,
    objective: blueprint.objective,
    audience: blueprint.audience,
    trigger: blueprint.trigger,
    output: blueprint.output,
    keywords: blueprint.keywords,
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
    kind: blueprint.kind,
    serviceLane: blueprint.serviceLane,
    priority: blueprint.priority,
    route: blueprint.route,
    owner: blueprint.owner,
    approvalNeeded: blueprint.approvalNeeded,
    nextStep: blueprint.nextStep,
    statusFlow: blueprint.statusFlow,
    phases: blueprint.phases,
    checklist: blueprint.checklist,
    keywords: blueprint.keywords,
    trigger: blueprint.trigger,
    output: blueprint.output,
    telegram: telegramAlert,
  });
}
