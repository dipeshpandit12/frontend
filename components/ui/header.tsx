'use client';

import { useState } from 'react';
import { Search, MapPin, ShoppingCart, Menu, Globe } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search Query:', searchQuery);
      console.log('Category:', selectedCategory);
      // Here you can add your search logic, such as:
      // - Navigate to search results page
      // - Call an API
      // - Filter products
      // - etc.
      alert(`Searching for "${searchQuery}" in category "${selectedCategory}"`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };
  return (
    <header className="bg-[#1E5B87] text-white">
      {/* Top Banner */}
      <div className="bg-[#164a73] text-xs py-2 px-4 text-center">
        <span>You are on our website. Explore our amazing products with fast delivery. </span>
        <a href="#" className="text-[#D2E9F4] hover:underline">Click here to learn more</a>
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
          <div className="flex">
            <select className="bg-[#D2E9F4] text-[#1E5B87] px-3 py-2 rounded-l border-r text-sm focus:outline-none">
              <option>All</option>
              <option>Arts & Crafts</option>
              <option>Automotive</option>
              <option>Baby</option>
              <option>Beauty & Personal Care</option>
              <option>Books</option>
              <option>Boys' Fashion</option>
              <option>Computers</option>
              <option>Deals</option>
              <option>Digital Music</option>
              <option>Electronics</option>
              <option>Girls' Fashion</option>
              <option>Health & Household</option>
              <option>Home & Kitchen</option>
              <option>Industrial & Scientific</option>
              <option>Kindle Store</option>
              <option>Luggage</option>
              <option>Men's Fashion</option>
              <option>Movies & TV</option>
              <option>Music, CDs & Vinyl</option>
              <option>Pet Supplies</option>
              <option>Prime Video</option>
              <option>Software</option>
              <option>Sports & Outdoors</option>
              <option>Tools & Home Improvement</option>
              <option>Toys & Games</option>
              <option>Video Games</option>
              <option>Women's Fashion</option>
            </select>
            <Input 
              type="text" 
              placeholder="Search ShopHub" 
              className="flex-1 px-4 py-2 border-none rounded-none text-[#1E5B87]"
            />
            <Button className="bg-[#D2E9F4] hover:bg-white text-[#1E5B87] px-4 py-2 rounded-r">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Language/Country */}
        <div className="hidden md:flex items-center space-x-1 text-sm">
          <Globe className="w-4 h-4" />
          <span>EN</span>
        </div>

        {/* Account & Lists */}
        <div className="hidden lg:flex flex-col text-sm">
          <span className="text-[#D2E9F4] text-xs">Hello, sign in</span>
          <span className="font-semibold">Account & Lists</span>
        </div>

        {/* Returns & Orders */}
        <div className="hidden lg:flex flex-col text-sm">
          <span className="text-[#D2E9F4] text-xs">Returns</span>
          <span className="font-semibold">& Orders</span>
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
      <div className="bg-[#164a73] px-4 py-2">
        <div className="flex items-center space-x-6 text-sm">
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