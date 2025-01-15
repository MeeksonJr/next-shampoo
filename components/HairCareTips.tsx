import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from 'lucide-react'

export default function HairCareTips() {
  const tips = [
    "Use lukewarm water to wash your hair, as hot water can strip natural oils.",
    "Apply a deep conditioning treatment once a week for extra nourishment.",
    "Gently pat your hair dry with a microfiber towel to reduce frizz.",
    "Trim your hair every 6-8 weeks to prevent split ends.",
    "Use a heat protectant spray before using hot styling tools.",
    "Brush your hair from the bottom up to detangle gently.",
    "Avoid washing your hair every day to maintain natural oils.",
    "Use a silk or satin pillowcase to reduce friction while sleeping.",
    "Incorporate a scalp massage into your hair care routine to stimulate growth.",
    "Protect your hair from sun damage by wearing a hat or using UV-protective products."
  ]

  return (
    <Card className="bg-teal-50">
      <CardHeader>
        <CardTitle className="flex items-center text-teal-
700">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
          Expert Hair Care Tips
        </CardTitle>
        <CardDescription>Unlock the secrets to healthier, more beautiful hair</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="text-gray-700">{tip}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

