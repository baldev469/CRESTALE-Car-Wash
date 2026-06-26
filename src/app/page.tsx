import { db } from "@/db";
import { products, categories, productImages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const featuredProducts = await db.query.products.findMany({
    where: eq(products.isFeatured, true),
    with: {
      images: {
        where: eq(productImages.isPrimary, true),
        limit: 1,
      },
      category: true,
    },
    limit: 4,
  });

  const featuredCategories = await db.query.categories.findMany({
    limit: 3,
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight uppercase italic">
              Redefine <br /> Perfection.
            </h1>
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              Professional-grade car care formulated for enthusiasts who settle for nothing less than a flawless finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button href="/shop" size="lg" variant="secondary" className="px-10">Shop Now</Button>
              <Button href="/shop?category=complete-kits" size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black px-10">View Bundles</Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Scroll to Explore</span>
          <div className="w-px h-12 bg-white/50"></div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <Link 
                key={category.id} 
                href={`/shop?category=${category.slug}`}
                className="group relative h-96 overflow-hidden rounded-sm bg-gray-100"
              >
                <img 
                  src={category.imageUrl || ""} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 italic">{category.name}</h3>
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                    Explore Collection <ArrowRight size={14} className="ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
              <span className="text-blue-600 text-xs font-black uppercase tracking-widest">Selected Works</span>
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">Featured Products</h2>
            </div>
            <Link href="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
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
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-32 bg-black text-white text-center overflow-hidden relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">
            The Choice of Professionals.
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-12">
            Every Crestale product is the result of rigorous testing in real-world detailing conditions. We don't just sell soap; we provide the tools for automotive excellence.
          </p>
          <Button href="/about" size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            Our Heritage
          </Button>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-white/[0.03] whitespace-nowrap select-none pointer-events-none uppercase italic">
          PERFORMANCE • PRECISION • POWER •
        </div>
      </section>

      <Footer />
    </div>
  );
}
