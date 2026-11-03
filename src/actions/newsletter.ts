"use server";

import { z } from "zod";

const schema = z.object({
  email: z.email({ error: "Bitte gib eine gültige E-Mail-Adresse ein." }),
  // Honeypot: real people never fill this hidden field.
  website: z.string().max(0),
});

export type NewsletterState = {
  status: "idle" | "error" | "not-ready" | "success";
  message?: string;
};

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = schema.safeParse({
    email: formData.get("email") ?? "",
    website: formData.get("website") ?? "",
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  // TODO(phase-4): Brevo double opt-in + Friendly Captcha (§14.4). Until then, say so honestly.
  return {
    status: "not-ready",
    message:
      "Die Newsletter-Anmeldung wird gerade eingerichtet. Bitte versuch es zum Start von Dettingenstack noch einmal.",
  };
}
