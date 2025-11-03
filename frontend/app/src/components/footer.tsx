"use client";
import React from "react";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

const Footer: React.FC = () => {

  const router = useRouter();

   const handleRoute = () =>{
    router.replace("/stallbooking");
  }
  return (
    <footer
      className="relative bg-cover bg-center text-white py-20"
      style={{
        backgroundImage: "url('/home-footer.png')", // ✅ use public folder path
      }}
    >
      {/* Dark overlay for dim effect */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif tracking-widest">
          COLOMBO BOOK FAIR
        </h1>

        <Button variant="white" className="px-6 py-2 rounded-full font-medium" onClick={handleRoute}>
          Book Your Stall
        </Button>

        <div className="mt-4 text-lg">
          <p>bookfair@gmail.com</p>
          <p>070-12345678</p>
        </div>

        <div className="relative z-10 text-center py-4 text-sm text-gray-300">
          All Rights Reserved © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
