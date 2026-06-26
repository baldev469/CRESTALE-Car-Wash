import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <span className="text-blue-600 text-xs font-black uppercase tracking-widest">Our Heritage</span>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">Engineered for <br /> Automotive Perfection.</h1>
            </div>

            <div className="aspect-video bg-gray-100 rounded-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552933529-e359b2477262?q=80&w=1200&auto=format&fit=crop" 
                alt="Detailing shop" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-600 leading-relaxed">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black uppercase tracking-tight italic">The Crestale Philosophy</h2>
                <p>
                  Founded in 2018, Crestale was born out of a single obsession: the pursuit of the perfect finish. We watched as the market became flooded with diluted soaps and waxes that promised much but delivered little.
                </p>
                <p>
                  We decided to do things differently. By partnering with chemical engineers and professional detailers, we developed a range of products that are concentrated, effective, and safe for all surfaces.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-black uppercase tracking-tight italic">Beyond the Bottle</h2>
                <p>
                  At Crestale, we believe car care is more than just maintenance—it's a ritual. It's about the connection between the driver and the machine. Our products are designed to make that ritual as rewarding as the results.
                </p>
                <p>
                  Every formula is tested against the harshest environments to ensure that when you use Crestale, you're using the best in the world.
                </p>
                <Button href="/shop" variant="secondary">Experience the Difference</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
