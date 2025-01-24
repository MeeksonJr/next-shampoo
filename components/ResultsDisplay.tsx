import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Lightbulb, DollarSign } from "lucide-react"

interface ResultsProps {
  results: {
    brand?: string
    reason?: string
    price?: string
    ingredients?: string[]
    alternatives?: string[]
    tips?: string[] | string
    region?: string
  }
}

export default function ResultsDisplay({ results }: ResultsProps) {
  const getPriceIcon = (price: string) => {
    switch (price) {
      case "$":
        return <DollarSign className="w-4 h-4" />
      case "$$":
        return (
          <div className="flex">
            <DollarSign className="w-4 h-4" />
            <DollarSign className="w-4 h-4" />
          </div>
        )
      case "$$$":
        return (
          <div className="flex">
            <DollarSign className="w-4 h-4" />
            <DollarSign className="w-4 h-4" />
            <DollarSign className="w-4 h-4" />
          </div>
        )
      default:
        return price
    }
  }

  const parseTips = (tips: string[] | string) => {
    if (Array.isArray(tips)) return tips
    return tips.split("\n").map((tip) => tip.replace(/^\d+\.\s*/, ""))
  }

  return (
    <div className="space-y-6">
      {results.brand && (
        <Card className="bg-card shadow-md">
          <CardHeader className="bg-primary/10">
            <CardTitle className="flex items-center text-secondary">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              Recommended Shampoo
            </CardTitle>
            <CardDescription className="text-secondary/80">Perfect match for your hair profile</CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-secondary">{results.brand}</h3>
                {results.price && (
                  <div className="flex items-center mt-1 text-muted-foreground">{getPriceIcon(results.price)}</div>
                )}
              </div>
              {results.ingredients && (
                <div>
                  <h4 className="font-medium text-secondary mb-2">Key Ingredients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="bg-accent text-accent-foreground">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {results.reason && (
                <div>
                  <h4 className="font-medium text-secondary mb-2">Why This Shampoo:</h4>
                  <p className="text-muted-foreground">{results.reason}</p>
                </div>
              )}
              {results.region && (
                <div>
                  <h4 className="font-medium text-secondary mb-2">Region:</h4>
                  <p className="text-muted-foreground">{results.region}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {results.alternatives && results.alternatives.length > 0 && (
        <Card className="bg-card shadow-md">
          <CardHeader className="bg-secondary/10">
            <CardTitle className="text-secondary">Alternative Options</CardTitle>
            <CardDescription className="text-secondary/80">Other great choices for your hair type</CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="space-y-2">
              {results.alternatives.map((alt, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span className="text-secondary">{alt}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {results.tips && parseTips(results.tips).length > 0 && (
        <Card className="bg-card shadow-md">
          <CardHeader className="bg-accent/10">
            <CardTitle className="flex items-center text-secondary">
              <Lightbulb className="w-5 h-5 mr-2 text-accent" />
              Usage Tips & Care Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <ul className="space-y-2">
              {parseTips(results.tips).map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

