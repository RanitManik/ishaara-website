"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { HelpCircle, Mail, MessageCircle, Users, Clock, CheckCircle, Book, Sparkles } from "lucide-react"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { submitContact } from "@/lib/api"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import dynamic from "next/dynamic"

const Confetti = dynamic(() => import("react-confetti"), { ssr: false })

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactForm = z.infer<typeof contactSchema>

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  // Reset form when success modal is closed
  useEffect(() => {
    if (!showSuccessModal) {
      reset()
    }
  }, [showSuccessModal, reset])

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    try {
      await submitContact(data)
      toast.success("Message sent successfully! We'll get back to you soon.")
      setShowSuccessModal(true)
      // Reset form after a short delay to ensure modal is rendered
      setTimeout(() => {
        reset()
      }, 100)
    } catch (error) {
      console.error('Contact submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please check your connection and try again.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-lg border-0 bg-gradient-to-br from-background via-background to-card/50 backdrop-blur-xl shadow-2xl">
          <DialogHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-yellow-800" />
                </div>
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Message Sent Successfully! 🎉
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base">
              Thank you for reaching out to us
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-6 py-4">
            {/* Confetti Animation */}
            <div className="relative w-full h-40 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
              {typeof window !== 'undefined' && (
                <Confetti
                  width={350}
                  height={160}
                  recycle={false}
                  numberOfPieces={120}
                  gravity={0.2}
                  colors={['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444']}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent dark:from-black/10"></div>
            </div>
            
            {/* Success Content */}
            <div className="text-center space-y-4 w-full">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Your Message Has Been Received
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We've received your message and our support team will get back to you within 24 hours.
                  Your feedback helps us improve Ishaara for everyone in the deaf and hard-of-hearing community.
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-3 p-3 bg-muted/50 rounded-lg border border-border/50">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Response Time</p>
                  <p className="text-xs text-muted-foreground">Within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Questions?</span>
                <span className="font-medium text-primary">support@ishaara.app</span>
              </div>
            </div>
            
            <Button 
              onClick={() => {
                setShowSuccessModal(false)
                reset()
              }}
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Continue Exploring Ishaara
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Hero Section */}
      <section className="py-16 px-4 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance">We're Here to Help</h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 text-balance max-w-2xl mx-auto">
            Get support for Ishaara app, find answers to common questions, or connect with our community.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="accuracy" className="bg-background border border-border rounded-lg px-6">
              <AccordionTrigger className="text-foreground hover:text-primary text-left">
                How accurate is Ishaara's sign language recognition?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Ishaara achieves 99.8% accuracy in recognizing Indian Sign Language gestures. Our AI model has been
                trained on thousands of hours of ISL data and continuously improves with community feedback.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy" className="bg-background border border-border rounded-lg px-6">
              <AccordionTrigger className="text-foreground hover:text-primary text-left">
                Is my data safe and private?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, absolutely. All sign language processing happens directly on your device. Your gestures and
                personal data never leave your phone, ensuring complete privacy and security.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="devices" className="bg-background border border-border rounded-lg px-6">
              <AccordionTrigger className="text-foreground hover:text-primary text-left">
                Which devices are supported?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Ishaara works on iOS 14.0+ (iPhone 8 or newer) and Android 8.0+ devices with at least 3GB RAM. A
                camera is required for gesture recognition.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="offline" className="bg-background border border-border rounded-lg px-6">
              <AccordionTrigger className="text-foreground hover:text-primary text-left">
                Can I use Ishaara offline?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! Once downloaded, Ishaara works completely offline. The AI model is stored locally on your device,
                so you can use it anywhere without an internet connection.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contribute" className="bg-background border border-border rounded-lg px-6">
              <AccordionTrigger className="text-foreground hover:text-primary text-left">
                How can I contribute to improving Ishaara?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Join our community forum to provide feedback, report issues, or suggest new features. You can also
                participate in our data collection initiatives to help improve recognition accuracy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground">Send us a message and we'll get back to you within 24 hours.</p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Contact Support</CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out the form below and our team will assist you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Your name"
                          className="bg-background border-border"
                        />
                      )}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="your@email.com"
                          className="bg-background border-border"
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="How can we help?"
                        className="bg-background border-border"
                      />
                    )}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Describe your issue or question in detail..."
                        className="bg-background border-border min-h-[120px]"
                      />
                    )}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      {/* <section className="py-20 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Other Ways to Reach Us</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-2">support@ishaara.app</p>
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <Clock className="w-3 h-3 mr-1" />
                24h response
              </Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-2">Available in-app</p>
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <Clock className="w-3 h-3 mr-1" />9 AM - 6 PM IST
              </Badge>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Community</h3>
              <p className="text-muted-foreground mb-2">Join our forum</p>
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <Users className="w-3 h-3 mr-1" />
                5K+ members
              </Badge>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}
