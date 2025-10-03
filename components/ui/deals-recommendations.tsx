'use client';

import { Card, CardContent } from './card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface DealsSectionProps {
  title: string;
  items: Array<{
    name: string;
    bgColor?: string;
  }>;
}

function DealsSection({ title, items }: DealsSectionProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              <div 
                className={`w-full h-24 ${item.bgColor || 'bg-[#D2E9F4]'} rounded-lg mb-2 flex items-center justify-center`}
              >
                <span className={`text-xs text-center font-medium ${
                  item.bgColor === 'bg-[#1E5B87]' ? 'text-white' : 'text-[#1E5B87]'
                }`}>{item.name}</span>
              </div>
              <p className="text-sm font-medium">{item.name}</p>
            </div>
          ))}
        </div>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          {title.includes('Men\'s') ? 'Explore all deals' : 
           title.includes('Cold-weather') ? 'Shop now' :
           title.includes('Cycling') ? 'Explore cycling deals' :
           'Shop deals'}
        </a>
      </CardContent>
    </Card>
  );
}

function BestSellersSection() {
  const bestSellers = [
    { name: "Stanley Tumbler", price: "$39.99", bgColor: "bg-[#D2E9F4]" },
    { name: "Bedding Set", price: "$49.99", bgColor: "bg-[#D2E9F4]" },
    { name: "Wood Stain", price: "$24.99", bgColor: "bg-[#D2E9F4]" },
    { name: "Picture Frame", price: "$12.99", bgColor: "bg-[#D2E9F4]" },
    { name: "Running Shoes", price: "$89.99", bgColor: "bg-[#1E5B87]" },
    { name: "Honey", price: "$19.99", bgColor: "bg-[#D2E9F4]" },
    { name: "Bed Sheets", price: "$34.99", bgColor: "bg-[#D2E9F4]" },
    { name: "Water Bottle", price: "$22.99", bgColor: "bg-[#1E5B87]" },
  ];

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Best Sellers in Home & Kitchen</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {bestSellers.map((item, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className={`w-full h-32 ${item.bgColor || 'bg-[#D2E9F4]'} rounded-lg mb-2 group-hover:shadow-lg transition-shadow flex items-center justify-center`}>
                <span className={`text-xs text-center px-2 font-medium ${
                  item.bgColor === 'bg-[#1E5B87]' ? 'text-white' : 'text-[#1E5B87]'
                }`}>{item.name}</span>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">{item.name}</p>
              <p className="text-lg font-bold text-[#1E5B87]">{item.price}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DealsAndRecommendations() {
  const dealSections = [
    {
      title: "Men's Fall Fashion",
      items: [
        { name: "Jeans", bgColor: "bg-[#D2E9F4]" },
        { name: "Shirts", bgColor: "bg-[#D2E9F4]" },
        { name: "Pants", bgColor: "bg-[#1E5B87]" },
        { name: "Sweatshirts", bgColor: "bg-[#D2E9F4]" }
      ]
    },
    {
      title: "Cold-weather driving essentials",
      items: [
        { name: "Accessories", bgColor: "bg-[#D2E9F4]" },
        { name: "De-icer", bgColor: "bg-[#D2E9F4]" },
        { name: "Jump starters", bgColor: "bg-[#D2E9F4]" },
        { name: "Windshield", bgColor: "bg-[#D2E9F4]" }
      ]
    },
    {
      title: "Cycling gear under $50",
      items: [
        { name: "Helmets", bgColor: "bg-[#1E5B87]" },
        { name: "Backpacks", bgColor: "bg-[#D2E9F4]" },
        { name: "Maintenance", bgColor: "bg-[#D2E9F4]" },
        { name: "Clothing", bgColor: "bg-[#D2E9F4]" }
      ]
    },
    {
      title: "Deals on tech",
      items: [
        { name: "Headphones", bgColor: "bg-[#D2E9F4]" },
        { name: "Keyboards", bgColor: "bg-[#D2E9F4]" },
        { name: "Mice", bgColor: "bg-[#D2E9F4]" },
        { name: "Hard drives", bgColor: "bg-[#D2E9F4]" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Best Sellers Section */}
      <BestSellersSection />

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dealSections.map((section, index) => (
          <DealsSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>

      {/* Small Business Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Deals from small businesses</h2>
            <a href="#" className="text-blue-600 hover:underline text-sm">See more</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }, (_, index) => {
              const colors = ['bg-[#D2E9F4]', 'bg-[#1E5B87]', 'bg-[#D2E9F4]', 'bg-[#1E5B87]', 'bg-[#D2E9F4]', 'bg-[#1E5B87]'];
              const isBlue = colors[index] === 'bg-[#1E5B87]';
              return (
                <div key={index} className="text-center group cursor-pointer">
                  <div className={`w-full h-24 ${colors[index]} rounded-lg mb-2 group-hover:shadow-lg transition-shadow flex items-center justify-center`}>
                    <span className={`text-xs font-medium ${
                      isBlue ? 'text-white' : 'text-[#1E5B87]'
                    }`}>Product {index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-600">Up to 30% off</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}