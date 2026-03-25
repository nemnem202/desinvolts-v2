import ApiHandler from "@/lib/apiHandler";
import { logger } from "@/lib/logger";
import { AbstractPageState, PageContentMap, PageStateKey } from "@/types/contexts";

export const getAllPageStates = async (): Promise<AbstractPageState[]> => {
  const data = await Promise.all(
    PageStateKey.map(async (page) => {
      try {
        const fetchUrl = `/api/${page}`;
        console.log(`[DEBUG] Calling API: "${fetchUrl}"`);
        const res = await ApiHandler.get<PageContentMap>(fetchUrl);
        if (!res.success) throw new Error(`La récupération de la page ${page} a échoué`);

        return { page, content: res.body } as AbstractPageState;
      } catch (err) {
        logger.error(`Erreur lors de la récupération de la page ${page}:`, err);
        return null;
      }
    }),
  );
  logger.info("All pages requested");
  return data.filter((item): item is AbstractPageState => item !== null);
};
