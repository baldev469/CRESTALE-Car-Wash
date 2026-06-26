"use client";

import { useCart, CartItem } from "@/store/useCart";
import { Button } from "./ui/Button";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export function AddToCartButton({ product }: { product: Omit<CartItem, 'quantity'> }) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Button 
      onClick={handleAdd}
      className="w-full py-6 flex items-center justify-center space-x-3 text-sm font-bold"
      disabled={isAdding}
    >
      <ShoppingBag size={20} />
      <span>{isAdding ? "Added to Cart" : "Add to Cart"}</span>
    </Button>
  );
}
