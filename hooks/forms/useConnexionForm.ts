import { connexionSchema } from "@/config/frontendFormSchemas";

import { logger } from "@/lib/logger";
import { errorToast, successToast } from "@/lib/utils";
import onConnexion from "@/pages/connexion/Connexion.telefunc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type ConnexionFormValue = z.infer<typeof connexionSchema>;

export function useConnectionForm() {
  const form = useForm({
    resolver: zodResolver(connexionSchema) as Resolver<ConnexionFormValue>,
    defaultValues: {
      remember: true,
    },
  });

  const onSubmit = async (value: ConnexionFormValue) => {
    const data = await onConnexion(value.username, value.password, value.remember);
    if (!data.success) {
      logger.error("Echec de la connexion");
      data.message && errorToast(data.message, data.description);
    } else {
      logger.success("Connecté");
      data.message && successToast(data.message, data.description);
    }
  };

  return { form, onSubmit };
}
