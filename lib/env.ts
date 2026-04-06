import { logger } from "./logger";

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  DATABASE_URL,
  PORT,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  TOKEN_SECRET_KEY,
  COOKIE_SECRET,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_PRIVATE_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_IMAGE_FOLDER_NAME,
  CLOUD_NAME,
} = process.env;

if (
  !POSTGRES_USER ||
  !POSTGRES_PASSWORD ||
  !POSTGRES_DB ||
  !DATABASE_URL ||
  !PORT ||
  !ADMIN_USERNAME ||
  !ADMIN_PASSWORD ||
  !TOKEN_SECRET_KEY ||
  !COOKIE_SECRET ||
  !EMAILJS_PUBLIC_KEY ||
  !EMAILJS_PRIVATE_KEY ||
  !EMAILJS_SERVICE_ID ||
  !EMAILJS_TEMPLATE_ID ||
  !CLOUD_NAME ||
  !CLOUD_API_KEY ||
  !CLOUD_API_SECRET ||
  !CLOUD_IMAGE_FOLDER_NAME
) {
  if (!POSTGRES_USER) logger.error("Missing environment variable: POSTGRES_USER");
  if (!POSTGRES_PASSWORD) logger.error("Missing environment variable: POSTGRES_PASSWORD");
  if (!POSTGRES_DB) logger.error("Missing environment variable: POSTGRES_DB");
  if (!DATABASE_URL) logger.error("Missing environment variable: DATABASE_URL");
  if (!PORT) logger.error("Missing environment variable: PORT");
  if (!TOKEN_SECRET_KEY) logger.error("Missing environment variable: TOKEN_SECRET_KEY");
  if (!COOKIE_SECRET) logger.error("Missing environment variable: COOKIE_SECRET");
  if (!EMAILJS_PUBLIC_KEY) logger.error("Missing environment variable: EMAILJS_PUBLIC_KEY");
  if (!EMAILJS_PRIVATE_KEY) logger.error("Missing environment variable: EMAILJS_PRIVATE_KEY");
  if (!EMAILJS_TEMPLATE_ID) logger.error("Missing environment variable: EMAILJS_TEMPLATE_ID");
  if (!EMAILJS_SERVICE_ID) logger.error("Missing environment variable: EMAILJS_SERVICE_ID");
  if (!CLOUD_NAME) logger.error("Missing environment variable: CLOUD_NAME");
  if (!CLOUD_API_KEY) logger.error("Missing environment variable: CLOUD_API_KEY");
  if (!CLOUD_API_SECRET) logger.error("Missing environment variable: CLOUD_API_SECRET");
  if (!CLOUD_IMAGE_FOLDER_NAME)
    logger.error("Missing environment variable: CLOUD_IMAGE_FOLDER_NAME");
  process.exit(1);
} else {
  logger.success("All environement variables are set");
}

export const env = {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  DATABASE_URL,
  PORT: parseInt(PORT, 10),
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  TOKEN_SECRET_KEY,
  COOKIE_SECRET,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_PRIVATE_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_IMAGE_FOLDER_NAME,
  CLOUD_NAME,
};
