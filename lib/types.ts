export type { Book } from "@/components/library/book-card"

export type BookDetail = {
  id: string
  title: string
  author: string
  description?: string
  isbn?: string
  category?: string
  coverImage?: string
  availableCopies: number
  totalCopies: number
}
