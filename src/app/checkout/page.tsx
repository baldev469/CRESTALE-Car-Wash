"use client";

import { useCart } from "@/store/useCart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    clearCart();
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Order Received!</h1>
          <p className="text-gray-500">
            Thank you for choosing Crestale. Your order has been placed and is being prepared for shipment. You will receive a confirmation email shortly.
          </p>
          <Button href="/" className="w-full">Return Home</Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold uppercase tracking-tight mb-4">Your cart is empty</h1>
          <Button href="/shop">Go to Shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/shop" className="inline-flex items-center text-xs font-bold uppercase tracking-widest mb-12 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] mr-3">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border focus:border-black outline-none rounded-sm bg-white" required />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] mr-3">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full px-4 py-3 border focus:border-black outline-none rounded-sm bg-white" required />
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 border focus:border-black outline-none rounded-sm bg-white" required />
                <input type="text" placeholder="Address" className="w-full col-span-2 px-4 py-3 border focus:border-black outline-none rounded-sm bg-white" required />
                <input type="text" placeholder="City" className="w-full px-4 py-3 border focus:border-black outline-none rounded-sm bg-white" required />
                <input type="text" placeholder="Zip Code" className="w-full px-4 py-3 border focus:border-black outline-none rounded-sm bg-white" required />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] mr-3">3</span>
                Payment
              </h2>
              <div className="p-6 border rounded-sm bg-white space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <CreditCard size={20} className="mr-3" />
                    <span className="font-semibold text-sm uppercase tracking-widest">Credit Card</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-5 bg-gray-200 rounded" />
                    <div className="w-8 h-5 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <input type="text" placeholder="Card Number" className="w-full col-span-2 px-4 py-3 border focus:border-black outline-none rounded-sm" />
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border focus:border-black outline-none rounded-sm" />
                  <input type="text" placeholder="CVC" className="w-full px-4 py-3 border focus:border-black outline-none rounded-sm" />
                </div>
              </div>
            </section>

            <Button onClick={handleCheckout} size="lg" className="w-full py-6">Complete Order • ${totalPrice().toFixed(2)}</Button>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-12 h-fit space-y-8">
            <div className="bg-white p-8 rounded-sm shadow-sm border">
              <h2 className="text-lg font-bold uppercase tracking-tight mb-6">Order Summary</h2>
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="w-16 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xs font-bold uppercase tracking-tight">{item.name}</h3>
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                  <span className="text-green-600 uppercase tracking-widest text-[10px] font-bold">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-100 uppercase tracking-tighter">
                  <span>Total</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 text-gray-400">
              <ShieldCheck size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
