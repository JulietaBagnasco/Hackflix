import { Loader2 } from "lucide-react"

export function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Cargando películas...</p>
      </div>
    </div>
  )
}
