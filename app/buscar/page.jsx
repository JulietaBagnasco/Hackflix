"use client"

import { Header } from "@/components/header"
import { MovieGrid } from "@/components/movie-grid"
import { Loader } from "@/components/loader"
import { Input } from "@/components/ui/input"
import { searchMovies } from "@/lib/tmdb"
import { useInput } from "@/hooks/use-input"
import { useDebounce } from "@/hooks/use-debounce"
import { useState, useEffect } from "react"

export default function SearchPage() {
  const input = useInput("")
  const debouncedSearch = useDebounce(input.value, 500)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearch.trim()) {
        setMovies([])
        return
      }

      setLoading(true)
      try {
        const data = await searchMovies(debouncedSearch)
        setMovies(data.results)
      } catch (error) {
        console.error("[v0] Error searching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [debouncedSearch])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container px-4 py-8 space-y-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Buscar películas</h1>
          <Input {...input.bind} placeholder="Buscar películas..." className="h-12 text-lg" />
        </div>

        {loading ? (
          <Loader />
        ) : debouncedSearch.trim() ? (
          <MovieGrid movies={movies} />
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-lg text-muted-foreground text-center text-balance">Escribe algo para buscar películas</p>
          </div>
        )}
      </div>
    </div>
  )
}
