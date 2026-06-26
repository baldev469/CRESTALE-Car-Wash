"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/store/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems, items, updateQuantity, removeItem, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const itemCount = mounted ? totalItems() : 0;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-black">
            CRESTALE
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest">
            <Link href="/shop" className="hover:text-blue-600 transition-colors">Shop All</Link>
            <Link href="/shop?category=exterior-care" className="hover:text-blue-600 transition-colors">Exterior</Link>
            <Link href="/shop?category=interior-detail" className="hover:text-blue-600 transition-colors">Interior</Link>
            <Link href="/shop?category=complete-kits" className="hover:text-blue-600 transition-colors">Kits</Link>
            <Link href="/contact" className="bg-blue-600 text-white px-4 py-2 rounded-sm text-[10px] font-bold hover:bg-blue-700 transition-colors">Book Service</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-black/5 rounded-full transition-colors relative"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b">
                <h2 className="text-xl font-bold uppercase tracking-tight">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingCart size={48} className="text-gray-300" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <Button onClick={() => setIsCartOpen(false)} href="/shop">Start Shopping</Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="w-20 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <p className="text-gray-500 text-sm">${item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >-</button>
                            <span className="px-3 text-xs">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >+</button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-500 underline"
                          >Remove</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t bg-gray-50 space-y-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Subtotal</span>
                    <span>${totalPrice().toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <Button href="/checkout" className="w-full py-4 text-center">Checkout</Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
