"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Phone, User, Calendar, MessageSquare, ShieldCheck, Clock } from "lucide-react";

interface Booking {
  id: number;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function OwnerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // We'll check the key via a small API call to keep it secure
    try {
      const res = await fetch("/api/auth/owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: inputKey }),
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        const data = await fetch("/api/bookings");
        setBookings(await data.json());
      } else {
        setError("Invalid Access Key");
      }
    } catch (err) {
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-10 rounded-sm shadow-2xl space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-black uppercase tracking-tighter italic">Owner Access</h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Enter your security key to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Security Key" 
              className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none transition-colors text-center text-lg tracking-widest"
            />
            {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center">{error}</p>}
            <Button className="w-full py-4">Unlock Dashboard</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic">Owner Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Manage your service bookings and inquiries.</p>
            </div>
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              <ShieldCheck size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Verified Owner</span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-sm" />
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-40 bg-white border border-dashed border-gray-300 rounded-sm">
              <Clock size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">No bookings found yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white p-6 shadow-sm border border-gray-100 hover:border-black transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-black text-white p-2 rounded-sm group-hover:bg-blue-600 transition-colors">
                      <Calendar size={20} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User size={16} className="text-gray-400" />
                      <span className="font-bold text-sm uppercase">{booking.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone size={16} className="text-gray-400" />
                      <a href={`tel:${booking.customerPhone}`} className="text-sm font-medium hover:text-blue-600 underline decoration-dotted">
                        {booking.customerPhone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()} at {new Date(booking.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-50">
                      <p className="text-[10px] uppercase tracking-widest font-black text-blue-600 mb-1">Service</p>
                      <p className="text-sm font-bold italic uppercase tracking-tight">{booking.serviceType}</p>
                    </div>

                    {booking.message && (
                      <div className="pt-2">
                        <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">Message</p>
                        <p className="text-xs text-gray-600 leading-relaxed italic">"{booking.message}"</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
