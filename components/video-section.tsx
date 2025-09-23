import Link from "next/link"
import { Button } from "@/components/ui/button"

export function VideoSection() {
  return (
    <section id="demo-video" className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            See{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Ishaara
            </span>{" "}
            in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how our AI technology instantly converts sign language gestures into clear audio
          </p>
        </div>

        {/* Main Demo Video */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PLFjydPMg4DapfRTBMokl09Ht-fhMOAYf6"
              title="Indian Sign Language Tutorial Playlist"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Tutorial Playlist */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Learning Resources & Tutorials</h3>
          <p className="text-muted-foreground">
            Master Indian Sign Language with tutorials from Indian Sign Language Research and Training Centre
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Indian Sign Language Basics", id: "l7GQ-fR-DsA" },
            { title: "Common Signs and Gestures", id: "videoseries?list=PLFjydPMg4DapfRTBMokl09Ht-fhMOAYf6" },
            { title: "Advanced ISL Communication", id: "videoseries?list=PLFjydPMg4DapfRTBMokl09Ht-fhMOAYf6" },
          ].map((video, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden border border-border">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-foreground">{video.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">Indian Sign Language Research and Training Centre</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/10 bg-transparent">
            <Link href="https://www.youtube.com/@ISLRTC" target="_blank" rel="noopener noreferrer">
              View Full Channel
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
