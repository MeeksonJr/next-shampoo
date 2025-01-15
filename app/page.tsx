import ShampooForm from '../components/ShampooForm'
import HairCareTips from '../components/HairCareTips'
import FeaturedProducts from '../components/FeaturedProducts'
import { Droplet } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-6xl text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Droplet className="w-16 h-16 text-primary mr-2" />
          <h1 className="text-5xl font-bold neon-text">Shampoo Sage</h1>
        </div>
        <p className="text-xl text-primary/80">
          Discover your perfect hair care solution
        </p>
      </header>
      <main className="w-full max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 cyber-card">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Find Your Ideal Shampoo
              </h2>
              <ShampooForm />
            </div>
          </div>
          <div className="md:col-span-1 space-y-8">
            <div className="cyber-card">
              <HairCareTips />
            </div>
            <div className="cyber-card">
              <FeaturedProducts />
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-12 text-center text-muted-foreground">
        <p>&copy; 2023 Shampoo Sage. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}
