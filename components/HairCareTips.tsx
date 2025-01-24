import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

export default function HairCareTips() {
  const tips = [
    "Use lukewarm water to wash your hair, as hot water can strip natural oils.",
    "Apply a deep conditioning treatment once a week for extra nourishment.",
    "Gently pat your hair dry with a microfiber towel to reduce frizz.",
    "Trim your hair every 6-8 weeks to prevent split ends.",
    "Use a heat protectant spray before using hot styling tools.",
  ]

  return (
    <Card className="bg-card shadow-lg">
      <CardHeader className="bg-primary/10">
        <CardTitle className="flex items-center text-secondary">
          <Lightbulb className="w-5 h-5 mr-2 text-primary" />
          Expert Hair Care Tips
        </CardTitle>
        <CardDescription className="text-secondary/80">
          Improve your hair care routine with these professional tips
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span className="text-muted-foreground">{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

