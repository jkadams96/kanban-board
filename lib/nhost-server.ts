"use server";

import { NhostClient } from "@nhost/nhost-js";

// Export ONLY async functions from "use server" files.
export async function getNhost() {
  return new NhostClient({
    subdomain: process.env.NHOST_SUBDOMAIN || "",
    region: process.env.NHOST_REGION || "",
  });
}
