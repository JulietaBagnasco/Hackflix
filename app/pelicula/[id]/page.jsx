import { getMovieDetails, getImageUrl, getBackdropUrl } from "@/lib/tmdb"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Star, Calendar, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function MoviePage({ params }) {
  const { id } = await params

  let movie
  try {
    movie = await getMovieDetails(Number.parseInt(id))
  } catch (error) {
    console.error("[v0] Error fetching movie details:", error)
    notFound()
  }

  const rating = (movie.vote_average / 2).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src={getBackdropUrl(movie.backdrop_path) || "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 lg:w-80 flex-shrink-0">
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance text-foreground">{movie.title}</h1>
              {movie.tagline && <p className="text-lg text-muted-foreground italic text-balance">"{movie.tagline}"</p>}
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-accent">
                <Star className="h-5 w-5 fill-accent" />
                <span className="text-lg font-semibold">{rating} / 5.0</span>
                <span className="text-muted-foreground">({movie.vote_count} votos)</span>
              </div>

              {movie.release_date && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(movie.release_date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}

              {movie.runtime > 0 && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{movie.runtime} min</span>
                </div>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Sinopsis</h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {movie.overview || "No hay sinopsis disponible."}
              </p>
            </div>

            <Link href="/">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
