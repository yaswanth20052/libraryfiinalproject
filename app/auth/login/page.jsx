import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import LoginForm from "@/components/auth/login-form"

export default function Page() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-background">
      <section className="w-full max-w-md p-4">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-balance">Sign in</CardTitle>
            <CardDescription className="text-muted-foreground">Access your library account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
