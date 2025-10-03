'use client';

import Header from '@/components/ui/header';
import HeroBanner from '@/components/ui/hero-banner';
import CategoryCards from '@/components/ui/category-cards';
import DealsAndRecommendations from '@/components/ui/deals-recommendations';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Main Content */}
      <main>
        {/* Category Cards */}
        <CategoryCards />
        
        {/* Deals and Recommendations */}
        <DealsAndRecommendations />
      </main>
      
      {/* Footer Space */}
      <div className="h-20 bg-[#1E5B87]"></div>
    </div>
  );
}