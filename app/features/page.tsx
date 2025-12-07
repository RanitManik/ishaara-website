import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Eye, Volume2, Users, Smartphone, Shield, Clock, Brain, Camera, Globe, Heart } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Recognition",
      description: "Advanced machine learning algorithms trained specifically on Indian Sign Language gestures",
      badge: "Core Feature",
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Instant conversion from sign language to audio with minimal latency for natural conversations",
      badge: "Lightning Fast",
    },
    {
      icon: Eye,
      title: "Precision Accuracy",
      description: "95% accuracy rate in gesture recognition, continuously improving with community feedback",
      badge: "Highly Accurate",
    },
    {
      icon: Volume2,
      title: "Natural Audio Output",
      description: "Clear, natural-sounding voice synthesis in multiple Indian languages and accents",
      badge: "Multi-Language",
    },
  ]

  const additionalFeatures = [
    {
      icon: Camera,
      title: "Advanced Camera Integration",
      description: "Works with any device camera, optimized for various lighting conditions and angles",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Support",
      description: "Available on Android and iOS, with consistent performance across all devices",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "All processing happens locally on your device - your conversations stay private",
    },
    {
      icon: Clock,
      title: "Offline Capability",
      description: "Core features work without internet connection for uninterrupted communication",
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Learn from a growing database of signs contributed by the deaf community",
    },
    {
      icon: Globe,
      title: "Regional Variations",
      description: "Supports regional variations of Indian Sign Language from different states",
    },
  ]

  const communityFeatures = [
    {
      title: "Sign Contribution",
      description: "Help expand our database by contributing new signs and gestures",
      icon: Heart,
    },
    {
      title: "Community Forum",
      description: "Connect with other users, share experiences, and get support",
      icon: Users,
    },
    {
      title: "Learning Resources",
      description: "Access tutorials, practice sessions, and educational content",
      icon: Brain,
    },
  ]

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              <span className="text-foreground">Powerful Features for</span>
              <br />
              <span className="text-primary">Seamless Communication</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover how Ishaara's advanced AI technology and community-driven approach makes sign language
              communication effortless and accessible.
            </p>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Core Features</h2>
              <p className="text-xl text-muted-foreground">The technology that powers seamless communication</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/20 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-20 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Advanced Capabilities</h2>
              <p className="text-xl text-muted-foreground">
                Everything you need for comprehensive sign language support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Community-Driven Innovation</h2>
              <p className="text-xl text-muted-foreground">Built by the community, for the community</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {communityFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Performance That Matters</h2>
              <p className="text-xl text-muted-foreground">Real metrics from real users</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Recognition Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">&lt;100ms</div>
                <div className="text-muted-foreground">Processing Latency</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Signs Supported</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                <div className="text-muted-foreground">Offline Capability</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Experience These Features Today</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Download Ishaara and discover how AI can transform sign language communication
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/download">Download Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/20 hover:bg-primary/10 hover:text-foreground bg-transparent"
              >
                <Link href="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
