import { prisma } from "@/lib/prisma-client";
import * as argon2 from "argon2";
import {
  INIT_CONFIG_STATE,
  INIT_CONNEXION_STATE,
  INIT_CONTACT_STATE,
  INIT_DATES_STATE,
  INIT_GROUPE_STATE,
  INIT_HOMEPAGE_STATE,
  INIT_MEDIA_STATE,
  INIT_NAVLINKS_STATE,
  INIT_SON_STATE,
} from "@/config/initialPageSeeds";
import SetPageController from "../controller/set-page-controller";

export async function seed() {
  const adminAccountNumber = await prisma.adminAccount.count();
  if (adminAccountNumber === 0) {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "password";
    const hash = await argon2.hash(password);
    await prisma.adminAccount.create({ data: { username, passwordHash: hash } });
    console.log("[SEED]: Admin account created");
  }

  console.log("[SEED]: STARTING PAGES GENERATION...");
  await SetPageController.setConfig(INIT_CONFIG_STATE);
  await SetPageController.setNavlinks(INIT_NAVLINKS_STATE);
  await SetPageController.setHome(INIT_HOMEPAGE_STATE);
  await SetPageController.setConnexion(INIT_CONNEXION_STATE);
  await SetPageController.setContact(INIT_CONTACT_STATE);
  await SetPageController.setDates(INIT_DATES_STATE);
  await SetPageController.setGroupe(INIT_GROUPE_STATE);
  await SetPageController.setMedias(INIT_MEDIA_STATE);
  await SetPageController.setNousEcouter(INIT_SON_STATE);

  console.log("[SEED]: DATABASE FULLY SEEDED");
}
