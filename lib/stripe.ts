import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Use the API version that matches the installed @types/stripe package
  apiVersion: '2023-10-16',
  typescript: true,
})