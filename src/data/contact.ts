/** AF TRUCK PARTS — WhatsApp Business (amir bashgah) */
export const CONTACT_WHATSAPP_E164 = "989034913291";

export const CONTACT_WHATSAPP_DISPLAY = "+98 903 491 3291";

export const CONTACT_WHATSAPP_HREF = `https://wa.me/${CONTACT_WHATSAPP_E164}`;

export const CONTACT_INSTAGRAM_HREF = "https://www.instagram.com/af.truck/";

export const CONTACT_PHONE_DISPLAY = "021 7737 0629";

export const CONTACT_PHONE_TEL = "tel:+982177370629";

export function buildWhatsAppOrderUrl(encodedText?: string): string {
  return encodedText ? `${CONTACT_WHATSAPP_HREF}?text=${encodedText}` : CONTACT_WHATSAPP_HREF;
}

/**
 * Opens a WhatsApp chat.
 * Universal Links (wa.me) let iOS/Android deep-link into the native app when installed,
 * and fall back to the browser cleanly when it isn't.
 */
export function openWhatsAppChat(text?: string): void {
  const encoded = text ? encodeURIComponent(text) : undefined;
  const url = buildWhatsAppOrderUrl(encoded);

  window.open(url, "_blank", "noopener,noreferrer");
}
