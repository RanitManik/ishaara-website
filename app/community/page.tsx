"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  MessageSquare,
  Heart,
  Award,
  Plus,
  BookOpen,
  Star,
  Calendar,
  User,
  FileText,
  Video,
  ImageIcon,
  Languages,
  Upload,
  X,
  CheckCircle,
  Sparkles,
} from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { submitContribution } from "@/lib/api"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import dynamic from "next/dynamic"

const Confetti = dynamic(() => import("react-confetti"), { ssr: false })

const contributionSchema = z.object({
  sign_name: z.string().min(1, "Sign name is required"),
  language: z.string().min(1, "Language is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  regional_variation: z.string().optional(),
  contributor_name: z.string().min(1, "Contributor name is required"),
  contributor_email: z.string().email("Invalid email address"),
})

type ContributionForm = z.infer<typeof contributionSchema>

export default function CommunityPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    file: File;
    url?: string;
    public_id?: string;
    file_record_id?: string;
    type: 'image' | 'video' | 'csv';
    uploading: boolean;
    progress: number;
    error?: string;
  }>>([])

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm<ContributionForm>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      regional_variation: '',
    },
  })

  // Reset form and clear uploaded files when success modal is closed
  useEffect(() => {
    if (!showSuccessModal) {
      reset()
      setUploadedFiles([])
    }
  }, [showSuccessModal, reset])

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).map(file => {
      let type: 'image' | 'video' | 'csv' = 'csv'
      if (file.type.startsWith('image/')) type = 'image'
      else if (file.type.startsWith('video/')) type = 'video'

      return {
        file,
        type,
        uploading: false,
        progress: 0,
      }
    })

    setUploadedFiles(prev => [...prev, ...newFiles])

    // Upload files to Cloudinary
    for (const fileItem of newFiles) {
      await uploadFile(fileItem)
    }
  }

  const uploadFile = async (fileItem: typeof uploadedFiles[0]) => {
    const index = uploadedFiles.findIndex(f => f.file === fileItem.file)
    if (index === -1) return

    // Update uploading status and reset progress
    setUploadedFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, uploading: true, progress: 0, error: undefined } : f
    ))

    try {
      const formData = new FormData()
      formData.append('file', fileItem.file)
      formData.append('uploaded_by', watch('contributor_email') || 'anonymous')

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest()

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          setUploadedFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, progress } : f
          ))
        }
      }

      const response = await new Promise<{ ok: boolean; json: () => Promise<any>; status: number }>((resolve, reject) => {
        xhr.onload = () => {
          resolve({
            ok: xhr.status >= 200 && xhr.status < 300,
            json: () => Promise.resolve(JSON.parse(xhr.responseText)),
            status: xhr.status
          })
        }
        xhr.onerror = () => reject(new Error('Upload failed'))
        xhr.open('POST', '/api/upload')
        xhr.send(formData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }))
        throw new Error(errorData.error || 'Upload failed')
      }

      const result = await response.json()

      // Update file with upload result
      setUploadedFiles(prev => prev.map((f, i) => 
        i === index ? { 
          ...f, 
          uploading: false, 
          progress: 100,
          url: result.url, 
          public_id: result.public_id, 
          file_record_id: result.file_record_id 
        } : f
      ))

      if (result.file_record_id) {
        toast.success(`${fileItem.file.name} uploaded successfully`)
      } else {
        toast.warning(`${fileItem.file.name} uploaded to cloud but database record failed`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      setUploadedFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, uploading: false, error: errorMessage } : f
      ))
      toast.error(`Failed to upload ${fileItem.file.name}: ${errorMessage}`)
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ContributionForm) => {
    setIsSubmitting(true)
    try {
      // Prepare contribution data with file URLs
      const contributionData = {
        ...data,
        files: uploadedFiles
          .filter(f => f.url) // Include files that have been uploaded to Cloudinary
          .map(f => ({
            url: f.url!,
            public_id: f.public_id!,
            type: f.type,
            name: f.file.name,
            file_record_id: f.file_record_id, // This might be undefined if DB record failed
          }))
      }

      await submitContribution(contributionData)
      toast.success("Contribution submitted successfully! Thank you for helping improve Ishaara.")
      setShowSuccessModal(true)
      // Reset form and clear uploaded files after a short delay to ensure modal is rendered
      setTimeout(() => {
        reset()
        setUploadedFiles([])
      }, 100)
    } catch (error) {
      toast.error("Failed to submit contribution. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Contribution Submitted!
            </DialogTitle>
            <DialogDescription className="text-center">
              Thank you for helping improve Ishaara
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4 py-6">
            {/* Confetti Animation */}
            <div className="relative w-full h-32 flex items-center justify-center">
              {typeof window !== 'undefined' && (
                <Confetti
                  width={300}
                  height={200}
                  recycle={false}
                  numberOfPieces={100}
                  gravity={0.3}
                />
              )}
            </div>
            
            {/* Success Content */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Thank You for Your Contribution!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Your sign contribution will help make Ishaara better for the deaf and hard-of-hearing community.
                  We appreciate your support in building a more inclusive world.
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Community Hero</span>
              </div>
            </div>
            
            <Button 
              onClick={() => {
                setShowSuccessModal(false)
                reset()
                setUploadedFiles([])
              }}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Continue Contributing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            <span className="text-foreground">Join the</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Ishaara Community
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Connect with fellow users, contribute to our growing database of signs, and help make communication
            accessible for everyone.
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center bg-card border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-muted-foreground">Signs Contributed</div>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Languages className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-muted-foreground">Languages Supported</div>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent mb-2">95%</div>
                <div className="text-muted-foreground">Recognition Accuracy</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contribution Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Contribute to Our Database</h2>
            <p className="text-xl text-muted-foreground">Help us expand Ishaara's recognition capabilities</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Contribution Form */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Submit New Sign
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Sign Name</label>
                    <Controller
                      name="sign_name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter the name of the sign"
                          className="bg-background border-border"
                        />
                      )}
                    />
                    {errors.sign_name && (
                      <p className="text-sm text-red-500 mt-1">{errors.sign_name.message}</p>
                    )}
                  </div>

                  <div className="flex gap-2 justify-between">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-foreground mb-2 block">Language</label>
                      <Controller
                        name="language"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="bg-background border-border w-full">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="isl">Indian Sign Language (ISL)</SelectItem>
                              <SelectItem value="asl">American Sign Language (ASL)</SelectItem>
                              <SelectItem value="bsl">British Sign Language (BSL)</SelectItem>
                              <SelectItem value="regional">Regional Variation</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.language && (
                        <p className="text-sm text-red-500 mt-1">{errors.language.message}</p>
                      )}
                    </div>

                    <div className="flex-1">
                      <label className="text-sm font-medium text-foreground mb-2 block">Gesture Category</label>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="bg-background border-border w-full">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="alphabet">Alphabet</SelectItem>
                              <SelectItem value="numbers">Numbers</SelectItem>
                              <SelectItem value="common-words">Common Words</SelectItem>
                              <SelectItem value="emotions">Emotions</SelectItem>
                              <SelectItem value="actions">Actions</SelectItem>
                              <SelectItem value="objects">Objects</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.category && (
                        <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Describe the gesture and its meaning"
                          className="bg-background border-border min-h-[100px]"
                        />
                      )}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Regional Variation</label>
                    <Controller
                      name="regional_variation"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="e.g., Maharashtra, Tamil Nadu"
                          className="bg-background border-border"
                        />
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Your Name</label>
                      <Controller
                        name="contributor_name"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Your full name"
                            className="bg-background border-border"
                          />
                        )}
                      />
                      {errors.contributor_name && (
                        <p className="text-sm text-red-500 mt-1">{errors.contributor_name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Your Email</label>
                      <Controller
                        name="contributor_email"
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
                      {errors.contributor_email && (
                        <p className="text-sm text-red-500 mt-1">{errors.contributor_email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-foreground">Upload Supporting Files (Optional)</h3>

                    {/* Unified File Upload */}
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground font-medium">Upload Images, Videos, or CSV Files</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Images (JPG, PNG, GIF), Videos (MP4, MOV, AVI), CSV files up to 50MB total
                      </p>
                      <input
                        type="file"
                        accept="image/*,video/*,.csv"
                        multiple
                        className="hidden"
                        id="file-upload"
                        onChange={(e) => handleFileSelect(e.target.files)}
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block mt-2 px-4 py-2 bg-primary/10 text-primary rounded-md cursor-pointer hover:bg-primary/20 transition-colors"
                      >
                        Choose Files
                      </label>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground">Uploaded Files:</h4>
                        {uploadedFiles.map((fileItem, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <div className="flex items-center gap-3 flex-1">
                              {fileItem.type === 'image' && <ImageIcon className="w-4 h-4 text-blue-500" />}
                              {fileItem.type === 'video' && <Video className="w-4 h-4 text-red-500" />}
                              {fileItem.type === 'csv' && <FileText className="w-4 h-4 text-green-500" />}
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-foreground font-medium">{fileItem.file.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                                  </span>
                                </div>
                                
                                {fileItem.uploading && (
                                  <div className="mt-2">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                      <span>Uploading...</span>
                                      <span>{fileItem.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${fileItem.progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                )}
                                
                                {fileItem.error && (
                                  <div className="mt-1 text-xs text-red-500">
                                    {fileItem.error}
                                  </div>
                                )}
                                
                                {fileItem.url && !fileItem.uploading && (
                                  <div className="mt-1 text-xs text-green-600 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Uploaded successfully
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="h-6 w-6 p-0 ml-2"
                              disabled={fileItem.uploading}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Contribution"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contribution Guidelines */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Contribution Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Record clear, well-lit videos showing the complete gesture from multiple angles
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Include high-quality images for reference</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Upload CSV data with gesture coordinates when available
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Include regional variations and language specifications
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Ensure you have permission to share the content</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-foreground">Recognition Program</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Top contributors receive special badges, early access to new features, and recognition in our
                    community hall of fame.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Languages className="w-5 h-5 text-accent" />
                    Supported Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Indian Sign Language</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span>American Sign Language</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>British Sign Language</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span>Regional Variations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Forum */}
      
    </div>
  )
}
