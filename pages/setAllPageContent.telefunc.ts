import ApiHandler from "@/lib/apiHandler";
import { logger } from "@/lib/logger";
import { AbstractPageState, PageStateKey } from "@/types/contexts";

export const setAllPages = async (data: AbstractPageState[]): Promise<{ success: boolean }> => {
  const errors: any[] = [];

  try {
    const defaultItem = data.find((e) => e.page === "default") as AbstractPageState;
    const res = await ApiHandler.post(`/api/default`, defaultItem.content);
    if (!res.success) errors.push("Échec de default");
  } catch (err) {
    errors.push(err);
    logger.error("Erreur lors de l'upload de la page default");
  }

  const pagesOnly = PageStateKey.filter((page) => page !== "default");
  const req = await Promise.all(
    pagesOnly.map(async (page) => {
      try {
        const fetchUrl = `http://backend:${process.env.PORT}/${page}`;
        const item = data.find((e) => e.page === page) as AbstractPageState;
        const res = await ApiHandler.post(fetchUrl, item.content);
        return res.success;
      } catch (err) {
        errors.push(err);
        logger.error(`Erreur lors de l'upload de la page ${page}`);
        return false;
      }
    }),
  );

  logger.info("All pages requested");
  errors.forEach((err) => logger.error(err));
  return { success: errors.length === 0 && !req.includes(false) };
};
