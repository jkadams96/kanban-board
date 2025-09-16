"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNhost } from "../../utils/nhost";
import Board from "./Board";

export default function BoardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const nhost: any = getNhost();

    // 1) Check current session immediately
    try {
      const current =
        typeof nhost?.auth?.getSession === "function"
          ? nhost.auth.getSession()
          : null;
      if (current) {
        setAuthed(true);
        setReady(true);
        return;
      }
    } catch {
      // ignore; fall through to listener/unauthenticated
    }

    // 2) Subscribe to auth changes (normalize return type to () => void)
    let unsubscribe: (() => void) | undefined;
    const hasListener = typeof nhost?.auth?.onAuthStateChanged === "function";

    if (hasListener) {
      const off = nhost.auth.onAuthStateChanged(
        (_event: any, session: any) => {
          setAuthed(!!session);
          setReady(true);
        }
      );

      if (typeof off === "function") {
        unsubscribe = off as () => void;
      } else if (off && typeof off.unsubscribe === "function") {
        unsubscribe = () => off.unsubscribe();
      } else {
        setReady(true);
      }
    } else {
      setReady(true);
    }

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  // Redirect visitors who aren't signed in
  useEffect(() => {
    if (ready && !authed) router.replace("/");
  }, [ready, authed, router]);

  // Prevent flicker while deciding
  if (!ready) return <div style={{ padding: 24, color: "white" }}>Loading…</div>;
  if (!authed) return null;

  return <Board />;
}
