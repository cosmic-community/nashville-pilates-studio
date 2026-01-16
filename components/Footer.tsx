import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-olive-800 text-white py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-3xl italic mb-4 block">
              Aligna
            </Link>
            <p className="text-white/70 max-w-md">
              We believe in the art of mindful movement. Our studio offers a serene space where body and mind come into harmony through graceful, intentional practice.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/classes" className="text-white/70 hover:text-white transition-colors">
                Classes
              </Link>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-white/70">
              <span>+1 (800) 456-7890</span>
              <span>hello@aligna.studio</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/50 text-sm">
          © {currentYear} Aligna Pilates Studio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}