'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Heart, ShoppingCart, Share2 } from 'lucide-react';

// Sample product data that would typically come from an API
interface Product {
  id: number;
  title: string;
  description: string;
  hashtag: string;
  slogan: string;
  image: string;
  price: string;
  originalPrice: string | null;
  rating: number;
  reviews: number;
  badge: string | null;
}

const productData: Record<number, Product> = {
  1: {
    id: 1,
    title: "100 PCS Clear PET Plastic Storage Boxes",
    description: "Premium quality transparent storage containers perfect for organizing candy, chocolates, small items, and crafts. Made from durable PET plastic that's crystal clear for easy viewing of contents. Each box features a secure-fitting lid to keep items fresh and protected.",
    hashtag: "#OrganizeInStyle",
    slogan: "Crystal Clear Organization, Every Time",
    image: "/images/products/storage-boxes.jpg",
    price: "$23.99",
    originalPrice: null,
    rating: 4.3,
    reviews: 582,
    badge: "Overall Pick"
  },
  2: {
    id: 2,
    title: "Selfckf 200 Pieces Acrylic Keychain Blanks",
    description: "High-quality acrylic keychain blanks perfect for DIY projects, personalization, and crafting. Includes various shapes: circles, hearts, squares, and rectangles. Crystal clear acrylic material that's easy to customize with vinyl, paint, or engraving.",
    hashtag: "#DIYCrafting",
    slogan: "Create Your Perfect Keychain",
    image: "/images/products/acrylic-keychain-1.jpg",
    price: "$21.99",
    originalPrice: null,
    rating: 4.5,
    reviews: 847,
    badge: null
  },
  3: {
    id: 3,
    title: "SPACE Seating Big and Tall Office Chair",
    description: "Professional ergonomic office chair designed for comfort and durability. Features dual-layer AirGrid back with mesh seat, adjustable height, and gunmetal finish base. Perfect for long work sessions with superior lumbar support.",
    hashtag: "#OfficeComfort",
    slogan: "Where Comfort Meets Productivity",
    image: "/images/products/office-chair.jpg",
    price: "$305.14",
    originalPrice: null,
    rating: 4.0,
    reviews: 159,
    badge: "Professional Choice"
  },
  4: {
    id: 4,
    title: "Christmas Bell Ornaments Set",
    description: "Beautiful set of 30 believe bell ornaments perfect for Christmas tree decoration. Made with premium materials and featuring ribbon attachments. Each bell produces a delightful chime sound and adds festive charm to your holiday decorations.",
    hashtag: "#ChristmasSpirit",
    slogan: "Ring in the Holiday Magic",
    image: "/images/products/christmas-bells.jpg",
    price: "$11.11",
    originalPrice: "$18.05",
    rating: 4.8,
    reviews: 10,
    badge: "Holiday Special"
  },
  5: {
    id: 5,
    title: "Gaming Mouse RGB Backlit",
    description: "High-performance gaming mouse with 6 programmable buttons and adjustable DPI settings. Features stunning RGB backlighting with multiple color modes. Ergonomic design provides comfort during extended gaming sessions.",
    hashtag: "#GamingGear",
    slogan: "Level Up Your Game",
    image: "/images/products/gaming-mouse.jpg",
    price: "$19.99",
    originalPrice: null,
    rating: 4.6,
    reviews: 456,
    badge: "Gamer's Choice"
  }
};

export default function ProductView() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id') || '1';
  const [product, setProduct] = useState<Product>(productData[1]);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const id = parseInt(productId);
    if (productData[id]) {
      setProduct(productData[id]);
    } else {
      setProduct(productData[1]); // Default to first product
    }
  }, [productId]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-[#1E5B87] text-lg font-medium ml-2">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200">
              <Image 
                src={product.image} 
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-product.jpg';
                }}
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index - 1)}
                  className={`aspect-square bg-gray-100 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === index - 1 ? 'border-[#1E5B87]' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image 
                    src={product.image} 
                    alt={`${product.title} view ${index}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-product.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            
            {/* Badge */}
            {product.badge && (
              <div className="inline-block">
                <span className="bg-[#1E5B87] text-white px-4 py-2 rounded-full text-sm font-medium">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Hashtag */}
            <div>
              <span className="text-[#1E5B87] text-lg font-semibold">
                {product.hashtag}
              </span>
            </div>

            {/* Slogan */}
            <div className="bg-[#D2E9F4] p-4 rounded-lg">
              <p className="text-[#1E5B87] text-xl font-medium italic text-center">
                &ldquo;{product.slogan}&rdquo;
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              {renderStars(product.rating)}
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-[#1E5B87]">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button className="w-full bg-[#1E5B87] hover:bg-[#164a73] text-white py-4 text-lg font-semibold">
                <ShoppingCart className="w-6 h-6 mr-3" />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-[#1E5B87] text-[#1E5B87] hover:bg-[#D2E9F4] py-3">
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="border-[#1E5B87] text-[#1E5B87] hover:bg-[#D2E9F4] py-3">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-[#1E5B87] mb-2">Delivery Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✅ FREE delivery by Wednesday, Oct 8</p>
                  <p>✅ Prime eligible</p>
                  <p>✅ 30-day return policy</p>
                  <p>✅ ShopHub customer support</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}