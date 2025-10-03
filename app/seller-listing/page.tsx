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
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!imageUrl.trim() || !description.trim()) {
      setError('Please provide both image URL and description')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('https://hsi-battle.onrender.com/processing-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
          text: description
        })
      })

      if (!res.ok) {
        throw new Error('Failed to process request')
      }

      const data: ApiResponse = await res.json()
      setResponse(data)
    } catch (err) {
      setError('Failed to process your request. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setImageUrl('')
    setDescription('')
    setResponse(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl ml-0 pl-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Create Product Listing</h1>
        
        {!response ? (
          <Card className="p-6 shadow-lg border border-gray-200 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium mb-2 text-gray-700">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
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
                disabled={isLoading}
                className="w-full py-3 text-lg font-semibold"
              >
                {isLoading ? 'Processing...' : 'Create Listing'}
              </Button>
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
              {/* Image Section */}
              <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Product Image</h3>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
                  <Image 
                    src={imageUrl} 
                    alt="Product"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => {
                      // Handle error by showing placeholder
                    }}
                  />
                </div>
              </Card>

              {/* Content Section */}
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

            {/* Additional Information */}
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
