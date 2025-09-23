import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ishaara - AI Sign Language Recognition",
  description:
    "Convert Indian Sign Language gestures into audio in real-time using AI technology. Bridging communication gaps for the deaf and hard-of-hearing community.",
  generator: "v0.app",
  keywords: ["sign language", "AI", "accessibility", "Indian Sign Language", "deaf community", "real-time translation"],
  authors: [{ name: "Ishaara Team" }],
  creator: "Ishaara",
  publisher: "Ishaara",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#D4AF37",
  openGraph: {
    title: "Ishaara - AI Sign Language Recognition",
    description: "Convert Indian Sign Language gestures into audio in real-time using AI technology.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>

        <Navigation />

        <main id="main-content" role="main">
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
