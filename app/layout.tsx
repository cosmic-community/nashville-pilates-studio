import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { CartProvider } from '@/components/CartProvider'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'Aligna Pilates Studio - Graceful Body Movement',
  description: 'We believe in the art of mindful movement. Our studio offers a serene space where body and mind come into harmony through graceful, intentional practice.',
  icons: {
    icon: {
      url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🧘</text></svg>",
      type: 'image/svg+xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="bg-cream-50">
        <CartProvider>
          <ScrollToTop />
          <Header />
          <main>{children}</main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </CartProvider>
      </body>
    </html>
  )
}