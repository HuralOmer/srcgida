export const config = {
  runtime: "edge",
};

const MAX_TOTAL_ATTACHMENT_BYTES = 8 * 1024 * 1024;
const RESEND_API_URL = "https://api.resend.com/emails";
const FALLBACK_FROM_EMAIL = "SRC Gida <sales@srcgida.com>";
const FALLBACK_TO_EMAIL = "sales@srcgida.com";

type ResendAttachment = {
  filename: string;
  content: string;
  content_type?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function renderTableRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #64748b;">${label}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #0f172a; font-weight: 600;">${escapeHtml(value || "-")}</td>
    </tr>
  `;
}

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ success: false, message: "Method not allowed" }, { status: 405 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json({ success: false, message: "RESEND_API_KEY is not configured" }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const name = getString(formData, "name");
    const company = getString(formData, "company");
    const email = getString(formData, "email");
    const phone = getString(formData, "phone");
    const vessel = getString(formData, "vessel");
    const port = getString(formData, "port");
    const eta = getString(formData, "eta");
    const message = getString(formData, "message");

    if (!name || !company || !email || !phone) {
      return Response.json({ success: false, message: "Required fields are missing" }, { status: 400 });
    }

    const files = formData
      .getAll("documents")
      .filter((value): value is File => value instanceof File && value.size > 0);

    const totalAttachmentBytes = files.reduce((total, file) => total + file.size, 0);

    if (totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return Response.json(
        { success: false, message: "Attached files are too large. Please keep total size under 8 MB." },
        { status: 400 },
      );
    }

    const attachments: ResendAttachment[] = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: arrayBufferToBase64(await file.arrayBuffer()),
        content_type: file.type || undefined,
      })),
    );

    const html = `
      <div style="font-family: Arial, sans-serif; color: #0f172a;">
        <h1 style="margin: 0 0 16px;">New RFQ Request</h1>
        <table style="border-collapse: collapse; width: 100%; max-width: 720px; background: #ffffff; border: 1px solid #e5e7eb;">
          ${renderTableRow("Name", name)}
          ${renderTableRow("Company", company)}
          ${renderTableRow("Email", email)}
          ${renderTableRow("Phone", phone)}
          ${renderTableRow("Vessel Name", vessel)}
          ${renderTableRow("Port of Call", port)}
          ${renderTableRow("ETA", eta)}
        </table>
        <h2 style="margin: 24px 0 8px; font-size: 18px;">Message</h2>
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message || "-")}</p>
        <p style="margin-top: 24px; color: #64748b; font-size: 13px;">Attachments: ${attachments.length || "None"}</p>
      </div>
    `;

    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || FALLBACK_FROM_EMAIL,
        to: [process.env.RFQ_TO_EMAIL || FALLBACK_TO_EMAIL],
        reply_to: email,
        subject: `New RFQ Request - ${company}`,
        html,
        attachments,
      }),
    });

    const result = await resendResponse.json();

    if (!resendResponse.ok) {
      return Response.json(
        { success: false, message: result.message || "Email could not be sent" },
        { status: resendResponse.status },
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, message: "The RFQ could not be processed" }, { status: 500 });
  }
}
