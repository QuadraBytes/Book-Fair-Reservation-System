"use client";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import Button from "@/components/button";

const AdminSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    router.replace("/admin/login");
  };

  return (
  <aside className="w-1/5 min-h-screen sticky top-0 overflow-hidden p-14 flex flex-col justify-between">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/home-background.png)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      <div className="relative z-10">
        <h1 className="relative z-10 text-center font-serif text-3xl font-light uppercase leading-tight tracking-widest text-white mb-12 md:mb-16">
          COLOMBO
          <br />
          BOOK FAIR
        </h1>

        <nav className="flex flex-col gap-4">
          <Button
            variant={isActive("/admin/dashboard") ? "orange" : "white"}
            onClick={() => router.push("/admin/dashboard")}
            className="px-5 py-2.5 rounded-full text-sm w-full font-serif text-center cursor-pointer"
          > 
            Event Map
          </Button>
          <Button
            variant={isActive("/admin/users") ? "default" : "white"}
            onClick={() => router.push("/admin/users")}
            className="px-5 py-2.5 rounded-full text-sm w-full font-serif text-center cursor-pointer"
          >
            Users
          </Button>
        </nav>
      </div>

      <div className="relative z-10 mt-10">
        <div className="h-px w-full bg-white/40 mb-4" aria-hidden />
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 rounded-md text-sm font-serif text-white bg-transparent transition-colors duration-200 hover:bg-orange-600/25 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
