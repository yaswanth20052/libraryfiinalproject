import Nav from "@/components/nav"
import SearchSection from "../components/library/search-section"

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-pretty">Library Catalog</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search and explore the collection. Sign up or sign in to borrow.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <a href="/auth/signup" className="h-9 px-4 rounded-md bg-primary text-primary-foreground hover:opacity-90">
              Sign up
            </a>
            <a href="/auth/login" className="h-9 px-4 rounded-md border hover:bg-muted">
              Sign in
            </a>
            <a href="/books" className="h-9 px-4 rounded-md border hover:bg-muted">
              Browse books
            </a>
          </div>
        </div>
        <SearchSection />
      </main>
    </div>
  )
}
