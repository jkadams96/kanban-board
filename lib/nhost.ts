// lib/nhost.ts
import { NhostClient } from "@nhost/nhost-js";

// Fail fast if env vars are missing
if (!process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || !process.env.NEXT_PUBLIC_NHOST_REGION) {
  throw new Error(
    "Missing NEXT_PUBLIC_NHOST_SUBDOMAIN or NEXT_PUBLIC_NHOST_REGION in .env.local"
  );
}

export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
});
