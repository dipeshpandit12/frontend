'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Image from 'next/image'

interface MediaItem {
  type: 'image' | 'video'
  src: string
  alt?: string
}

export default function ProductPreviewPage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  // Sample media items - in a real app, these would come from props or API
  const mediaItems: MediaItem[] = [
    {
      type: 'image', 
      src: '/demo1.png',
      alt: 'Texas State Merchandise - Shirt Back'
    },
    {
      type: 'video',
      src: '/demo.mp4',
      alt: 'Texas State Merchandise Video Demo'
    }
  ]

  const productData = {
    title: "The official texas state shirt",
    description: "New Texas State merch is here! Shop the freshest Maroon & Gold apperel. Don't wait show your BObcat pride now!",
    hashtags: "#TXST, #EatEmUpCats, #TexasStateMerch",
    slogan: "Eat 'Em Up, Look Sharp."
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length)
    setIsVideoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
    setIsVideoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsVideoPlaying(false)
  }

  const toggleVideoPlay = () => {
    const video = document.querySelector('video')
    if (video) {
      if (isVideoPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const handleApprove = () => {
    router.push('/seller-listing')
  }

  const currentMedia = mediaItems[currentSlide]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Slideshow Section */}
        <div className="relative bg-card rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative aspect-video">
            {currentMedia.type === 'image' ? (
              <Image
                src={currentMedia.src}
                alt={currentMedia.alt || 'Product image'}
                fill
                className="object-cover"
                priority={currentSlide === 0}
              />
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={currentMedia.src}
                  className="w-full h-full object-cover"
                  poster="/demo-video-placeholder.jpg"
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onEnded={() => setIsVideoPlaying(false)}
                />
                <button
                  onClick={toggleVideoPlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                >
                  <div className="bg-white/90 rounded-full p-4 hover:bg-white transition-colors">
                    {isVideoPlaying ? (
                      <Pause className="w-8 h-8 text-black" />
                    ) : (
                      <Play className="w-8 h-8 text-black ml-1" />
                    )}
                  </div>
                </button>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-4xl font-bold text-foreground capitalize">
              {productData.title}
            </h1>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {productData.description}
              </p>
            </div>

            {/* Hashtags */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Hashtags</h2>
              <div className="flex flex-wrap gap-2">
                {productData.hashtags.split(', ').map((hashtag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>

            {/* Slogan */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Slogan</h2>
              <p className="text-2xl font-bold text-primary italic">
                "{productData.slogan}"
              </p>
            </div>
          </div>
        </div>

        {/* Approve Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleApprove}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg transition-colors"
          >
            Approved
          </Button>
        </div>
      </div>
    </div>
  )
}
