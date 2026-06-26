import { db } from "./index";
import { categories, products, productImages, reviews } from "./schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(reviews);
  await db.delete(productImages);
  await db.delete(products);
  await db.delete(categories);

  // Insert Categories
  const [exteriorCat, interiorCat, kitsCat] = await db.insert(categories).values([
    {
      name: "Exterior Care",
      slug: "exterior-care",
      description: "Premium soaps, waxes, and sealants for a flawless finish.",
      imageUrl: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Interior Detail",
      slug: "interior-detail",
      description: "Keep your cabin fresh, clean, and protected.",
      imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Complete Kits",
      slug: "complete-kits",
      description: "Everything you need in one professional bundle.",
      imageUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=800&auto=format&fit=crop",
    },
  ]).returning();

  // Insert Products
  const productData = [
    {
      name: "Crestale Hydro-Shield Wash",
      slug: "hydro-shield-wash",
      description: "A high-foaming, pH-balanced shampoo that leaves a ceramic-infused protective layer. Perfect for maintaining that showroom shine while providing incredible water beading.",
      price: "24.99",
      categoryId: exteriorCat.id,
      stock: 50,
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1552933529-e359b2477262?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605164599901-f89ff179be3e?q=80&w=800&auto=format&fit=crop"
      ],
      reviews: [
        { author: "John D.", rating: 5, comment: "Best soap I've ever used. The suds are amazing!" },
        { author: "Sarah M.", rating: 4, comment: "Great shine, but wish the bottle was bigger." }
      ]
    },
    {
      name: "Graphene Ultra Gloss Wax",
      slug: "graphene-ultra-gloss",
      description: "Infused with graphene oxide for extreme durability and a deep, wet-look shine that lasts up to 12 months.",
      price: "34.99",
      categoryId: exteriorCat.id,
      stock: 30,
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop"
      ],
      reviews: [
        { author: "Mike R.", rating: 5, comment: "Incredible depth. My black car looks like a mirror." }
      ]
    },
    {
      name: "Leather Revive & Protect",
      slug: "leather-revive",
      description: "Clean and condition your leather in one step. Leaves a matte, non-greasy finish with a fresh 'new car' scent.",
      price: "19.99",
      categoryId: interiorCat.id,
      stock: 45,
      isFeatured: false,
      images: [
        "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop"
      ],
      reviews: []
    },
    {
      name: "Crestale 344 Master Bundle",
      slug: "crestale-344-bundle",
      description: "The ultimate car care package. Includes the Hydro-Shield Wash, Graphene Wax, Leather Revive, 4 microfiber towels, and a wash mitt. The choice of professionals.",
      price: "89.99",
      categoryId: kitsCat.id,
      stock: 20,
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599256621730-535171e28e50?q=80&w=800&auto=format&fit=crop"
      ],
      reviews: [
        { author: "Alex K.", rating: 5, comment: "The 344 bundle is everything you need. Exceptional value." }
      ]
    },
    {
      name: "Crystal Clear Glass Cleaner",
      slug: "glass-cleaner",
      description: "Ammonia-free formula that cuts through grime and film for streak-free results every time.",
      price: "12.99",
      categoryId: exteriorCat.id,
      stock: 100,
      isFeatured: false,
      images: [
        "https://images.unsplash.com/photo-1597328290883-50c5787b7c7e?q=80&w=800&auto=format&fit=crop"
      ],
      reviews: []
    }
  ];

  for (const p of productData) {
    const [product] = await db.insert(products).values({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      categoryId: p.categoryId,
      stock: p.stock,
      isFeatured: p.isFeatured,
    }).returning();

    if (p.images.length > 0) {
      await db.insert(productImages).values(
        p.images.map((url, idx) => ({
          productId: product.id,
          url,
          isPrimary: idx === 0,
        }))
      );
    }

    if (p.reviews.length > 0) {
      await db.insert(reviews).values(
        p.reviews.map(r => ({
          productId: product.id,
          ...r,
        }))
      );
    }
  }

  console.log("Seeding completed!");
}

seed().catch(console.error);
