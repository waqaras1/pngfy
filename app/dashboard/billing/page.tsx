import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Crown, Zap, Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    credits: '10',
    features: [
      '10 images per month',
      'Basic support',
      'Standard quality',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    credits: '1,000',
    features: [
      '1,000 images per month',
      'Priority support',
      'High quality processing',
      'Batch processing',
      'API access',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    credits: 'Unlimited',
    features: [
      'Unlimited images',
      '24/7 support',
      'Custom integrations',
      'Team management',
      'SLA guarantee',
    ],
    popular: false,
  },
]

const creditPacks = [
  { credits: 50, price: 9.99, savings: null },
  { credits: 100, price: 17.99, savings: '10%' },
  { credits: 250, price: 39.99, savings: '20%' },
  { credits: 500, price: 69.99, savings: '30%' },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and purchase additional credits.
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="w-5 h-5 mr-2" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Pro Plan</h3>
              <p className="text-muted-foreground">$29/month</p>
              <p className="text-sm text-muted-foreground mt-1">
                Next billing date: January 15, 2024
              </p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">Active</Badge>
              <div className="text-sm text-muted-foreground">
                750 credits remaining
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Credit Balance
          </CardTitle>
          <CardDescription>
            Purchase additional credits for one-time processing needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditPacks.map((pack) => (
              <Card key={pack.credits} className="relative">
                {pack.savings && (
                  <Badge className="absolute -top-2 -right-2 bg-green-600">
                    Save {pack.savings}
                  </Badge>
                )}
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold mb-2">{pack.credits}</div>
                  <div className="text-sm text-muted-foreground mb-2">credits</div>
                  <div className="text-xl font-semibold mb-3">${pack.price}</div>
                  <Button size="sm" className="w-full">
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Choose the plan that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-center">{plan.name}</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    {plan.credits} credits/month
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.name === 'Free' ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your past invoices and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Pro Plan - Monthly</p>
                <p className="text-sm text-muted-foreground">December 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$29.00</p>
                <Badge variant="secondary" className="text-xs">Paid</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Credit Pack - 100 credits</p>
                <p className="text-sm text-muted-foreground">December 10, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$17.99</p>
                <Badge variant="secondary" className="text-xs">Paid</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}