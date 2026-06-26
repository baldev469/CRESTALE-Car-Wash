"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Phone, Calendar, MapPin, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div>
                  <span className="text-blue-600 text-xs font-black uppercase tracking-widest">Booking System</span>
                  <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic mt-4">Book Your <br /> Detail Today.</h1>
                  <p className="text-gray-500 mt-6 text-lg">
                    Experience the Crestale standard. For professional detailing services and custom bookings, reach out to us directly.
                  </p>
                </div>

                <div className="space-y-6 pt-8">
                  <a 
                    href="tel:5105571963" 
                    className="flex items-center p-6 border-2 border-black hover:bg-black hover:text-white transition-all group"
                  >
                    <div className="bg-black text-white p-3 group-hover:bg-white group-hover:text-black transition-colors mr-6">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Call or Text for Booking</p>
                      <p className="text-2xl font-black tracking-tight">(510) 557-1963</p>
                    </div>
                  </a>

                  <div className="flex items-center p-6 bg-gray-50">
                    <div className="bg-blue-600 text-white p-3 mr-6">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Availability</p>
                      <p className="text-lg font-bold">Mon — Sat: 8am - 6pm</p>
                    </div>
                  </div>

                  <div className="flex items-center p-6 bg-gray-50">
                    <div className="bg-gray-200 text-black p-3 mr-6">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Service Area</p>
                      <p className="text-lg font-bold">Mobile Service Available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black text-white p-10 space-y-8 relative overflow-hidden">
                {isSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20 animate-in fade-in zoom-in duration-500">
                    <CheckCircle size={64} className="text-blue-500" />
                    <h2 className="text-3xl font-black uppercase tracking-tight italic">Request Received!</h2>
                    <p className="text-gray-400">We've received your booking request and will contact you shortly to confirm the appointment.</p>
                    <Button onClick={() => setIsSubmitted(false)} className="bg-white text-black">Send Another Request</Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black uppercase tracking-tight italic">Send a Message</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                        <input name="name" type="text" required className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-blue-500 outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                        <input name="phone" type="tel" required className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-blue-500 outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Service Required</label>
                        <select name="service" required className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-blue-500 outline-none transition-colors appearance-none">
                          <option className="bg-black text-white" value="Full Exterior Detail">Full Exterior Detail</option>
                          <option className="bg-black text-white" value="Interior Deep Clean">Interior Deep Clean</option>
                          <option className="bg-black text-white" value="Ceramic Coating">Ceramic Coating</option>
                          <option className="bg-black text-white" value="Paint Correction">Paint Correction</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
                        <textarea name="message" rows={4} className="w-full bg-transparent border-b border-gray-700 py-2 focus:border-blue-500 outline-none transition-colors resize-none" />
                      </div>
                      <Button 
                        disabled={isSubmitting}
                        className="w-full bg-white text-black hover:bg-gray-200"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
