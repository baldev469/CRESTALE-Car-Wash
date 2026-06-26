import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tighter">CRESTALE</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium car care products for those who demand excellence. Engineered for professionals, designed for enthusiasts.
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=exterior-care" className="hover:text-white transition-colors">Exterior Care</Link></li>
              <li><Link href="/shop?category=interior-detail" className="hover:text-white transition-colors">Interior Detail</Link></li>
              <li><Link href="/shop?category=complete-kits" className="hover:text-white transition-colors">Kits & Bundles</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Contact & Booking</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="tel:5105571963" className="hover:text-white transition-colors font-bold text-white">(510) 557-1963</a></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Book a Detail</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Support FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex border-b border-gray-700 pb-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent text-sm w-full focus:outline-none"
              />
              <button className="text-xs uppercase font-bold hover:text-blue-500 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] uppercase tracking-widest text-gray-500">
          <p>© 2024 CRESTALE CAR CARE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
