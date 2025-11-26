"use client";

import { Header } from "@/components/header";
import { StarFilter } from "@/components/star-filter";
import { MovieGrid } from "@/components/movie-grid";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { getPopularMovies, getMoviesByRating } from "@/lib/tmdb";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStars, setSelectedStars] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedStars === 0) {
          data = await getPopularMovies(1);
        } else {
          const minRating = selectedStars === 4 ? 6 : 8;
          data = await getMoviesByRating(minRating, 1);
        }
        setMovies(data.results);
        setHasMore(data.page < data.total_pages);
        setPage(1);
      } catch (error) {
        console.error("[v0] Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedStars]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      let data;
      if (selectedStars === 0) {
        data = await getPopularMovies(nextPage);
      } else {
        const minRating = selectedStars === 4 ? 6 : 8;
        data = await getMoviesByRating(minRating, nextPage);
      }
      setMovies((prev) => [...prev, ...data.results]);
      setHasMore(data.page < data.total_pages);
      setPage(nextPage);
    } catch (error) {
      console.error("[v0] Error loading more movies:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hackflix-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="relative container h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance text-foreground">
            ¡Tus películas favoritas!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis est ipsum fuga, distinctio doloremque repellat incidunt0
          </p>
        </div>
      </div>

      <div className="container px-4 py-8 space-y-8">
        <StarFilter
          selectedStars={selectedStars}
          onStarChange={setSelectedStars}
        />

        {loading ? <Loader /> : <MovieGrid movies={movies} />}

        {!loading && hasMore && movies.length > 0 && (
          <div className="flex justify-center pt-8">
            <Button
              onClick={loadMore}
              disabled={loadingMore}
              className="gap-2"
              size="lg"
            >
              {loadingMore ? "Cargando..." : "Cargar más películas"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
