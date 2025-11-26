"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star } from "lucide-react"

export function MovieModal({ movie, open, onOpenChange }) {
  const rating = (movie.vote_average / 2).toFixed(1)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-balance">{movie.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-accent">
            <Star className="h-5 w-5 fill-accent" />
            <span className="text-lg font-semibold">{rating} / 5.0</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              {movie.overview || "No hay descripción disponible."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
