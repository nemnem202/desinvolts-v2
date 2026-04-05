import { getContext } from "telefunc";
import { logger } from "@/lib/logger";

export default async function authenticateUser(): Promise<{ isAuthenticated: boolean }> {
  try {
    const { currentUser } = getContext<{ currentUser: { username: string } | null }>();

    if (!currentUser) {
      logger.info("An un-authentified user tried to update the state but failed as a loser.");
      return { isAuthenticated: false };
    }

    logger.success("User authenticated !");

    return { isAuthenticated: true };
  } catch {
    return { isAuthenticated: false };
  }
}
