export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

  if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
    res.status(500).json({ ok: false, error: "Server not configured: missing BOT_TOKEN or ADMIN_CHAT_ID" });
    return;
  }

  try {
    const { items, total, phone, address, deliveryMethod, receiptUrl, orderCode } = req.body;

    const lines = [];
    lines.push("🛍 Новый заказ #" + orderCode + " / New order #" + orderCode);
    (items || []).forEach((item, i) => {
      lines.push(
        (i + 1) + ". " + item.name + " — " + item.colorName + ", " +
        (item.size === "freeSize" ? "Free size" : item.size) + " — " + item.priceLabel
      );
    });
    lines.push("");
    lines.push("Итого / Total: " + total);
    lines.push("Телефон / Phone: " + phone);
    lines.push("Адрес / Address: " + (address || "—"));
    lines.push(
      "Доставка / Delivery: " +
      (deliveryMethod === "yandex"
        ? "Ташкент — курьер Яндекс, оплата наличными при получении"
        : "Другой регион — доставка BTS")
    );
    lines.push("");
    lines.push("Геометка клиента появится следующим сообщением (📎 → Локация) / Customer's live location will follow as the next message.");
    const caption = lines.join("\n");

    const photoUrls = (items || []).map((item) => item.photoUrl).filter(Boolean);
    if (receiptUrl) photoUrls.push(receiptUrl);

    const telegramBase = "https://api.telegram.org/bot" + BOT_TOKEN;
    let photoWarning = "";

    if (photoUrls.length === 1) {
      // Telegram's sendPhoto is for a single image; sendMediaGroup requires 2+
      const res1 = await fetch(telegramBase + "/sendPhoto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, photo: photoUrls[0] }),
      });
      if (!res1.ok) {
        const errText = await res1.text();
        photoWarning = "\n\n⚠️ Не удалось отправить фото / Photo failed to send:\n" + photoUrls[0] + "\n(" + errText + ")";
      }
    } else if (photoUrls.length >= 2) {
      const media = photoUrls.slice(0, 10).map((url) => ({
        type: "photo",
        media: url,
        caption: url === receiptUrl ? "Чек оплаты / Payment receipt" : undefined,
      }));

      const resGroup = await fetch(telegramBase + "/sendMediaGroup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, media }),
      });
      if (!resGroup.ok) {
        const errText = await resGroup.text();
        photoWarning =
          "\n\n⚠️ Не удалось отправить фото / Photos failed to send:\n" +
          photoUrls.join("\n") + "\n(" + errText + ")";
      }
    }

    // Always send the full order details as its own plain message.
    // Telegram's caption placement on photo albums is unreliable, so
    // this guarantees the text is visible regardless of the photos above.
    await fetch(telegramBase + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: caption + photoWarning }),
    });

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
