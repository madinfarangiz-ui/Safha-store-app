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
    const { items, total, phone, deliveryMethod, receiptUrl, orderCode } = req.body;

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

    if (photoUrls.length > 0) {
      const media = photoUrls.slice(0, 10).map((url, i) => ({
        type: "photo",
        media: url,
        caption: i === 0 ? caption : (url === receiptUrl ? "Чек оплаты / Payment receipt" : undefined),
      }));

      const sendResult = await fetch(telegramBase + "/sendMediaGroup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, media }),
      });

      if (!sendResult.ok) {
        const errText = await sendResult.text();
        // Fall back to a plain text message if the media group fails
        // (e.g. an image URL Telegram couldn't fetch)
        await fetch(telegramBase + "/sendMessage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: caption + "\n\n(Фото не удалось прикрепить: " + errText + ")" }),
        });
      }
    } else {
      await fetch(telegramBase + "/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: caption }),
      });
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
