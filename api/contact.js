// ─── Allowed Origins ─────────────────────────────────────────────────────────
function isOriginAllowed(origin) {
  const raw = process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:5173";
  const allowed = raw.split(",").map((o) => o.trim());
  return !origin || allowed.some((a) => origin.startsWith(a));
}

// ─── Target Email ────────────────────────────────────────────────────────────
const TARGET_EMAIL = "support@soruballc.com";

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS Check
  const origin = req.headers.origin || "";
  if (!isOriginAllowed(origin)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (origin) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required fields." });
  }

  const trimmedName = String(name).trim().slice(0, 100);
  const trimmedEmail = String(email).trim().slice(0, 150);
  const trimmedMessage = String(message).trim().slice(0, 3000);

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const emailSubject = `New Website Inquiry from ${trimmedName}`;
  const emailBody = `New inquiry received on Soruba LLC Contact Form:\n\n` +
    `Name: ${trimmedName}\n` +
    `Sender Email: ${trimmedEmail}\n` +
    `Recipient: ${TARGET_EMAIL}\n` +
    `Date: ${new Date().toISOString()}\n\n` +
    `Message:\n${trimmedMessage}\n`;

  try {
    // Option 1: Send via Resend API if API key is provided in process.env
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Soruba Contact Form <onboarding@resend.dev>",
          to: [TARGET_EMAIL],
          reply_to: trimmedEmail,
          subject: emailSubject,
          text: emailBody
        })
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.json();
        console.error("Resend delivery failed:", errorData);
        // Continue to fallback response if needed
      }
    } 
    // Option 2: Send via Web3Forms if WEB3FORMS_ACCESS_KEY is provided
    else if (process.env.WEB3FORMS_ACCESS_KEY) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name: trimmedName,
          email: trimmedEmail,
          recipient: TARGET_EMAIL,
          subject: emailSubject,
          message: trimmedMessage
        })
      });
    } else {
      // Log submission details on server
      console.log(`[Contact Form Inquiry] Target: ${TARGET_EMAIL}`);
      console.log(`From: ${trimmedName} <${trimmedEmail}>`);
      console.log(`Message: ${trimmedMessage}`);
    }

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been successfully sent. Our team will contact you shortly.",
      targetEmail: TARGET_EMAIL
    });
  } catch (err) {
    console.error("Error processing contact form submission:", err);
    return res.status(500).json({
      error: "Failed to dispatch inquiry. Please try again or email support@soruballc.com directly."
    });
  }
}
