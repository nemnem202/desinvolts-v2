import { ContactFormValues } from "@/hooks/forms/useContactForm";
import { logger } from "@/lib/logger";
import { ApiResponse } from "@/types/server";
import emailjs from "@emailjs/nodejs";

export default async function onContact(data: ContactFormValues): Promise<ApiResponse<null>> {
  try {
    const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } = process.env;
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID)
      throw new Error(
        `Les variables d'environnement d'emailjs sont mal définies, service id: ${EMAILJS_SERVICE_ID}, template id: ${EMAILJS_TEMPLATE_ID}`,
      );
    const res = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);

    logger.info("Email envoyé.");
    logger.info("Status de la réponse de l'envoi d'email: ", res.status);
    logger.info("Message: ", res.text);

    return { success: true, body: null };
  } catch (err) {
    logger.error("Email send failed", err);
    return {
      success: false,
      message: "L'email n'a pas été envoyé :/",
      description: "Une erreur innatendue est survenue",
    };
  }
}
