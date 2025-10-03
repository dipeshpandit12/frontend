import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Search - ShopHub',
  description: 'Search and discover amazing products on ShopHub. Find the best deals on electronics, home goods, fashion, and more.',
  keywords: 'shopping, products, search, deals, electronics, fashion, home goods',
};

export default function ProductListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col min-h-screen">
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
        {/* Footer */}
        <footer className="bg-[#1E5B87] text-white py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Company Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">ShopHub</h3>
                <p className="text-[#D2E9F4] text-sm mb-4">
                  Your trusted online marketplace for quality products at great prices.
                </p>
                <div className="text-[#D2E9F4] text-sm">
                  <p>Customer Service: 1-800-SHOPHUB</p>
                  <p>Email: support@shophub.com</p>
                </div>
              </div>
              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-[#D2E9F4] text-sm">
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="/product-listing" className="hover:text-white transition-colors">All Products</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Deals</a></li>
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-[#D2E9F4] text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Home & Kitchen</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Fashion</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sports & Outdoors</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Health & Beauty</a></li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h4 className="font-semibold mb-4">Customer Service</h4>
                <ul className="space-y-2 text-[#D2E9F4] text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                </ul>
              </div>

            </div>

            {/* Bottom Footer */}
            <div className="border-t border-[#164a73] mt-8 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-[#D2E9F4] text-sm mb-4 md:mb-0">
                  © 2025 ShopHub. All rights reserved.
                </div>
                <div className="flex space-x-6 text-[#D2E9F4] text-sm">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}