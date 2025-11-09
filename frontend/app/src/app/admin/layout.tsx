"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";

  const navItem = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link href={href} className="w-full">
        <Button
          variant={active ? "orange" : "white"}
          className="w-full text-sm"
        >
          {label}
        </Button>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 to-pink-50">
      <aside className="w-64 flex-shrink-0 bg-[url('/images/home-background.png')] bg-cover bg-center text-white">
        <div className="h-full backdrop-brightness-50 flex flex-col justify-between">
          <div>
            <div className="p-6 pt-8">
              <h2 className="text-3xl font-serif tracking-wider text-center">
                COLOMBO
                <br />
                BOOK FAIR
              </h2>
            </div>
            <div className="px-4">
              <div className="flex flex-col gap-3">
                {navItem("/admin/event-map", "Event Map")}
                {navItem("/admin/users", "Users")}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="h-[1px] bg-white/40 mb-4" />
            {navItem("/", "Logout")}
          </div>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-auto">{children}</main>
    </div>
  );
}
