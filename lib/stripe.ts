import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

// Changed: Remove explicit apiVersion to let the SDK use its default compatible version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Helper to format amount for Stripe (converts dollars to cents)
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100)
}

// Helper to format amount from Stripe (converts cents to dollars)
export function formatAmountFromStripe(amount: number): number {
  return amount / 100
}