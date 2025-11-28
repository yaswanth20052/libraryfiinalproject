"use client"

import { useParams, useRouter } from "next/navigation"
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function BookDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id
  const { data, error, isLoading } = useSWR(id ? `/api/books/${id}` : null, fetcher)

  if (isLoading) {
    return <div className="min-h-dvh flex items-center justify-center text-muted-foreground">Loading book…</div>
  }
  if (error || !data?.book) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-sm">
          <p className="text-destructive">Book not found.</p>
          <button
            onClick={() => router.back()}
            className="mt-2 inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  const b = data.book
  const available = b.availableCopies > 0

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-4 inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm hover:bg-accent hover:text-accent-foreground"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6">
          <div className="border border-border rounded-lg overflow-hidden">
            <img
              src={b.coverImage || "/placeholder.svg?height=400&width=300&query=book%20cover"}
              alt={b.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-pretty">{b.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{b.author}</p>
            <p className="mt-2 text-sm">ISBN: {b.isbn}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Categories:</span>
              <div className="flex flex-wrap gap-2">
                {b.categories?.map((c) => (
                  <span key={c} className="text-xs rounded border border-border px-2 py-0.5">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed">{b.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <span
                className={`text-xs rounded px-2 py-0.5 border ${
                  available ? "border-green-600 text-green-700" : "border-amber-600 text-amber-700"
                }`}
              >
                {available ? `${b.availableCopies} available` : "On loan"}
              </span>
              <button
                disabled={!available}
                className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                onClick={() => alert("Borrow action placeholder")}
              >
                {available ? "Borrow" : "Join waitlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
