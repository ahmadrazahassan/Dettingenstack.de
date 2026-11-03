// Transactional mail via Resend (REST, no SDK). The domain dettingenstack.de is verified there in region eu-west-1.
export function mailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.LEADS_SENDER_EMAIL &&
      process.env.LEADS_INBOX_EMAIL,
  );
}

export async function sendMail(mail: {
  fromName: string;
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.LEADS_SENDER_EMAIL;
  if (!apiKey || !sender) throw new Error("Resend not configured");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${mail.fromName} <${sender}>`,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
}
