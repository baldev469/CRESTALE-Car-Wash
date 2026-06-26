"use client";

import Link from "next/link";
import { useCart } from "@/store/useCart";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: string;
  image: string;
  category: string;
}

export function ProductCard({ id, name, slug, price, image, category }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/5] rounded-sm mb-4">
        <Link href={`/products/${slug}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <button
          onClick={() => addItem({ id, name, price, image, slug })}
          className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
        >
          <ShoppingCart size={18} />
        </button>
        {category && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-widest px-2 py-1 font-bold">
            {category}
          </span>
        )}
      </div>
      <Link href={`/products/${slug}`} className="block">
        <h3 className="text-sm font-semibold mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">${price}</p>
          <div className="flex items-center text-yellow-400">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] text-gray-400 ml-1 font-bold">4.9</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
