// By default, return one active loan so UI shows Taken + Return time
export async function GET() {
  const now = new Date()
  const due = new Date(now)
  due.setDate(due.getDate() + 14)
  const loans = [{ bookId: "1", takenAt: now.toISOString(), dueAt: due.toISOString() }]
  return new Response(JSON.stringify(loans), {
    headers: { "content-type": "application/json" },
  })
}
