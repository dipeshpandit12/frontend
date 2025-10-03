'use client';

import { Card, CardContent } from './card';
import { Button } from './button';

interface CategoryCardProps {
  title: string;
  items: Array<{
    name: string;
    bgColor?: string;
  }>;
  isSignIn?: boolean;
}

function CategoryCard({ title, items, isSignIn }: CategoryCardProps) {
  if (isSignIn) {
    return (
      <Card className="h-full">
        <CardContent className="p-6 h-full flex flex-col">
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <div className="flex-1 flex flex-col justify-center">
            <Button className="w-full bg-[#1E5B87] hover:bg-[#164a73] text-white font-semibold py-3 mb-4">
              Sign in securely
            </Button>
            <div className="text-center text-sm text-gray-600">
              <a href="#" className="text-[#1E5B87] hover:underline">
                New customer? Start here.
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
          Explore all deals
        </a>
      </CardContent>
    </Card>
  );
}

export default function CategoryCards() {
  const categories = [
    {
      title: "Premium fall fashion",
      items: [
        { name: "Dresses", bgColor: "bg-[#D2E9F4]" },
        { name: "Handbags", bgColor: "bg-[#D2E9F4]" },
        { name: "Shoes", bgColor: "bg-[#D2E9F4]" },
        { name: "Watches", bgColor: "bg-[#D2E9F4]" }
      ]
    },
    {
      title: "Women's Fall Fashion",
      items: [
        { name: "Dresses", bgColor: "bg-[#D2E9F4]" },
        { name: "Knits", bgColor: "bg-[#1E5B87]" },
        { name: "Jackets", bgColor: "bg-[#D2E9F4]" },
        { name: "Jewelry", bgColor: "bg-[#D2E9F4]" }
      ]
    },
    {
      title: "Fall sports gear",
      items: [
        { name: "Football", bgColor: "bg-[#D2E9F4]" },
        { name: "Soccer", bgColor: "bg-[#1E5B87]" },
        { name: "Basketball", bgColor: "bg-[#D2E9F4]" },
        { name: "Baseball", bgColor: "bg-[#D2E9F4]" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            items={category.items}
          />
        ))}
        <CategoryCard
          title="Sign in for the best experience"
          items={[]}
          isSignIn={true}
        />
      </div>
    </div>
  );
}