"use client"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Nav from "@/components/nav"
import getSupabaseBrowserClient from "@/lib/supabase-browser"

const fetchBooks = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((d) => d.books || [])

const fetchLoans = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((d) => d || [])

export default function AccountPage() {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { data: books = [] } = useSWR("/api/books", fetchBooks)
  const { data: loans = [] } = useSWR("/api/me/loans", fetchLoans)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (authUser) {
          setUser(authUser)

          // Fetch user profile from users table
          const { data: profile } = await supabase.from("users").select("*").eq("id", authUser.id).single()

          if (profile) {
            setUserProfile(profile)
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const bookMap = new Map((books || []).map((b) => [b.id, b]))
  const items = (loans || []).map((l) => {
    const b = bookMap.get(l.bookId)
    const taken = new Date(l.takenAt)
    const due = new Date(l.dueAt)
    return {
      id: l.bookId,
      title: b?.title || "Unknown",
      author: b?.author || "",
      takenAt: taken,
      dueAt: due,
    }
  })

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        <div className="rounded-lg border border-border p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          {loading ? (
            <p className="text-muted-foreground">Loading profile...</p>
          ) : user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{userProfile?.full_name || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">
                  {userProfile?.member_since ? new Date(userProfile.member_since).toLocaleDateString() : "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{userProfile?.phone || "Not set"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{userProfile?.address || "Not set"}</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Please log in to view your profile.</p>
          )}
        </div>

        {/* My Loans section */}
        <div>
          <h1 className="text-2xl font-semibold">My Loans</h1>
          <p className="text-sm text-muted-foreground">Your current loans with taken and return dates.</p>
        </div>
        <div className="grid gap-3">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm">No active loans.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="rounded-md border border-border p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{it.title}</p>
                  <p className="text-sm text-muted-foreground">{it.author}</p>
                </div>
                <div className="text-right text-sm">
                  <p>
                    Taken: <span className="font-medium">{it.takenAt.toLocaleDateString()}</span>
                  </p>
                  <p>
                    Return by: <span className="font-medium">{it.dueAt.toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
