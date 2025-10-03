'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Header from '@/components/ui/header'

interface ApiResponse {
  trace_id: string
  title: string
  description: string
  slogan: string
  hashtags: string[]
  image_description: string
  video_description: string
}

export default function SellerListingPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState('')

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file)
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
    setError('')
    
    try {
      setIsUploading(true)
      const uploadedUrl = await uploadFileToMongoDB(file)
      setUploadedImageUrl(uploadedUrl)
    } catch (err) {
      setError('Failed to upload image. Please try again.')
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  const uploadFileToMongoDB = async (file: File): Promise<string> => {
    console.log('Uploading file:', file.name, 'Size:', file.size)
    
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    console.log('Upload response status:', response.status)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      console.error('Upload error:', errorData)
      throw new Error(errorData.error || 'Failed to upload image')
    }
    
    const data = await response.json()
    console.log('Upload success:', data)
    return `/api/files/${data.fileId}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Enhanced validation
    if (!selectedFile && !uploadedImageUrl) {
      setError('Please select an image file')
      return
    }
    
    if (!description.trim()) {
      setError('Please provide a product description')
      return
    }
    
    if (!uploadedImageUrl) {
      setError('Please wait for the image to finish uploading')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Convert relative URL to absolute URL for external API
      const absoluteImageUrl = uploadedImageUrl.startsWith('/') 
        ? `${window.location.origin}${uploadedImageUrl}` 
        : uploadedImageUrl

      console.log('Submitting data:', {
        image_url: absoluteImageUrl,
        text: description
      })

      const res = await fetch('https://hsi-battle.onrender.com/processing-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: absoluteImageUrl,
          text: description
        })
      })

      console.log('API Response status:', res.status)

      if (!res.ok) {
        const errorText = await res.text()
        console.error('API Error:', errorText)
        throw new Error(`Request failed with status ${res.status}`)
      }

      const data: ApiResponse = await res.json()
      console.log('API Response data:', data)
      setResponse(data)
    } catch (err) {
      console.error('Submit error:', err)
      setError('Failed to process your request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedFile(null)
    setImagePreview('')
    setUploadedImageUrl('')
    setIsUploading(false)
    setDescription('')
    setResponse(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-full ml-0 pl-4 pr-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Create Product Listing</h1>
        
        {!response ? (
          <Card className="p-6 shadow-lg border border-gray-200 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Product Image
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  {isUploading ? (
                    <div className="space-y-4">
                      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-sm text-gray-600">Uploading image...</p>
                    </div>
                  ) : imagePreview ? (
                    <div className="space-y-4">
                      <div className="relative w-32 h-32 mx-auto">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover rounded-lg"
                          sizes="128px"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{selectedFile?.name}</p>
                      {uploadedImageUrl ? (
                        <p className="text-xs text-green-600">✓ Uploaded successfully</p>
                      ) : (
                        <p className="text-xs text-blue-600">Click to change image</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-gray-400">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Select an image file to upload</p>
                        <p className="text-xs text-gray-500 mt-1">Max size: 5MB • PNG, JPG, JPEG</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileSelect(file)
                    }
                  }}
                  className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-700">
                  Product Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product in detail. Include features, benefits, and what makes it special..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
              )}

              <Button 
                type="submit" 
                disabled={isLoading || isUploading || (!uploadedImageUrl && !selectedFile) || !description.trim()}
                className="w-full py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Processing...</span>
                  </div>
                ) : isUploading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  'Create Listing'
                )}
              </Button>
              
              {/* Helper text */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  {!selectedFile ? 'Select an image to get started' : 
                   !uploadedImageUrl ? 'Uploading your image...' :
                   !description.trim() ? 'Add a description to continue' :
                   isLoading ? 'Processing your request...' :
                   'Ready to create your listing!'}
                </p>
              </div>
              
              {/* Progress indicator */}
              {(isUploading || isLoading) && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: isUploading ? '50%' : '100%'}}></div>
                </div>
              )}
            </form>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Your Product Listing</h2>
              <Button onClick={resetForm} variant="outline" className="px-6 py-2">
                Create New Listing
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Product Image</h3>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
                  <Image 
                    src={uploadedImageUrl || imagePreview} 
                    alt="Product"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Card>

              <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Title</h3>
                    <p className="text-xl font-bold text-gray-900">{response.title}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-800 leading-relaxed">{response.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Slogan</h3>
                    <p className="text-blue-600 font-medium italic">{response.slogan}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Hashtags</h3>
                    <div className="flex flex-wrap gap-2">
                      {response.hashtags.map((hashtag, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200"
                        >
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Image Description</h3>
                <p className="text-gray-600 leading-relaxed">{response.image_description}</p>
              </Card>
              <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Video Description</h3>
                <p className="text-gray-600 leading-relaxed">{response.video_description}</p>
              </Card>
            </div>

            <Card className="p-4 bg-gray-50 shadow border border-gray-200">
              <p className="text-sm text-gray-500">
                <strong>Trace ID:</strong> {response.trace_id}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
