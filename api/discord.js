// Bros Still Looking Lol
// Just Stop Trying Atp
// Bro Just Use The Website Like it's Meant To Be Used Don't Try To Ruin it
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    return res.status(500).json({ error: "Discord webhook is not configured" });
  }

  try {
    const body = req.body || {};
    // Your Wasting Your Time So Give Up
    const discordPayload = {
      content: body.content || JSON.stringify(body, null, 2),
    };

    const r = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return res.status(502).json({ error: "Discord returned an error", status: r.status, body: text });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
