"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import getSupabase from "@/lib/supabase-browser"

export default function Nav() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const supabase = getSupabase()
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null))
  }, [])

  async function handleSignOut() {
    const supabase = getSupabase()
    await supabase.auth.signOut()
    router.push("/")
  }

  const linkCls = "text-sm px-3 py-2 rounded-md hover:bg-muted aria-[current=page]:bg-muted"
  const active = (href) => (pathname === href ? { "aria-current": "page" } : {})

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-foreground">
          Library
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/books" className={linkCls} {...active("/books")}>
            Books
          </Link>
          <Link href="/categories" className={linkCls} {...active("/categories")}>
            Categories
          </Link>
          {user ? (
            <>
              <Link href="/account" className={linkCls} {...active("/account")}>
                Account
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm px-3 py-2 rounded-md bg-destructive text-destructive-foreground hover:opacity-90"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={linkCls} {...active("/auth/login")}>
                Sign in
              </Link>
              <Link href="/auth/signup" className={linkCls} {...active("/auth/signup")}>
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
