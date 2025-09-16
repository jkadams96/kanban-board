import { NhostClient } from "@nhost/nhost-js";

// read envs; treat empty strings as undefined
const env = (k: string) => {
  const v = process.env[k];
  return v && v.trim() !== "" ? v : undefined;
};

const backendUrl =
  env("NEXT_PUBLIC_NHOST_BACKEND_URL") ?? env("NHOST_BACKEND_URL");
const subdomain =
  env("NEXT_PUBLIC_NHOST_SUBDOMAIN") ?? env("NHOST_SUBDOMAIN");
const region =
  env("NEXT_PUBLIC_NHOST_REGION") ?? env("NHOST_REGION");

// create a real client only when config is valid; otherwise return a harmless stub
function makeClient(): NhostClient {
  if (backendUrl) {
    return new NhostClient({ backendUrl } as any);
  }
  if (subdomain && region) {
    return new NhostClient({ subdomain, region } as any);
  }

  // fallback so the UI can render without envs
  if (typeof console !== "undefined") {
    console.warn(
      "[nhost] Missing configuration. Set NEXT_PUBLIC_NHOST_BACKEND_URL, " +
        "or NEXT_PUBLIC_NHOST_SUBDOMAIN and NEXT_PUBLIC_NHOST_REGION in .env.local."
    );
  }
  const stub: any = {
    auth: {
      signIn: async () => ({ session: null, error: { message: "Nhost not configured" } }),
      signUp: async () => ({ session: null, error: { message: "Nhost not configured" } }),
      signOut: async () => ({ error: null }),
      getSession: () => null,
    },
  };
  return stub as NhostClient;
}

export const nhost = makeClient();

// optional: keep existing call sites working
export function getNhost() {
  return nhost;
}
