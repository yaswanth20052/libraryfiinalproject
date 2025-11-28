"use client"
import useSWR from "swr"
import { useMemo, useState } from "react"
import Nav from "@/components/nav"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const fetchBooks = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((d) => d.books)
const fetchLoans = (url) => fetch(url).then((r) => r.json())

function BookCard({ book, myLoansMap, onBorrow }) {
  const loan = myLoansMap.get(book.id)
  const isTaken = !!loan
  const due = isTaken ? new Date(loan.dueAt) : null

  return (
    <div className="rounded-lg border border-border p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-medium">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded ${isTaken ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}
        >
          {isTaken ? "Taken" : book.availableCopies > 0 ? "Available" : "Unavailable"}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">Categories: {book.categories.join(", ")}</p>
      {isTaken ? (
        <p className="text-xs">
          Return by: <span className="font-medium">{due.toLocaleDateString()}</span>
        </p>
      ) : (
        <button
          disabled={book.availableCopies < 1}
          onClick={() => onBorrow(book)}
          className="mt-2 h-8 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          Select return time
        </button>
      )}
    </div>
  )
}

export default function BooksPage() {
  const { data: books, isLoading: booksLoading } = useSWR("/api/books", fetchBooks)
  const { data: loans, mutate: mutateLoans } = useSWR("/api/me/loans", fetchLoans)
  const [q, setQ] = useState("")
  const [activeCat, setActiveCat] = useState("All")
  const [borrowOpen, setBorrowOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [dueAtInput, setDueAtInput] = useState("")

  const categories = useMemo(() => {
    if (!books) return ["All"]
    const set = new Set()
    books.forEach((b) => b.categories.forEach((c) => set.add(c)))
    return ["All", ...Array.from(set)]
  }, [books])

  const myLoansMap = useMemo(() => {
    const m = new Map()
    ;(loans || []).forEach((l) => m.set(l.bookId, l))
    return m
  }, [loans])

  const filtered = useMemo(() => {
    if (!books) return []
    return books.filter((b) => {
      const matchQ =
        !q || b.title.toLowerCase().includes(q.toLowerCase()) || b.author.toLowerCase().includes(q.toLowerCase())
      const matchCat = activeCat === "All" || b.categories.includes(activeCat)
      return matchQ && matchCat
    })
  }, [books, q, activeCat])

  function toLocalInputValue(date) {
    const pad = (n) => String(n).padStart(2, "0")
    const y = date.getFullYear()
    const m = pad(date.getMonth() + 1)
    const d = pad(date.getDate())
    const h = pad(date.getHours())
    const min = pad(date.getMinutes())
    return `${y}-${m}-${d}T${h}:${min}`
  }

  function handleBorrow(book) {
    setSelectedBook(book)
    const takenAt = new Date()
    const defaultDue = new Date(takenAt)
    defaultDue.setDate(defaultDue.getDate() + 14)
    defaultDue.setSeconds(0, 0)
    setDueAtInput(toLocalInputValue(defaultDue))
    setBorrowOpen(true)
  }

  async function confirmBorrow() {
    if (!selectedBook || !dueAtInput) return
    const takenAt = new Date()
    const dueAt = new Date(dueAtInput)
    await mutateLoans(
      async (prev) => {
        return [
          ...(prev || []),
          { bookId: selectedBook.id, takenAt: takenAt.toISOString(), dueAt: dueAt.toISOString() },
        ]
      },
      { revalidate: false },
    )
    setBorrowOpen(false)
    setSelectedBook(null)
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Browse books</h1>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-4">
          <input
            placeholder="Search by title or author"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-10 w-full md:w-80 rounded-md border border-input bg-background px-3"
          />
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`h-9 px-3 rounded-md border ${activeCat === c ? "bg-muted" : "hover:bg-muted"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {booksLoading ? (
          <p className="text-muted-foreground">Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} myLoansMap={myLoansMap} onBorrow={handleBorrow} />
            ))}
          </div>
        )}
      </section>
      <Dialog open={borrowOpen} onOpenChange={setBorrowOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow {selectedBook?.title || "book"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="dueAt">Return by</Label>
            <input
              id="dueAt"
              type="datetime-local"
              value={dueAtInput}
              onChange={(e) => setDueAtInput(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3"
              min={toLocalInputValue(new Date())}
            />
            <p className="text-xs text-muted-foreground">
              Select the date and time by which you will return this book.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setBorrowOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBorrow}>Confirm borrow</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
