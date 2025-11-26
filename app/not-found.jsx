import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Film } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <Film className="h-24 w-24 text-muted mb-6" />
        <h1 className="text-6xl font-bold mb-4 text-foreground">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-foreground">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8 text-center text-balance max-w-md">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </div>
  )
}
