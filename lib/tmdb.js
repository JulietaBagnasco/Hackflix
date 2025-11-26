// TMDb API configuration and helper functions
const API_KEY = "69cd900a6ff80a954ee99465ba655556"
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch movies")
  }

  return response.json()
}

export const getMoviesByRating = async (minRating, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&sort_by=popularity.desc&vote_average.gte=${minRating}&vote_count.gte=100&page=${page}`,
    { next: { revalidate: 3600 } },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch movies by rating")
  }

  return response.json()
}

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch movie details")
  }

  return response.json()
}

export const searchMovies = async (query, page = 1) => {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 }
  }

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=${page}`,
    { cache: "no-store" },
  )

  if (!response.ok) {
    throw new Error("Failed to search movies")
  }

  return response.json()
}

export const getImageUrl = (path, size = "w500") => {
  if (!path) return "/placeholder.svg?height=750&width=500"
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export const getBackdropUrl = (path) => {
  if (!path) return "/placeholder.svg?height=1080&width=1920"
  return `${IMAGE_BASE_URL}/original${path}`
}
