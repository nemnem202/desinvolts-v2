import { getContext } from "telefunc";
import ConnexionController from "@/server/controller/connexion-controller";

export default async function onConnexion(
  username: string,
  password: string,
  remember: boolean
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const context = getContext();
    return await ConnexionController.login(username, password, remember, context);
  } catch (err) {
    return { success: false, error: JSON.stringify(err) };
  }
}
