import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingBag } from "lucide-react"

export default function FeaturedProducts() {
  const products = [
    {
      name: "Moisture Boost Shampoo",
      brand: "HairLux",
      rating: 4.5,
      description: "Hydrates and nourishes dry, damaged hair.",
    },
    {
      name: "Volumizing Wonder",
      brand: "FullBody Hair",
      rating: 4.3,
      description: "Adds body and bounce to fine, limp hair.",
    },
    {
      name: "Curl Defining Cream",
      brand: "CurlMaster",
      rating: 4.7,
      description: "Enhances and defines natural curls without frizz.",
    },
  ]

  return (
    <Card className="bg-card shadow-lg">
      <CardHeader className="bg-secondary/10">
        <CardTitle className="flex items-center text-secondary">
          <ShoppingBag className="w-5 h-5 mr-2 text-secondary" />
          Featured Products
        </CardTitle>
        <CardDescription className="text-secondary/80">Top-rated hair care products you might like</CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-semibold text-secondary">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-primary fill-current" />
                <span className="ml-1 text-sm text-muted-foreground">{product.rating}</span>
              </div>
              <p className="text-sm mt-1 text-muted-foreground">{product.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

