import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Target, Lightbulb, Shield, Zap, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              <span className="text-foreground">Empowering Communication</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Through Innovation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-semibold">
                Ishaara
              </span>{" "}
              was born from a simple belief: everyone deserves to communicate freely. We're bridging the gap between the
              hearing and deaf communities with cutting-edge AI technology.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To create an inclusive world where sign language is universally understood and accessible through
                    innovative AI technology, empowering the deaf and hearing-impaired community with seamless
                    communication tools.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    A future where communication barriers no longer exist, where every gesture is understood, and where
                    technology serves as a bridge connecting all communities in meaningful dialogue.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center bg-card border-border hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Inclusivity</h3>
                  <p className="text-sm text-muted-foreground">
                    Building technology that welcomes and serves everyone, regardless of their abilities.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-card border-border hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    Pushing the boundaries of AI and machine learning to solve real-world problems.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-card border-border hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Fostering connections and collaboration between diverse communities.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-card border-border hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Protecting user data and ensuring secure, trustworthy interactions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Potential Impacts</h2>
              <p className="text-xl text-muted-foreground">Performance That Matters - Real metrics from real users</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-muted-foreground">Recognition Accuracy</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">&lt;100ms</div>
                  <div className="text-muted-foreground">Processing Latency</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">19+</div>
                  <div className="text-muted-foreground">Signs Supported</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                  <div className="text-muted-foreground">Offline Capability</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Join Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of the movement to make communication accessible for everyone. Download{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-semibold">
                Ishaara
              </span>{" "}
              today and help us build a more inclusive world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Download App
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-foreground bg-transparent">
                Join Community
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
