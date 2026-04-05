import { promises as fs } from "node:fs";
import path from "node:path";
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
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma-client";
import type { PageContentMap } from "@/types/contexts";
import SetPageController from "../controller/set-page-controller";

async function getBackupSeed(): Promise<PageContentMap> {
  try {
    const filePath = path.join(process.cwd(), "backup/backup.json");

    await fs.access(filePath);

    const fileContent = await fs.readFile(filePath, "utf-8");

    const data: PageContentMap = JSON.parse(fileContent);

    logger.success("[SEED]: backup.json loaded");

    return data;
  } catch (_error) {
    logger.warn("[SEED]: No backup.json found, using fallback seed");

    return {
      home: INIT_HOMEPAGE_STATE,
      connexion: INIT_CONNEXION_STATE,
      contact: INIT_CONTACT_STATE,
      dates: INIT_DATES_STATE,
      default: { config: INIT_CONFIG_STATE, navlinks: INIT_NAVLINKS_STATE },
      groupe: INIT_GROUPE_STATE,
      medias: INIT_MEDIA_STATE,
      son: INIT_SON_STATE,
    } as PageContentMap;
  }
}

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

  const data = await getBackupSeed();

  await Promise.all([
    SetPageController.setHome(data.home),
    SetPageController.setConnexion(data.connexion),
    SetPageController.setContact(data.contact),
    SetPageController.setDates(data.dates),
    SetPageController.setDefault(data.default),
    SetPageController.setGroupe(data.groupe),
    SetPageController.setMedias(data.medias),
    SetPageController.setNousEcouter(data.son),
  ]);

  console.log("[SEED]: DATABASE FULLY SEEDED");
}
