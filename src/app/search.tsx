"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex justify-end">
      <input
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        type="text"
        placeholder="Anahtar kelime"
        className="py-2 px-2 rounded-md"
      />
      <button
        className="ml-4 bg-black text-white py-2 px-5 rounded-md"
        onClick={() => {
          const query = keyword ? `?arama=${keyword}` : "";
          router.push(`${pathname}${query}`);
        }}
      >
        Ara
      </button>
    </div>
  );
}
