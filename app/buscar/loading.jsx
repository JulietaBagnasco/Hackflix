import { Header } from "@/components/header"
import { Loader } from "@/components/loader"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-8">
        <Loader />
      </div>
    </div>
  )
}
