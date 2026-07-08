/** AF TRUCK PARTS — WhatsApp Business (amir bashgah) */
export const CONTACT_WHATSAPP_E164 = "989034913291";

export const CONTACT_WHATSAPP_DISPLAY = "+98 903 491 3291";

export const CONTACT_WHATSAPP_HREF = `https://wa.me/${CONTACT_WHATSAPP_E164}`;

export const CONTACT_INSTAGRAM_HREF = "https://www.instagram.com/af.truck/";

export const CONTACT_PHONE_TEL = "tel:+989034913291";

export function buildWhatsAppOrderUrl(encodedText: string): string {
  return `${CONTACT_WHATSAPP_HREF}?text=${encodedText}`;
}
