"use client"
import useSWR from "swr"
import Nav from "@/components/nav"

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((d) => d.books)

export default function CategoriesPage() {
  const { data: books, isLoading } = useSWR("/api/books", fetcher)

  const counts = {}
  ;(books || []).forEach((b) => b.categories.forEach((c) => (counts[c] = (counts[c] || 0) + 1)))

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">All categories</h1>
        {isLoading ? (
          <p className="text-muted-foreground">Loading categories...</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.keys(counts).map((c) => (
              <li key={c} className="rounded-md border border-border p-4 flex items-center justify-between">
                <span>{c}</span>
                <span className="text-sm text-muted-foreground">{counts[c]} book(s)</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
