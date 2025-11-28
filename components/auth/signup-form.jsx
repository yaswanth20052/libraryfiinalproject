// Per guidelines: set emailRedirectTo using NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL or window.location.origin
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import getSupabaseBrowserClient from "@/lib/supabase-browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SignUpForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  async function onSubmit(e) {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const emailRedirectTo = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/account`

      console.log("[v0] SignUp attempt:", { email, redirectTo: emailRedirectTo })

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo },
      })

      if (signUpError) {
        console.log("[v0] SignUp error:", signUpError)
        setError(signUpError.message || "Unable to sign up")
      } else {
        console.log("[v0] SignUp success")
        setMessage("Check your email to confirm your account. You can sign in after verification.")
      }
    } catch (err) {
      console.log("[v0] SignUp exception:", err)
      setError(err?.message || "Unexpected error during sign up")
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
          autoComplete="new-password"
          placeholder="Create a password"
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
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}

export default SignUpForm
export { SignUpForm }
