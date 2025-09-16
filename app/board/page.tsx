"use client"

import { useAuthenticationStatus } from "@nhost/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Board from "./Board"
import { UserInfo } from "../../components/UserInfo"

export default function BoardPage() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) return <p style={{ color: "white" }}>Checking auth…</p>
  if (!isAuthenticated) return null

  return (
    <div style={{ padding: "1rem" }}>
      <UserInfo />
      <Board />
    </div>
  )
}