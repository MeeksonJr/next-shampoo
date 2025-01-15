'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from 'lucide-react'
import ResultsDisplay from './ResultsDisplay'

type Step = 'brand' | 'reason' | 'price' | 'ingredients' | 'alternatives' | 'tips'

export default function ShampooForm() {
  const [formData, setFormData] = useState({
    hairType: '',
    scalpType: '',
    hairLength: 50,
    hairConcerns: [],
    isColorTreated: false,
    hairWashFrequency: '',
    preferredFragrance: '',
  })
  const [results, setResults] = useState<{
    brand?: string;
    reason?: string;
    price?: string;
    ingredients?: string[];
    alternatives?: string[];
    tips?: string[];
  }>({})
  const [currentStep, setCurrentStep] = useState<Step>('brand')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const steps: Step[] = ['brand', 'reason', 'price', 'ingredients', 'alternatives', 'tips']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResults({})
    setCurrentStep('brand')

    for (const step of steps) {
      try {
        const response = await fetch('/api/analyze-shampoo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, step }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to get recommendation')
        }

        setResults(prev => {
          const newResults = { ...prev }
          switch (step) {
            case 'brand':
              newResults.brand = result.response
              break
            case 'reason':
              newResults.reason = result.response
              break
            case 'price':
              newResults.price = result.response
              break
            case 'ingredients':
              newResults.ingredients = result.response.split(',').map((item: string) => item.trim())
              break
            case 'alternatives':
              newResults.alternatives = result.response.split(',').map((item: string) => item.trim())
              break
            case 'tips':
              newResults.tips = result.response.split('\n').map((item: string) => item.trim().replace(/^\d+\.\s*/, ''))
              break
          }
          return newResults
        })

        setCurrentStep(steps[steps.indexOf(step) + 1] as Step)
      } catch (err) {
        setError(err.message || 'Failed to get recommendation. Please try again.')
        console.error('Error:', err)
        break
      }
    }

    setLoading(false)
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSliderChange = (value: number[]) => {
    setFormData({ ...formData, hairLength: value[0] })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, isColorTreated: checked })
  }

  const handleConcernChange = (concern: string) => {
    setFormData(prevData => ({
      ...prevData,
      hairConcerns: prevData.hairConcerns.includes(concern)
        ? prevData.hairConcerns.filter(c => c !== concern)
        : [...prevData.hairConcerns, concern]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="hairType" className="text-teal-700">Hair Type</Label>
          <Select onValueChange={handleSelectChange('hairType')} required>
            <SelectTrigger className="border-teal-300 focus:border-teal-500">
              <SelectValue placeholder="Select hair type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="straight">Straight</SelectItem>
              <SelectItem value="wavy">Wavy</SelectItem>
              <SelectItem value="curly">Curly</SelectItem>
              <SelectItem value="coily">Coily</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="scalpType" className="text-teal-700">Scalp Type</Label>
          <Select onValueChange={handleSelectChange('scalpType')} required>
            <SelectTrigger className="border-teal-300 focus:border-teal-500">
              <SelectValue placeholder="Select scalp type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dry">Dry</SelectItem>
              <SelectItem value="oily">Oily</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="combination">Combination</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="text-teal-700">Hair Length</Label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[formData.hairLength]}
          onValueChange={handleSliderChange}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-teal-600 mt-1">
          <span>Short</span>
          <span>Medium</span>
          <span>Long</span>
        </div>
      </div>
      <div>
        <Label className="text-teal-700">Hair Concerns (Select all that apply)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['Dryness', 'Frizz', 'Dandruff', 'Oiliness', 'Hair Loss', 'Split Ends'].map((concern) => (
            <div key={concern} className="flex items-center space-x-2">
              <Checkbox 
                id={concern} 
                checked={formData.hairConcerns.includes(concern)}
                onCheckedChange={() => handleConcernChange(concern)}
              />
              <label htmlFor={concern} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{concern}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="color-treated" checked={formData.isColorTreated} onCheckedChange={handleSwitchChange} />
        <Label htmlFor="color-treated" className="text-teal-700">Color-treated hair</Label>
      </div>
      <div>
        <Label htmlFor="hairWashFrequency" className="text-teal-700">Hair Wash Frequency</Label>
        <Select onValueChange={handleSelectChange('hairWashFrequency')} required>
          <SelectTrigger className="border-teal-300 focus:border-teal-500">
            <SelectValue placeholder="Select wash frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="every_other_day">Every Other Day</SelectItem>
            <SelectItem value="twice_a_week">Twice a Week</SelectItem>
            <SelectItem value="once_a_week">Once a Week</SelectItem>
            <SelectItem value="less_than_once_a_week">Less than Once a Week</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="preferredFragrance" className="text-teal-700">Preferred Fragrance</Label>
        <Select onValueChange={handleSelectChange('preferredFragrance')} required>
          <SelectTrigger className="border-teal-300 focus:border-teal-500">
            <SelectValue placeholder="Select preferred fragrance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="floral">Floral</SelectItem>
            <SelectItem value="fruity">Fruity</SelectItem>
            <SelectItem value="herbal">Herbal</SelectItem>
            <SelectItem value="fresh">Fresh</SelectItem>
            <SelectItem value="unscented">Unscented</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {error && (
        <div className="text-red-600 text-sm mt-2">
          {error}
        </div>
      )}
      <Button 
        type="submit" 
        className="w-full bg-teal-600 hover:bg-teal-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {`Finding Perfect Shampoo (${currentStep})...`}
          </>
        ) : (
          'Get Recommendation'
        )}
      </Button>
      {Object.keys(results).length > 0 && <ResultsDisplay results={results} />}
    </form>
  )
}

