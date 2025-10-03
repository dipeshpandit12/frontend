'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Heart } from 'lucide-react';

// Custom Image component with retry logic
const RetryImage = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const retryCount = useRef(0);
  const maxRetries = 5;

  const handleError = () => {
    retryCount.current += 1;
    console.log(`Image load failed for ${src}, attempt ${retryCount.current}/${maxRetries}`);
    
    if (retryCount.current < maxRetries) {
      // Retry with cache-busting parameter
      const separator = src.includes('?') ? '&' : '?';
      setCurrentSrc(`${src}${separator}retry=${retryCount.current}&t=${Date.now()}`);
    } else {
      // Give up after max retries and use fallback
      console.log(`Max retries reached for ${src}, using fallback`);
      setCurrentSrc('/images/placeholder-product.jpg');
      setHasError(true);
    }
  };

  // Reset retry count when src changes
  useEffect(() => {
    retryCount.current = 0;
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <Image 
      {...props}
      src={currentSrc}
      alt={alt}
      onError={handleError}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    />
  );
};

// Complete product database
const allProducts = [
  {
    id: 1,
    title: "100 PCS Clear PET Plastic Storage Boxes Transparent Present Box Empty Container&apos;s Rectangle Cube Candy Chocolate...",
    image: "/Product02.jpeg",
    price: "$23.99",
    originalPrice: null,
    rating: 4.3,
    reviews: 582,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    badge: "Overall Pick",
    addToCart: true,
    keywords: ["storage", "boxes", "plastic", "container", "transparent", "clear"]
  },
  {
    id: 2,
    title: "Texas state tshirt",
    image: "/Product03.jpeg",
    price: "$21.99",
    originalPrice: null,
    rating: 4.5,
    reviews: 847,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    addToCart: true,
    keywords: ["keychain", "acrylic", "pendant", "transparent", "selfckf"]
  },
  {
    id: 3,
    title: "The best tshirt",
    image: "/Product04.jpeg",
    price: "$21.99",
    originalPrice: null,
    rating: 4.5,
    reviews: 847,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    addToCart: true,
    keywords: ["keychain", "acrylic", "pendant", "transparent", "selfckf"]
  },
  {
    id: 4,
    title: "Tshirt TXSTE",
    image: "/images/placeholder-product.jpg",
    price: "$305.14",
    originalPrice: null,
    rating: 4.0,
    reviews: 159,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    sponsored: true,
    addToCart: true,
    keywords: ["chair", "office", "seating", "mesh", "adjustable", "space"]
  },
  {
    id: 5,
    title: "Selfckf 30 Pieces Believe Bell Ornament for Christmas Tree Sleigh Bell Ribbon Xmas Party Home Decoration 1.5 inc...",
    image: "/images/placeholder-product.jpg",
    price: "$11.11",
    originalPrice: "$18.05",
    rating: 4.8,
    reviews: 10,
    deliveryDate: "Thu, Oct 10",
    primeEligible: true,
    addToCart: true,
    keywords: ["christmas", "bell", "ornament", "decoration", "xmas", "selfckf"]
  },
  {
    id: 6,
    title: "2 Pcs Clear Paint Organizer With Paint Brush Holder 2 Layers Acrylic Paint Organizer Paint Storage Rack Craft Paint...",
    image: "/images/placeholder-product.jpg",
    price: "$22.99",
    originalPrice: null,
    rating: 4.6,
    reviews: 91,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    addToCart: true,
    keywords: ["paint", "organizer", "brush", "storage", "craft", "acrylic"]
  },
  {
    id: 7,
    title: "Steamer Board for Clothes With Ironing Glove, 35' 17.5' Hanging Ironing Pad, Steam Iron Stand With Pad for Steaming Clothes",
    image: "/images/placeholder-product.jpg",
    price: "$27.40",
    originalPrice: null,
    rating: 4.3,
    reviews: 289,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    addToCart: true,
    keywords: ["steamer", "iron", "clothes", "board", "ironing", "steam"]
  },
  {
    id: 8,
    title: "Selfckf 24 Pieces Christmas Booze Balls Fillable Booze Tree Ornaments Clear Plastic Round Christmas Ornaments Pendant...",
    image: "/images/placeholder-product.jpg",
    price: "$18.90",
    originalPrice: null,
    rating: 4.4,
    reviews: 44,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    addToCart: true,
    keywords: ["christmas", "ornaments", "booze", "tree", "decoration", "selfckf"]
  },
  // Additional products for better search results
  {
    id: 9,
    title: "Laptop Stand Adjustable Aluminum Laptop Holder for Desk Portable Laptop Riser Compatible with MacBook Pro Air...",
    image: "/images/products/laptop-stand.jpg",
    price: "$29.99",
    originalPrice: "$39.99",
    rating: 4.7,
    reviews: 1205,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    addToCart: true,
    keywords: ["laptop", "stand", "aluminum", "adjustable", "macbook", "desk"]
  },
  {
    id: 10,
    title: "Wireless Bluetooth Headphones Over Ear, Hi-Fi Stereo Foldable Wireless Headset with Microphone...",
    image: "/images/products/headphones.jpg",
    price: "$49.99",
    originalPrice: "$79.99",
    rating: 4.4,
    reviews: 892,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    addToCart: true,
    keywords: ["headphones", "wireless", "bluetooth", "stereo", "microphone", "audio"]
  },
  {
    id: 11,
    title: "Gaming Mouse RGB Backlit 6 Buttons Programmable Gaming Mice with Adjustable DPI for PC Laptop Computer...",
    image: "/images/products/gaming-mouse.jpg",
    price: "$19.99",
    originalPrice: null,
    rating: 4.6,
    reviews: 456,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    addToCart: true,
    keywords: ["mouse", "gaming", "rgb", "programmable", "computer", "laptop"]
  },
  {
    id: 12,
    title: "Premium Quality Product - High Performance Design",
    image: "/Product06.jpeg",
    price: "$45.99",
    originalPrice: "$59.99",
    rating: 4.2,
    reviews: 234,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    addToCart: true,
    keywords: ["premium", "quality", "performance", "design", "product"]
  },
  {
    id: 13,
    title: "Professional Grade Equipment - Durable and Reliable",
    image: "/Product07.jpeg",
    price: "$78.50",
    originalPrice: null,
    rating: 4.7,
    reviews: 567,
    deliveryDate: "Thu, Oct 9",
    primeEligible: true,
    addToCart: true,
    keywords: ["professional", "equipment", "durable", "reliable", "grade"]
  },
  {
    id: 14,
    title: "Advanced Technology Solution - Innovation at its Best",
    image: "/Product08.jpeg",
    price: "$129.99",
    originalPrice: "$149.99",
    rating: 4.8,
    reviews: 892,
    deliveryDate: "Wed, Oct 8",
    primeEligible: true,
    badge: "Best Choice",
    addToCart: true,
    keywords: ["technology", "advanced", "solution", "innovation", "best"]
  }
];

export default function ProductListing() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [sortBy, setSortBy] = useState('Featured');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedFilters, setSelectedFilters] = useState({
    freeShipping: false,
    amazonShipping: false,
    getItTomorrow: false,
    newProducts: false,
    allDiscounts: false
  });

  // Filter products based on search query
  useEffect(() => {
    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(' ');
      const firstWord = searchTerms[0];
      
      const filtered = allProducts.filter(product => {
        // Check if first word matches any keyword or title
        const titleMatch = product.title.toLowerCase().includes(firstWord);
        const keywordMatch = product.keywords.some(keyword => 
          keyword.toLowerCase().includes(firstWord) || firstWord.includes(keyword.toLowerCase())
        );
        
        return titleMatch || keywordMatch;
      });

      // If no exact matches, show products with partial matches
      if (filtered.length === 0) {
        const partialMatches = allProducts.filter(product => {
          return searchTerms.some(term => 
            product.keywords.some(keyword => 
              keyword.toLowerCase().includes(term) || term.includes(keyword.toLowerCase())
            ) || product.title.toLowerCase().includes(term)
          );
        });
        setFilteredProducts(partialMatches);
      } else {
        setFilteredProducts(filtered);
      }
    } else {
      setFilteredProducts(allProducts);
    }
  }, [query]);

  const handleFilterChange = (filterName: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName as keyof typeof prev]
    }));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-[#1E5B87] text-sm ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 px-4 py-2 text-sm">
        <span className="text-gray-600">1-{filteredProducts.length} of {filteredProducts.length} results for </span>
        <span className="font-semibold text-[#1E5B87]">"{query || 'all products'}"</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              
              {/* Eligible for Free Shipping */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-[#1E5B87]">Eligible for Free Shipping</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={selectedFilters.freeShipping}
                        onChange={() => handleFilterChange('freeShipping')}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Free Shipping by ShopHub</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox"
                        checked={selectedFilters.amazonShipping}
                        onChange={() => handleFilterChange('amazonShipping')}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Get FREE Shipping on eligible orders shipped by ShopHub</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Day */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-[#1E5B87]">Delivery Day</h3>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      checked={selectedFilters.getItTomorrow}
                      onChange={() => handleFilterChange('getItTomorrow')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Get it by Tomorrow</span>
                  </label>
                </CardContent>
              </Card>

              {/* Color Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-[#1E5B87]">Color</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {['bg-white', 'bg-black', 'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'].map((color, index) => (
                      <button
                        key={index}
                        className={`w-6 h-6 rounded border-2 border-gray-300 ${color}`}
                      ></button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Price */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-[#1E5B87]">Price</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="price" className="text-[#1E5B87]" />
                      <span className="text-sm">$25 to $50</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="price" className="text-[#1E5B87]" />
                      <span className="text-sm">$50 & above</span>
                    </label>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <input type="number" placeholder="$" className="w-16 px-2 py-1 border rounded text-sm" />
                      <span>to</span>
                      <input type="number" placeholder="$" className="w-16 px-2 py-1 border rounded text-sm" />
                      <Button size="sm" variant="outline">Go</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deals & Discounts */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-[#1E5B87]">Deals & Discounts</h3>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      checked={selectedFilters.allDiscounts}
                      onChange={() => handleFilterChange('allDiscounts')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">All Discounts</span>
                  </label>
                </CardContent>
              </Card>

              {/* Condition */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-[#1E5B87]">Condition</h3>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      checked={selectedFilters.newProducts}
                      onChange={() => handleFilterChange('newProducts')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">New</span>
                  </label>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h1 className="text-xl font-semibold text-[#1E5B87]">Results</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5B87]"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Customer Reviews</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-[#D2E9F4] p-3 rounded mb-6 text-sm text-[#1E5B87]">
              Check each product page for other buying options. Price and other details may vary based on product size and color.
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => window.location.href = `/product-view?id=${product.id}`}>
                  <CardContent className="p-4">
                    
                    {/* Product Image */}
                    <div className="relative mb-3">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image 
                          src={product.image} 
                          alt={product.title}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {product.badge && (
                        <span className="absolute top-2 left-2 bg-[#1E5B87] text-white text-xs px-2 py-1 rounded">
                          {product.badge}
                        </span>
                      )}
                      {product.sponsored && (
                        <span className="absolute top-2 right-2 text-xs text-gray-500">Sponsored</span>
                      )}
                      <button className="absolute top-2 right-2">
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-3 leading-tight">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(product.rating)}
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg font-bold text-[#1E5B87]">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>

                    {/* Delivery */}
                    <div className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">FREE delivery {product.deliveryDate}</span>
                      {product.primeEligible && (
                        <div className="text-[#1E5B87] font-medium mt-1">
                          Prime eligible
                        </div>
                      )}
                    </div>

                    {/* Add to Cart */}
                    {product.addToCart && (
                      <Button className="w-full bg-[#1E5B87] hover:bg-[#164a73] text-white">
                        Add to cart
                      </Button>
                    )}

                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="border-[#1E5B87] text-[#1E5B87] hover:bg-[#D2E9F4]">
                Load More Results
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}