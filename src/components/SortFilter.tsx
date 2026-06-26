"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">Sort By:</span>
      <select 
        className="bg-transparent text-[10px] font-bold uppercase tracking-widest focus:outline-none border-b border-black pb-1 cursor-pointer"
        value={currentSort}
        onChange={handleChange}
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
