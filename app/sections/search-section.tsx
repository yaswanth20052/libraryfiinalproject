"use client"

import useSWR from "swr"
import { useState, useMemo } from "react"
import { SearchBar } from "@/components/library/search-bar"
import { BookGrid } from "@/components/library/book-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Book } from "@/components/library/book-card"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function SearchSection() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<"all" | "fiction" | "non-fiction" | "technology" | "history">("all")
  const { data, isLoading } = useSWR<{ books: Book[] }>(
    `/api/books?q=${encodeURIComponent(query)}&category=${category}`,
    fetcher,
  )

  const books = useMemo(() => data?.books ?? [], [data])

  return (
    <div className="flex flex-col gap-6">
      <SearchBar onSearch={setQuery} />

      <Tabs value={category} onValueChange={(v) => setCategory(v as any)} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="fiction">Fiction</TabsTrigger>
          <TabsTrigger value="non-fiction">Non-fiction</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <BookGrid books={books} />
      )}
    </div>
  )
}
