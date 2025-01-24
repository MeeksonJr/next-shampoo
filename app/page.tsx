import ShampooForm from "../components/ShampooForm"
import HairCareTips from "../components/HairCareTips"
import FeaturedProducts from "../components/FeaturedProducts"
import { Droplet } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 md:px-8 py-12 bg-background">
      <header className="w-full max-w-[1400px] text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Droplet className="w-16 h-16 text-primary mr-4 animate-pulse" />
          <h1 className="text-5xl font-bold text-secondary neon-text">Shampoo Sage</h1>
        </div>
        <p className="text-xl text-secondary/80 font-light">
          Discover your perfect hair care solution with AI-powered recommendations
        </p>
      </header>

      <main className="w-full max-w-[1400px] space-y-12">
        <ShampooForm />

        <div className="grid md:grid-cols-2 gap-12">
          <HairCareTips />
          <FeaturedProducts />
        </div>
      </main>

      <footer className="mt-16 text-center text-muted-foreground">
        <p className="text-sm font-light">© 2023 Shampoo Sage. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-primary transition-all">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-all">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary transition-all">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  )
}

