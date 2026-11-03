"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { z } from "zod";
import { getCategory, getTool } from "@/data";
import { trackServerEvent } from "@/lib/analytics";
import { sizeLabels } from "@/lib/labels";
import { CompanySize } from "@/lib/schema";

const TIMEFRAMES = {
  sofort: "Sofort",
  "1-3-monate": "In 1–3 Monaten",
  spaeter: "Später",
} as const;

const schema = z.object({
  company: z
    .string()
    .trim()
    .min(2, { error: "Bitte gib den Namen deiner Firma an." })
    .max(120),
  name: z
    .string()
    .trim()
    .min(3, { error: "Bitte gib deinen Vor- und Nachnamen an." })
    .max(120),
  email: z.email({
    error: "Bitte gib eine gültige geschäftliche E-Mail-Adresse ein.",
  }),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[0-9+()/\s-]*$/, {
      error: "Bitte gib nur Ziffern, Leerzeichen und + ( ) / - ein.",
    }),
  size: CompanySize.or(z.literal("")).refine((v) => v !== "", {
    error: "Bitte wähle die Unternehmensgröße.",
  }),
  category: z.string().max(60),
  vendors: z
    .array(z.string())
    .min(1, { error: "Bitte wähle mindestens einen Anbieter." })
    .max(3, { error: "Du kannst höchstens drei Anbieter auswählen." })
    .refine((slugs) => slugs.every((s) => getTool(s)), {
      error: "Unbekannter Anbieter.",
    }),
  timeframe: z
    .enum(Object.keys(TIMEFRAMES) as [keyof typeof TIMEFRAMES])
    .or(z.literal("")),
  message: z.string().trim().max(2000),
  consent: z.literal("ja", {
    error: "Bitte bestätige die Einwilligung zur Weitergabe.",
  }),
  // Honeypot: real people never fill this hidden field.
  website: z.string().max(0),
});

export type LeadField = keyof z.infer<typeof schema>;

export type LeadState = {
  status: "idle" | "error" | "not-ready" | "success";
  message?: string;
  errors?: Partial<Record<LeadField, string>>;
  vendors?: string[];
  /** Echo of the text fields: React resets the form after every action, so the inputs restore from here. */
  values?: Partial<Record<TextField, string>>;
};

const TEXT_FIELDS = ["company", "name", "email", "phone", "message"] as const;
type TextField = (typeof TEXT_FIELDS)[number];

// Flow (§14.3): Zod → honeypot → email to the Dettingenstack inbox (the team checks each request and forwards it
// manually) + confirmation to the requester. No database. Without Brevo credentials nothing is sent and the
// form says so honestly.
export async function requestQuote(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const values = Object.fromEntries(
    TEXT_FIELDS.map((f) => [f, String(formData.get(f) ?? "")]),
  );
  const parsed = schema.safeParse({
    company: formData.get("company") ?? "",
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    size: formData.get("size") ?? "",
    category: formData.get("category") ?? "",
    vendors: formData.getAll("vendors").map(String),
    timeframe: formData.get("timeframe") ?? "",
    message: formData.get("message") ?? "",
    consent: formData.get("consent") ?? "",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const errors: LeadState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as LeadField | undefined;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    // A filled honeypot gets the same neutral answer as a success would, without sending anything.
    if (errors.website) return { status: "success", vendors: [] };
    return {
      status: "error",
      message: "Bitte prüfe die markierten Felder.",
      errors,
      values,
    };
  }

  const lead = parsed.data;
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.LEADS_SENDER_EMAIL;
  const inbox = process.env.LEADS_INBOX_EMAIL;
  if (!apiKey || !sender || !inbox) {
    return {
      status: "not-ready",
      values,
      message:
        "Angebotsanfragen über Dettingenstack werden gerade eingerichtet. Bis dahin erreichst du die Anbieter direkt über „Zum Anbieter“.",
    };
  }

  const vendorNames = lead.vendors.map((s) => getTool(s)?.name ?? s);
  const categoryName = getCategory(lead.category)?.name ?? lead.category;
  const summary = [
    `Firma: ${lead.company}`,
    `Name: ${lead.name}`,
    `E-Mail: ${lead.email}`,
    `Telefon: ${lead.phone || "–"}`,
    `Unternehmensgröße: ${lead.size ? sizeLabels[lead.size] : "–"}`,
    `Kategorie: ${categoryName || "–"}`,
    `Anbieter: ${vendorNames.join(", ")}`,
    `Zeitrahmen: ${lead.timeframe ? TIMEFRAMES[lead.timeframe] : "–"}`,
    "",
    lead.message || "(keine Nachricht)",
  ].join("\n");

  const send = (
    to: string,
    subject: string,
    textContent: string,
    replyTo?: string,
  ) =>
    fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: sender, name: "Dettingenstack" },
        to: [{ email: to }],
        subject,
        textContent,
        ...(replyTo ? { replyTo: { email: replyTo } } : {}),
      }),
    });

  try {
    const internal = await send(
      inbox,
      `Angebotsanfrage: ${vendorNames.join(", ")}`,
      summary,
      lead.email,
    );
    if (!internal.ok) throw new Error(`Brevo ${internal.status}`);
    await send(
      lead.email,
      "Deine Angebotsanfrage bei Dettingenstack",
      [
        `Hallo ${lead.name},`,
        "",
        `danke für deine Anfrage. Wir geben deine Angaben an diese Anbieter weiter: ${vendorNames.join(", ")}.`,
        "Die Anbieter melden sich in der Regel innerhalb von zwei Werktagen bei dir.",
        "",
        "Deine Einwilligung kannst du jederzeit widerrufen – antworte einfach auf diese E-Mail.",
        "",
        "Dein Dettingenstack-Team",
      ].join("\n"),
    );
  } catch {
    return {
      status: "error",
      values,
      message:
        "Deine Anfrage konnte gerade nicht gesendet werden. Bitte versuch es in ein paar Minuten noch einmal.",
    };
  }

  const requestHeaders = await headers();
  after(() =>
    trackServerEvent(
      "Lead Submitted",
      {
        category: lead.category || "unbekannt",
        vendorCount: String(lead.vendors.length),
      },
      { headers: requestHeaders },
    ),
  );

  return { status: "success", vendors: vendorNames };
}
