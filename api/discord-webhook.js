export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Secret validation
  const SECRET = "geniuspeople";
  if (!req.body.secret || req.body.secret !== SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Remove secret before forwarding
  const { secret, ...discordPayload } = req.body;

  // Replace with your actual Discord webhook URL:
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1428463631221129268/G0zhbZIpx3hHejYCOIFCeb0Ghr5MT9Woqatwl6sDv3jzY58--gJXcHG-Uhx-hTSpN4XE";
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });
    if (!response.ok) {
      return res.status(500).json({ error: "Failed to send to Discord" });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
