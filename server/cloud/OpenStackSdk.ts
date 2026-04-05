// core/OpenStackSDK.ts

import fs from "node:fs";
import type { storage } from "pkgcloud";
import pkgcloud from "pkgcloud";
import openStack from "../config/openStack";

const SDK = pkgcloud.storage.createClient({
  domainId: openStack.DOMAIN_ID,
  tenantId: openStack.TENANT_ID,
  password: openStack.PASSWORD,
  username: openStack.USERNAME,
  authUrl: openStack.AUTH_URL,
  keystoneAuthVersion: "v3",
  region: openStack.REGION,
  provider: "openstack",
  version: "v3",
}) as pkgcloud.storage.Client & {
  uploadFile: (params: {
    container: string;
    filePath: string;
    fileName: string;
  }) => Promise<storage.File>;
  deleteFile: (params: { container: string; fileName: string }) => Promise<void>;
};

SDK.uploadFile = async ({ container, filePath, fileName }) =>
  new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const writeStream = SDK.upload({
      container,
      remote: fileName,
    });

    writeStream.on("error", (err) => reject(err));
    writeStream.on("success", (file) => resolve(file));

    readStream.pipe(writeStream);
  });

SDK.deleteFile = async ({ container, fileName }) =>
  new Promise((resolve, reject) => {
    SDK.removeFile(container, fileName, (err) => {
      if (err) reject(err);
      resolve();
    });
  });

export default SDK;
