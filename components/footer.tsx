import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo.png"
                alt="Ishaara Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Ishaara
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering the deaf and hard-of-hearing community through AI-powered sign language recognition technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/support#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-muted-foreground hover:text-foreground transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <a
                  href="mailto:ishaaratech@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-semibold">
              Ishaara
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
