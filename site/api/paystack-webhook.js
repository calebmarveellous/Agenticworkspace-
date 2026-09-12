// Paystack webhook: the reliable source of truth for "did this person actually pay".
// Fires from Paystack's servers on charge.success, independent of the buyer's browser.
// Register this URL (https://<your-domain>/api/paystack-webhook) in
// Paystack Dashboard -> Settings -> API Keys & Webhooks -> Webhook URL.

const crypto = require("crypto");
const nodemailer = require("nodemailer");

const EXPECTED_AMOUNT = 900; // $9.00, in the smallest currency unit (cents)
const EXPECTED_CURRENCY = "USD";
const DOWNLOAD_URL =
  "https://raw.githubusercontent.com/calebmarveellous/Agenticworkspace-/claude/create-claude-md-file-i2jx1h/site/assets/the-group-chat-diagnostic-manual.pdf";

module.exports.config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ error: "Server not configured (missing PAYSTACK_SECRET_KEY)" });
    return;
  }

  const rawBody = await readRawBody(req);

  // Verify this request genuinely came from Paystack, not a spoofed POST.
  const expectedSignature = crypto.createHmac("sha512", secretKey).update(rawBody).digest("hex");
  const receivedSignature = req.headers["x-paystack-signature"];
  if (!receivedSignature || expectedSignature !== receivedSignature) {
    res.status(401).json({ error: "Invalid signature" });
    return;
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (e) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  if (event.event === "charge.success") {
    const data = event.data || {};
    const paidCorrectAmount = data.amount === EXPECTED_AMOUNT && data.currency === EXPECTED_CURRENCY;
    const buyerEmail = data.customer && data.customer.email;

    if (paidCorrectAmount && data.status === "success" && buyerEmail) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `"The Group Chat Diagnostic Manual" <${process.env.GMAIL_USER}>`,
          to: buyerEmail,
          subject: "Your book is ready — The Group Chat Diagnostic Manual",
          html: `
            <p><strong>Payment received. Diagnosis incoming.</strong></p>
            <p>Thanks for your purchase! Here's your copy of <strong>The Group Chat Diagnostic Manual</strong>:</p>
            <p><a href="${DOWNLOAD_URL}" style="display:inline-block;background:#E8195B;color:#fff;
               padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:bold;">
               Download Your Book (PDF)</a></p>
            <p style="color:#999;font-size:12px;">Reference: ${data.reference}</p>
          `,
        });
      } catch (mailErr) {
        // Email failure shouldn't make Paystack retry the webhook forever.
        // Log-equivalent: still acknowledge receipt below.
      }
    }
  }

  // Always acknowledge quickly so Paystack doesn't retry unnecessarily.
  res.status(200).json({ received: true });
};
