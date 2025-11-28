import BookCard from "./book-card"

function BookGrid({ books }) {
  if (!books?.length) {
    return <div className="text-sm text-muted-foreground">No books found.</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
    </div>
  )
}

export default BookGrid
export { BookGrid }
