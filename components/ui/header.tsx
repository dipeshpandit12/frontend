'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, ShoppingCart, Menu, Globe } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to product listing page with search query
      const searchUrl = `/product-listing?query=${encodeURIComponent(searchQuery.trim())}`;
      
      // Update the URL
      router.push(searchUrl);
      console.log('Search Query:', searchQuery);
      console.log('Category:', selectedCategory);
      console.log('Navigating to:', searchUrl);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as React.FormEvent);
    }
  };
  return (
    <header className="bg-[#1E5B87] text-white">
      {/* Top Banner */}
            {/* Top Banner */}
      <div className="bg-[#164a73] text-xs py-2 px-2 sm:px-4 text-center">
        <span className="hidden sm:inline">You are on our website. Explore our amazing products with fast delivery. </span>
        <span className="sm:hidden">Fast delivery available. </span>
        <Link href="/" className="text-[#D2E9F4] hover:underline">Click here to learn more</Link>
      </div>

      {/* Main Header */}
      <div className="flex items-center px-4 py-2 space-x-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="flex items-center space-x-1">
            <span className="text-2xl font-bold">ShopHub</span>
            <span className="text-[#D2E9F4] text-sm">.com</span>
          </div>
        </div>

        {/* Delivery Location */}
        <div className="hidden lg:flex items-center space-x-1 text-sm">
          <MapPin className="w-4 h-4" />
          <div>
            <div className="text-[#D2E9F4] text-xs">Deliver to</div>
            <div className="font-semibold">New York 10001</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <form onSubmit={handleSearch} className="flex">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#D2E9F4] text-[#1E5B87] px-3 py-2 rounded-l border-r text-sm focus:outline-none"
            >
              <option>All</option>
              <option>Arts &amp; Crafts</option>
              <option>Automotive</option>
              <option>Baby</option>
              <option>Beauty &amp; Personal Care</option>
              <option>Books</option>
              <option>Boys&apos; Fashion</option>
              <option>Computers</option>
              <option>Deals</option>
              <option>Digital Music</option>
              <option>Electronics</option>
              <option>Girls&apos; Fashion</option>
              <option>Health &amp; Household</option>
              <option>Home &amp; Kitchen</option>
              <option>Industrial &amp; Scientific</option>
              <option>Kindle Store</option>
              <option>Luggage</option>
              <option>Men&apos;s Fashion</option>
              <option>Movies &amp; TV</option>
              <option>Music, CDs &amp; Vinyl</option>
              <option>Pet Supplies</option>
              <option>Prime Video</option>
              <option>Software</option>
              <option>Sports & Outdoors</option>
              <option>Tools &amp; Home Improvement</option>
              <option>Toys &amp; Games</option>
              <option>Video Games</option>
              <option>Women&apos;s Fashion</option>
            </select>
            <Input 
              type="text" 
              placeholder="Search ShopHub" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-2 border-none rounded-none text-white bg-[#1E5B87] placeholder:text-[#D2E9F4]"
            />
            <Button 
              type="submit"
              className="bg-[#D2E9F4] hover:bg-white text-[#1E5B87] px-4 py-2 rounded-r"
            >
              <Search className="w-5 h-5" />
            </Button>
          </form>
        </div>

        {/* Language/Country */}
        <div className="hidden md:flex items-center space-x-1 text-sm">
          <Globe className="w-4 h-4" />
          <span>EN</span>
        </div>

        {/* Account & Lists */}
        <div 
          className="hidden lg:flex flex-col text-sm cursor-pointer hover:bg-[#164a73] p-2 rounded transition-colors"
          onClick={() => router.push('/seller-listing')}
        >
          <span className="text-[#D2E9F4] text-xs">Hello, sign in</span>
          <span className="font-semibold">Account &amp; Lists</span>
        </div>

        {/* Returns & Orders */}
        <div className="hidden lg:flex flex-col text-sm">
          <span className="text-[#D2E9F4] text-xs">Returns</span>
          <span className="font-semibold">&amp; Orders</span>
        </div>

        {/* Cart */}
        <div className="flex items-center space-x-1">
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#D2E9F4] text-[#1E5B87] text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">0</span>
          </div>
          <span className="hidden md:block font-semibold">Cart</span>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Menu className="w-6 h-6" />
        </div>
      </div>

      {/* Navigation Bar */}
      {/* Navigation Bar */}
      <div className="bg-[#164a73] px-2 sm:px-4 py-2">
        <div 
          className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm overflow-x-auto"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
          }}
        >
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#1E5B87]">
            <Menu className="w-4 h-4 mr-2" />
            All
          </Button>
          <a href="#" className="hover:underline">Best Choice</a>
          <a href="#" className="hover:underline">Early Deals</a>
          <a href="#" className="hover:underline">Health Care</a>
          <a href="#" className="hover:underline">Luxury</a>
          <a href="#" className="hover:underline">Best Sellers</a>
          <a href="#" className="hover:underline">New Releases</a>
          <a href="#" className="hover:underline">Shop Basics</a>
          <a href="#" className="hover:underline">Registry</a>
          <a href="#" className="hover:underline">Computers</a>
          <a href="#" className="hover:underline">Smart Home</a>
          <a href="#" className="hover:underline">Gift Cards</a>
          <a href="#" className="hover:underline">Premium</a>
          <a href="#" className="hover:underline">Customer Service</a>
          <a href="#" className="hover:underline">Sports & Outdoors</a>
          <a href="#" className="hover:underline">Music</a>
        </div>
      </div>
    </header>
  );
}