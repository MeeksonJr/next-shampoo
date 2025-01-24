import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Lightbulb, DollarSign } from 'lucide-react'

interface ResultsProps {
  results: {
    brand?: string;
    reason?: string;
    price?: string;
    ingredients?: string[];
    alternatives?: string[];
    tips?: string[];
  }
}

export default function ResultsDisplay({ results }: ResultsProps) {
  const getPriceIcon = (price: string) => {
    switch (price) {
      case '$':
        return <DollarSign className="w-4 h-4" />;
      case '$$':
        return <div className="flex"><DollarSign className="w-4 h-4" /><DollarSign className="w-4 h-4" /></div>;
      case '$$$':
        return <div className="flex"><DollarSign className="w-4 h-4" /><DollarSign className="w-4 h-4" /><DollarSign className="w-4 h-4" /></div>;
      default:
        return price;
    }
  };

  return (
    <div className="space-y-6">
      {results.brand && (
        <Card className="bg-teal-50">
          <CardHeader>
            <CardTitle className="flex items-center text-teal-700">
              <Sparkles className="w-5 h-5 mr-2" />
              Recommended Shampoo
            </CardTitle>
            <CardDescription>Perfect match for your hair profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-teal-700">{results.brand}</h3>
                {results.price && (
                  <div className="flex items-center mt-1 text-teal-600">
                    {getPriceIcon(results.price)}
                  </div>
                )}
              </div>
              {results.ingredients && (
                <div>
                  <h4 className="font-medium text-teal-700 mb-2">Key Ingredients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="bg-teal-100 text-teal-700">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {results.reason && (
                <div>
                  <h4 className="font-medium text-teal-700 mb-2">Why This Shampoo:</h4>
                  <p className="text-gray-700">{results.reason}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {results.alternatives && results.alternatives.length > 0 && (
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700">Alternative Options</CardTitle>
            <CardDescription>Other great choices for your hair type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.alternatives.map((alt, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{alt}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {results.tips && results.tips.length > 0 && (
        <Card className="bg-teal-50">
          <CardHeader>
            <CardTitle className="flex items-center text-teal-700">
              <Lightbulb className="w-5 h-5 mr-2" />
              Usage Tips & Care Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Need to be fixed. issue when trying to display results using map. */}
            
            <ul className="list-disc list-inside space-y-2">
              {results.tips.map((tip, index) => (
                <li key={index} className="text-gray-700">{tip}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

