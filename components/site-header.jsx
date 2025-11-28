import Link from "next/link"

function SiteHeader() {
  return (
    <header className="bg-background border-b border-border text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg text-foreground">
          Online Library
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm hover:underline">
            Catalog
          </Link>
          <Link href="/account" className="text-sm hover:underline">
            Account
          </Link>
          <Link href="/admin" className="text-sm hover:underline">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}

export { SiteHeader }
export default SiteHeader
