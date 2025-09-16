"use client";

import { nhost } from "@utils/nhost";

export function SignOutButton() {
  return (
    <button
      onClick={() => nhost.auth.signOut()}
      style={{
        background: "red",
        color: "white",
        padding: "0.5rem",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
      }}
    >
      Sign Out
    </button>
  );
}
