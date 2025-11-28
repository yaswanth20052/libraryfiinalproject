import Link from "next/link"

export default function BookCard({ book }) {
  const available = book.availableCopies > 0

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      <div className="aspect-[3/4] bg-muted">
        <img
          src={book.coverImage || "/placeholder.svg?height=400&width=300&query=book%20cover"}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-foreground text-pretty">{book.title}</h3>
          <span
            className={`text-xs rounded px-2 py-0.5 border ${
              available ? "border-green-600 text-green-700" : "border-amber-600 text-amber-700"
            }`}
            aria-label={available ? "Available" : "On loan"}
          >
            {available ? "Available" : "On loan"}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
        <p className="mt-1 text-xs text-muted-foreground">ISBN: {book.isbn}</p>
        <div className="mt-3">
          <Link
            href={`/books/${book.id}`}
            className="inline-flex items-center justify-center h-9 px-3 text-sm rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  )
}
