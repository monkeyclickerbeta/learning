// Place this file in the "api" folder of your Vercel project: /api/discord-webhook.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Optionally, add basic API key or secret validation here for extra protection.

  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1428188266871521280/Oga_d84WXZnZf3tOJwrULa_esj1le7nCU8-sh540UfH3OdhyRIiCBstYFWIT-jsW7y9M";
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: "Discord webhook error" });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
