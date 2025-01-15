import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'

export default function FeaturedProducts() {
  const products = [
    {
      name: "Moisture Boost Shampoo",
      brand: "HairLux",
      rating: 4.5,
      description: "Hydrates and nourishes dry, damaged hair."
    },
    {
      name: "Volumizing Wonder",
      brand: "FullBody Hair",
      rating: 4.3,
      description: "Adds body and bounce to fine, limp hair."
    },
    {
      name: "Curl Defining Cream",
      brand: "CurlMaster",
      rating: 4.7,
      description: "Enhances and defines natural curls without frizz."
    }
  ]

  return (
    <Card className="bg-teal-50">
      <CardHeader>
        <CardTitle className="text-teal-700">Featured Products</CardTitle>
        <CardDescription>Top-rated hair care solutions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-teal-600">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.brand}</p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
              </div>
              <p className="mt-2 text-sm text-gray-700">{product.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

