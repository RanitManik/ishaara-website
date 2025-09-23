"use client"

import { Button } from "@/components/ui/button"
import { Play, Download, Users, Zap, Hand } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const phrases = [
    "Bridging Communication with AI-Powered Sign Language",
    "Connecting Worlds through AI Sign Language",
    "Breaking Barriers with AI-Powered Sign Language",
  ]

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentPhrase.length) {
            setDisplayText(currentPhrase.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentPhraseIndex, phrases])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-primary/5" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15),transparent_50%)]" />

        {/* Floating animated elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse opacity-60" />
        <div
          className="absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full animate-bounce opacity-40"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-3 h-3 bg-primary/30 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-60 right-10 w-5 h-5 bg-accent/25 rounded-full animate-pulse opacity-45"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-60 left-1/3 w-2 h-2 bg-primary/35 rounded-full animate-bounce opacity-30"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-80 right-1/3 w-4 h-4 bg-accent/20 rounded-full animate-ping opacity-35"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h1 id="hero-heading" className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Ishaara
            </span>
            <br />
            <span className="text-foreground text-2xl sm:text-3xl lg:text-4xl min-h-[1.2em] block">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-semibold">
              Ishaara
            </span>{" "}
            uses advanced AI to convert Indian Sign Language gestures into audio in real-time, empowering the deaf and
            hard-of-hearing community with seamless communication.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 min-w-[200px] focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Link href="/download" className="flex items-center gap-2">
              <Download className="w-5 h-5" aria-hidden="true" />
              Download App
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 min-w-[200px] border-primary/20 hover:bg-primary/10 bg-transparent focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Link href="#demo-video" className="flex items-center gap-2">
              <Play className="w-5 h-5" aria-hidden="true" />
              Watch Demo
            </Link>
          </Button>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          role="region"
          aria-label="App statistics"
        >
          <div className="text-center">
            <div
              className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3"
              aria-hidden="true"
            >
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary" aria-label="95 percent accuracy rate">
              95%
            </div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>

          <div className="text-center">
            <div
              className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-3"
              aria-hidden="true"
            >
              <Hand className="w-6 h-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent" aria-label="19 plus signs recognized">
              19+
            </div>
            <div className="text-sm text-muted-foreground">Signs Recognized</div>
          </div>

          <div className="text-center">
            <div
              className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3"
              aria-hidden="true"
            >
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">Privacy First</div>
            <div className="text-sm text-muted-foreground">Easy to Use • Real Time</div>
          </div>
        </div>
      </div>
    </section>
  )
}
