import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Details - ShopHub',
  description: 'View detailed product information, specifications, and reviews on ShopHub.',
  keywords: 'product details, specifications, reviews, shopping',
};

export default function ProductViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}