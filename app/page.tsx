"use client";

import { nhost } from "@utils/nhost";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSignUp() {
    const { error } = await nhost.auth.signUp({ email, password });
    if (error) setError(error.message);
    else router.push("/board");
  }

  async function handleSignIn() {
    const { error } = await nhost.auth.signIn({ email, password });
    if (error) setError(error.message);
    else router.push("/board");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      <h1>Sign in / Sign up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "0.5rem", borderRadius: 4, width: 260 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "0.5rem", borderRadius: 4, width: 260 }}
      />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleSignIn}
          style={{ background: "#2563eb", padding: "0.5rem 1rem", borderRadius: 4 }}
        >
          Sign In
        </button>
        <button
          onClick={handleSignUp}
          style={{ background: "green", padding: "0.5rem 1rem", borderRadius: 4 }}
        >
          Sign Up
        </button>
      </div>
      {error && <p style={{ color: "tomato" }}>{error}</p>}
    </div>
  );
}