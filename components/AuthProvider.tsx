"use client";

import { NhostReactProvider } from "@nhost/react";
import { getNhost } from "../utils/nhost";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const client = getNhost() as any;

  // Only mount the Nhost provider if the real client is present.
  // @nhost/react expects an internal state machine at auth.client.machine.
  const canMountProvider = !!(client?.auth?.client?.machine);

  if (!canMountProvider) {
    // Fallback: render app without Nhost context (avoids "reading 'machine'" crash)
    return <>{children}</>;
  }

  return <NhostReactProvider nhost={client}>{children}</NhostReactProvider>;
}
