import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import SignUpForm from "@/components/auth/signup-form"

export default function Page() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-background">
      <section className="w-full max-w-md p-4">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-balance">Create your account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign up to borrow, reserve, and track books
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
