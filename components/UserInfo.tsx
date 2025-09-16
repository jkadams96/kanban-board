"use client";

import { useUserData } from "@nhost/react";
import { SignOutButton } from "./SignOutButton";

export function UserInfo() {
  const user = useUserData();
  if (!user) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#1e293b",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {user.displayName?.charAt(0) || user.email?.charAt(0)}
        </div>
        <span>{user.displayName || user.email}</span>
      </div>
      <SignOutButton />
    </div>
  );
}
