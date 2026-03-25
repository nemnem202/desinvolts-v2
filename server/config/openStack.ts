export default {
  AUTH_URL: process.env.OS_AUTH_URL as string,
  CONTAINER_URL: process.env.OS_CONTAINER_URL as string,
  USERNAME: process.env.OS_USERNAME as string,
  PASSWORD: process.env.OS_PASSWORD as string,
  DOMAIN_NAME: process.env.OS_DOMAIN_NAME as string,
  DOMAIN_ID: process.env.OS_DOMAIN_ID as string,
  SCOPE_ID: process.env.OS_SCOPE_ID as string,
  TENANT_ID: process.env.OS_TENANT_ID as string,
  REGION: process.env.OS_REGION as string,
  SECRET: process.env.OS_SECRET as string,
  IMAGES_CONTAINER_NAME: process.env.OS_IMAGES_CONTAINER_NAME as string,
};
