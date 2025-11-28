import { MOCK_BOOKS } from "../../../../lib/mock-books"

export async function GET(_request, { params }) {
  const book = MOCK_BOOKS.find((b) => b.id === params.id)
  if (!book) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 })
  }
  return Response.json({ book })
}
