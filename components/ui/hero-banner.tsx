'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

export default function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-[#1E5B87] to-[#164a73] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#1E5B87] opacity-90"></div>
      
      {/* Navigation Arrows */}
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <div className="text-lg md:text-xl font-medium mb-2">ShopHub Big Sale Days</div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Amazing deals<br />
              from $24.99
            </h1>
            <p className="text-lg md:text-xl mb-6">Limited-time offer</p>
            <Button 
              className="bg-white text-[#1E5B87] hover:bg-[#D2E9F4] px-8 py-3 text-lg font-semibold"
            >
              Shop now
            </Button>
          </div>

          {/* Right Content - Device Images */}
          <div className="flex items-center space-x-4">
            {/* Kindle */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-white text-xs text-center">
                  <div className="w-16 h-20 md:w-20 md:h-24 bg-gray-700 rounded mb-2 mx-auto"></div>
                  Kindle
                </div>
              </div>
            </div>

            {/* Echo Dot */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-400 rounded-full mb-2 mx-auto"></div>
                  <div className="text-gray-800 text-xs">Echo Dot</div>
                </div>
              </div>
            </div>

            {/* Fire TV Stick */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-white text-xs text-center">
                  <div className="w-16 h-4 md:w-20 md:h-6 bg-gray-700 rounded mb-2 mx-auto"></div>
                  <div className="text-xs">Fire TV Stick</div>
                </div>
              </div>
            </div>

            {/* Nintendo Game */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="w-24 h-32 md:w-32 md:h-40 bg-red-600 rounded-lg flex items-center justify-center">
                <div className="text-white text-xs text-center">
                  <div className="w-16 h-20 md:w-20 md:h-24 bg-red-500 rounded mb-2 mx-auto flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  Game
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sale Indicator */}
      <div className="absolute bottom-4 right-4 bg-[#164a73] text-white px-4 py-2 rounded-lg text-sm font-medium">
        ShopHub Big Sale<br />
        October 7-9
      </div>
    </div>
  );
}