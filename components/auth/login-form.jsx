"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import getSupabaseBrowserClient from "@/lib/supabase-browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        setError(signInError.message || "Unable to sign in")
      } else {
        router.push("/books")
        router.refresh()
      }
    } catch (err) {
      setError(err?.message || "Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-foreground">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background text-foreground"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password" className="text-foreground">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-background text-foreground"
          required
        />
      </div>
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        {"Don't have an account? "}
        <Link href="/auth/signup" className="underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
export { LoginForm }
