'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import ResultsDisplay from './ResultsDisplay';

type Step = 'brand' | 'reason' | 'price' | 'ingredients' | 'alternatives' | 'tips';

interface FormData {
  hairType: string;
  scalpType: string;
  hairLength: number;
  hairConcerns: string[];
  isColorTreated: boolean;
  hairWashFrequency: string;
  preferredFragrance: string;
}

interface Results {
  brand?: string;
  reason?: string;
  price?: string;
  ingredients?: string[];
  alternatives?: string[];
  tips?: string[];
}

export default function ShampooForm() {
  const [formData, setFormData] = useState<FormData>({
    hairType: '',
    scalpType: '',
    hairLength: 50,
    hairConcerns: [],
    isColorTreated: false,
    hairWashFrequency: '',
    preferredFragrance: '',
  });

  const [results, setResults] = useState<Results>({});
  const [currentStep, setCurrentStep] = useState<Step>('brand');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const steps: Step[] = ['brand', 'reason', 'price', 'ingredients', 'alternatives', 'tips'];

  const handleChange = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleHairConcern = (concern: string) => {
    setFormData((prev) => ({
      ...prev,
      hairConcerns: prev.hairConcerns.includes(concern)
        ? prev.hairConcerns.filter((item) => item !== concern)
        : [...prev.hairConcerns, concern],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults({});
    setCurrentStep('brand');

    for (const step of steps) {
      try {
        const response = await fetch('/api/analyze-shampoo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, step }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || `Error fetching data for ${step}`);
        }

        setResults((prev) => ({
          ...prev,
          [step]: step === 'ingredients' || step === 'alternatives'
            ? result.response.split(',').map((item: string) => item.trim())
            : result.response,
        }));

        setCurrentStep(steps[steps.indexOf(step) + 1] as Step);
      } catch (err) {
        // Safely narrow down the error type
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
        break;
      }
      
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="hairType">Hair Type</Label>
          <Select onValueChange={(value) => handleChange('hairType', value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select hair type" />
            </SelectTrigger>
            <SelectContent>
              {['Straight', 'Wavy', 'Curly', 'Coily'].map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="scalpType">Scalp Type</Label>
          <Select onValueChange={(value) => handleChange('scalpType', value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select scalp type" />
            </SelectTrigger>
            <SelectContent>
              {['Dry', 'Oily', 'Normal', 'Combination'].map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Hair Length</Label>
        <Slider
          min={0}
          max={100}
          value={[formData.hairLength]}
          onValueChange={(value) => handleChange('hairLength', value[0])}
        />
      </div>
      <div>
        <Label>Hair Concerns</Label>
        <div className="grid grid-cols-2 gap-2">
          {['Dryness', 'Frizz', 'Dandruff', 'Oiliness', 'Hair Loss', 'Split Ends'].map((concern) => (
            <div key={concern} className="flex items-center space-x-2">
              <Checkbox
                id={concern}
                checked={formData.hairConcerns.includes(concern)}
                onCheckedChange={() => toggleHairConcern(concern)}
              />
              <Label htmlFor={concern}>{concern}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="colorTreated"
          checked={formData.isColorTreated}
          onCheckedChange={(value) => handleChange('isColorTreated', value)}
        />
        <Label htmlFor="colorTreated">Color-treated Hair</Label>
      </div>
      <div>
        <Label>Hair Wash Frequency</Label>
        <Select onValueChange={(value) => handleChange('hairWashFrequency', value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select wash frequency" />
          </SelectTrigger>
          <SelectContent>
            {['Daily', 'Every Other Day', 'Twice a Week', 'Once a Week', 'Less than Once a Week'].map((freq) => (
              <SelectItem key={freq} value={freq.replace(/\s+/g, '_').toLowerCase()}>
                {freq}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Preferred Fragrance</Label>
        <Select onValueChange={(value) => handleChange('preferredFragrance', value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select preferred fragrance" />
          </SelectTrigger>
          <SelectContent>
            {['Floral', 'Fruity', 'Herbal', 'Fresh', 'Unscented'].map((fragrance) => (
              <SelectItem key={fragrance} value={fragrance.toLowerCase()}>
                {fragrance}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing ({currentStep})...
          </>
        ) : (
          'Get Recommendation'
        )}
      </Button>
      {Object.keys(results).length > 0 && <ResultsDisplay results={results} />}
    </form>
  );
}
