"use client"

import { Star } from "lucide-react"

export function StarFilter({ selectedStars, onStarChange }) {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold text-foreground">Filtrar por rating</h2>
      <div className="flex items-center gap-3">
        {stars.map((star) => (
          <button
            key={star}
            onClick={() => onStarChange(star === selectedStars ? 0 : star)}
            className="transition-all hover:scale-110"
            aria-label={`Filtrar por ${star} estrellas`}
          >
            <Star
              className={`h-10 w-10 transition-colors ${
                star <= selectedStars ? "fill-accent text-accent" : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>
      {selectedStars > 0 && (
        <p className="text-sm text-muted-foreground">
          Mostrando películas con {selectedStars === 4 ? "6+" : "8+"} de rating
        </p>
      )}
    </div>
  )
}
