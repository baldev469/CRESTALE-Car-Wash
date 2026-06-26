import { db } from "@/db";
import { products, productImages, reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Star, Shield, Truck, RotateCcw } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCartButton } from "@/components/AddToCartButton";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      images: true,
      category: true,
      reviews: {
        orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
      },
    },
  });

  if (!product) {
    notFound();
  }

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length
    : 5.0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            {/* Image Gallery */}
            <ProductGallery images={product.images.map(img => img.url)} />

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-8">
                <span className="text-blue-600 text-xs font-black uppercase tracking-widest mb-2 block">
                  {product.category?.name}
                </span>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(averageRating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {product.reviews.length} Reviews
                  </span>
                </div>
                <p className="text-3xl font-light">${product.price}</p>
              </div>

              <div className="prose prose-sm text-gray-600 mb-10 leading-relaxed">
                <p>{product.description}</p>
              </div>

              <div className="space-y-6 mb-12">
                <AddToCartButton 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || "",
                    slug: product.slug
                  }} 
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t">
                  <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <Truck size={20} className="text-black" />
                    <span>Free Shipping Over $50</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <Shield size={20} className="text-black" />
                    <span>2 Year Warranty</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <RotateCcw size={20} className="text-black" />
                    <span>30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <section className="border-t pt-20">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-12 text-center">Customer Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-8 rounded-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold uppercase tracking-widest text-[10px]">{review.author}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                </div>
              ))}
              {product.reviews.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">No reviews yet. Be the first to try it!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
