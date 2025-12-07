"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/features", label: "Features" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/community", label: "Community" },
    { href: "/support", label: "Support" },
  ]

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden" aria-hidden="true">
              <Image
                src="/logo.png"
                alt="Ishaara Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent tracking-wide">
              Ishaara
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-2 py-1"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <Link href="/download">Download App</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="focus:ring-2 focus:ring-ring"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <Link href="/download">Download App</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
