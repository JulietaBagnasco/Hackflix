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
        <h1 className="text-4xl font-bold mb-2 text-foreground">Película no encontrada</h1>
        <p className="text-muted-foreground mb-8 text-center text-balance max-w-md">
          Lo sentimos, no pudimos encontrar la película que buscas.
        </p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </div>
  )
}
