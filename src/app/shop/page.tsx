import { db } from "@/db";
import { products, categories, productImages } from "@/db/schema";
import { eq, asc, desc } from "drizzle-orm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { SortFilter } from "@/components/SortFilter";
import Link from "next/link";
import { Suspense } from "react";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, sort } = await searchParams;

  const categoryData = category 
    ? await db.query.categories.findFirst({ where: eq(categories.slug, category) })
    : null;

  const productList = await db.query.products.findMany({
    where: categoryData ? eq(products.categoryId, categoryData.id) : undefined,
    with: {
      images: {
        where: eq(productImages.isPrimary, true),
        limit: 1,
      },
      category: true,
    },
    orderBy: sort === "price-asc" 
      ? [asc(products.price)] 
      : sort === "price-desc" 
      ? [desc(products.price)] 
      : [desc(products.createdAt)],
  });

  const allCategories = await db.query.categories.findMany();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-2">
                {categoryData ? categoryData.name : "Shop All"}
              </h1>
              <p className="text-gray-500 text-sm">
                Showing {productList.length} products
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <Link 
                  href="/shop"
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all border ${
                    !category ? "bg-black text-white border-black" : "bg-white text-black border-gray-200 hover:border-black"
                  }`}
                >
                  All
                </Link>
                {allCategories.map((cat) => (
                  <Link 
                    key={cat.id}
                    href={`/shop?category=${cat.slug}${sort ? `&sort=${sort}` : ""}`}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all border whitespace-nowrap ${
                      category === cat.slug ? "bg-black text-white border-black" : "bg-white text-black border-gray-200 hover:border-black"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {/* Sort Filter */}
              <Suspense fallback={<div className="h-6 w-24 bg-gray-100 animate-pulse" />}>
                <SortFilter />
              </Suspense>
            </div>
          </div>

          {productList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {productList.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  image={product.images[0]?.url || ""}
                  category={product.category?.name || ""}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-40">
              <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">No products found in this category.</p>
              <Button href="/shop" variant="outline" className="mt-8">Clear Filters</Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
