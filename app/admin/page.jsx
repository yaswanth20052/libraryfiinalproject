import SiteHeader from "../../components/site-header"

export default function AdminPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          <li>Manage books and copies</li>
          <li>Approve reservations</li>
          <li>Overdue and circulation reports</li>
        </ul>
      </main>
    </div>
  )
}
