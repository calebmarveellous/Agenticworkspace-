// Server-side Paystack payment verification.
// Never exposes the secret key to the browser; runs only on Vercel's servers.

const EXPECTED_AMOUNT = 500000; // ₦5,000, in the smallest currency unit (kobo)
const EXPECTED_CURRENCY = "NGN";
const DOWNLOAD_URL =
  "https://raw.githubusercontent.com/calebmarveellous/Agenticworkspace-/claude/create-claude-md-file-i2jx1h/site/assets/the-group-chat-diagnostic-manual.pdf";

module.exports = async (req, res) => {
  const reference = req.query.reference;
  if (!reference) {
    res.status(400).json({ ok: false, error: "Missing reference" });
    return;
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ ok: false, error: "Server not configured (missing PAYSTACK_SECRET_KEY)" });
    return;
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${secretKey}` } }
    );
    const json = await response.json();
    const data = json && json.data;

    const verified =
      json &&
      json.status === true &&
      data &&
      data.status === "success" &&
      data.amount === EXPECTED_AMOUNT &&
      data.currency === EXPECTED_CURRENCY;

    if (verified) {
      res.status(200).json({
        ok: true,
        downloadUrl: DOWNLOAD_URL,
        email: data.customer && data.customer.email,
      });
    } else {
      res.status(200).json({ ok: false, error: "Payment not verified" });
    }
  } catch (err) {
    res.status(502).json({ ok: false, error: "Could not reach Paystack" });
  }
};
