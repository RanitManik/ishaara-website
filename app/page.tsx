import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <VideoSection />
      </main>
    </div>
  )
}
