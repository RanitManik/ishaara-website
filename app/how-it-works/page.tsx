import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Brain, Volume2, Download, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Download & Setup",
      description: "Download Ishaara from the app store and complete the quick setup process",
      icon: Download,
      details: [
        "Available on Android and iOS",
        "Quick 2-minute setup",
        "No account required to start",
        "Works offline after initial setup",
      ],
    },
    {
      number: "02",
      title: "Camera Recognition",
      description: "Point your device camera at sign language gestures for instant recognition",
      icon: Camera,
      details: [
        "Works in various lighting conditions",
        "Supports multiple camera angles",
        "Real-time gesture tracking",
        "Privacy-first local processing",
      ],
    },
    {
      number: "03",
      title: "AI Processing",
      description: "Advanced AI algorithms analyze and interpret the sign language gestures",
      icon: Brain,
      details: [
        "95% accuracy recognition rate",
        "Trained on Indian Sign Language",
        "Continuous learning from community",
        "Sub-100ms processing time",
      ],
    },
    {
      number: "04",
      title: "Audio Output",
      description: "Clear, natural audio output in your preferred language and voice",
      icon: Volume2,
      details: [
        "Multiple Indian languages supported",
        "Natural voice synthesis",
        "Adjustable speech speed",
        "Clear pronunciation",
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              <span className="text-foreground">How</span>
              <span className="text-primary"> Ishaara </span>
              <span className="text-foreground">Works</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover the simple 4-step process that transforms sign language gestures into clear audio using advanced
              AI technology.
            </p>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">See It In Action</h2>
              <p className="text-xl text-muted-foreground">
                Watch how Ishaara converts sign language to audio in real-time
              </p>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted border border-border">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="How Ishaara Works - Complete Demo"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section className="py-20 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Simple 4-Step Process</h2>
              <p className="text-xl text-muted-foreground">From gesture to audio in seconds</p>
            </div>

            <div className="space-y-16">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="outline"
                        className="text-2xl font-bold px-4 py-2 bg-primary/10 text-primary border-primary/20"
                      >
                        {step.number}
                      </Badge>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{step.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="flex-1">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                      <img
                        src={`/step-${step.number}-demonstration.jpg?height=400&width=400&query=step ${step.number} ${step.title.toLowerCase()} demonstration for sign language app`}
                        alt={`Step ${step.number}: ${step.title}`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Technical Excellence</h2>
              <p className="text-xl text-muted-foreground">The technology that makes it all possible</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Machine Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Deep neural networks trained on thousands of Indian Sign Language gestures for maximum accuracy.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-accent" />
                    Computer Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Advanced computer vision algorithms that work in real-time with any device camera.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-primary" />
                    Speech Synthesis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Natural language processing and speech synthesis for clear, understandable audio output.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Download Ishaara today and experience seamless sign language communication
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/download" className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/20 hover:bg-primary/10 bg-transparent"
              >
                <Link href="/features" className="flex items-center gap-2">
                  Explore Features
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
