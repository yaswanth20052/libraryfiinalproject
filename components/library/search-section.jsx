"use client"

import { useState, useMemo } from "react"
import useSWR from "swr"
import SearchBar from "./search-bar"
import BookGrid from "./book-grid"

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function SearchSection() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")

  const key = useMemo(() => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (category) params.set("category", category)
    const qs = params.toString()
    return `/api/books${qs ? `?${qs}` : ""}`
  }, [query, category])

  const { data, error, isLoading } = useSWR(key, fetcher, { revalidateOnFocus: false })

  return (
    <section className="space-y-4">
      <SearchBar query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} />
      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading books…</div>
      ) : error ? (
        <div className="text-sm text-destructive">Failed to load.</div>
      ) : (
        <BookGrid books={data?.books || []} />
      )}
    </section>
  )
}
