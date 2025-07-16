"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { Upload, X, Download, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export default function UploadPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      setProcessedImage(null)
      setProgress(0)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const processImage = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('image', uploadedFile)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error('Failed to process image')
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      setProcessedImage(imageUrl)
      setProgress(100)

      toast({
        title: "Success!",
        description: "Background removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a')
      link.href = processedImage
      link.download = `processed-${uploadedFile?.name || 'image'}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setProcessedImage(null)
    setProgress(0)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload & Process</h1>
        <p className="text-muted-foreground">
          Upload an image to remove its background using AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>
              Drag and drop your image here or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
                ${uploadedFile ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}
              `}
            >
              <input {...getInputProps()} />
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src={URL.createObjectURL(uploadedFile)}
                      alt="Uploaded image"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button variant="outline" onClick={resetUpload}>
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">
                      {isDragActive ? 'Drop the image here' : 'Upload an image'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports: JPG, PNG, WEBP (max 10MB)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {uploadedFile && !processedImage && (
              <div className="mt-4">
                <Button 
                  onClick={processImage} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Remove Background
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Processing Status & Result */}
        <Card>
          <CardHeader>
            <CardTitle>Processing Status</CardTitle>
            <CardDescription>
              Track the progress of your image processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isProcessing && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Processing image...</p>
                  <Progress value={progress} className="w-full" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {progress}% complete
                  </p>
                </div>
              </div>
            )}

            {processedImage && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-green-600">
                    ✓ Processing complete!
                  </p>
                </div>
                
                <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={processedImage}
                    alt="Processed image"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={downloadImage} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" onClick={resetUpload}>
                    <X className="w-4 h-4 mr-2" />
                    Process Another
                  </Button>
                </div>
              </div>
            )}

            {!isProcessing && !processedImage && (
              <div className="text-center py-8 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Upload an image to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}