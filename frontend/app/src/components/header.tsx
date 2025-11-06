"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ` +
        (scrolled
          ? "bg-white/60 backdrop-blur-sm shadow-sm border-b border-gray-200"
          : "bg-transparent")
      }
    >
      <div
        className={`mx-auto  w-full px-8 flex justify-between py-4 space-between`}
      >
        <h1 className="text-2xl font-light tracking-widest uppercase font-serif text-black">
          COLOMBO BOOK FAIR
        </h1>

        <div className="flex gap-4 justify-end">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
