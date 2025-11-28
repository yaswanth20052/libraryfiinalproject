import { MOCK_BOOKS } from "../../../lib/mock-books"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get("q") || "").toLowerCase()
  const category = searchParams.get("category") || ""

  let books = MOCK_BOOKS

  if (q) {
    books = books.filter((b) => {
      return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.toLowerCase().includes(q)
    })
  }

  if (category) {
    books = books.filter((b) => b.categories?.includes(category))
  }

  return Response.json({ books })
}
