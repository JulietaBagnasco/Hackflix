"use client"

import { getImageUrl } from "@/lib/tmdb"
import Image from "next/image"
import { Star } from "lucide-react"
import { useState } from "react"
import { MovieModal } from "./movie-modal"

export function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false)
  const rating = (movie.vote_average / 2).toFixed(1)

  return (
    <>
      <div
        className="group relative cursor-pointer overflow-hidden rounded-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
        onClick={() => setShowModal(true)}
      >
        <div className="aspect-[2/3] relative bg-muted">
          <Image
            src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-balance text-foreground">{movie.title}</h3>
          <div className="flex items-center gap-1 text-accent">
            <Star className="h-3 w-3 fill-accent" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>
      </div>

      <MovieModal movie={movie} open={showModal} onOpenChange={setShowModal} />
    </>
  )
}
