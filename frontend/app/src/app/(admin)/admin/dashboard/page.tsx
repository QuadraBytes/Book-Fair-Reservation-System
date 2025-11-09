"use client";
import AdminSidebar from "@/components/adminSidebar";
import React, { useState } from "react";

const AdminDashBoard = () => {
  const [stalls, setStalls] = useState([
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "not-available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "not-available",
    "available",
    "selected",
    "selected",
    "available",
    "available",
    "available",
    "available",
    "not-available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
    "available",
  ]);
  const handleStallClick = (index: number) => {
    const newStalls = [...stalls];
    if (newStalls[index] === "available") {
      newStalls[index] = "selected";
    } else if (newStalls[index] === "selected") {
      newStalls[index] = "available";
    }
    setStalls(newStalls);
  };

  const getStallColor = (status: string) => {
    switch (status) {
      case "selected":
        return "bg-orange-700";
      case "not-available":
        return "bg-black";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gradient-to-br from-orange-50 to-pink-50">
        <main className="max-w-5xl mx-auto px-8 py-8 pt-8 md:pt-14 ">
            <h2 className="text-3xl font-light text-center mb-12 text-gray-800 font-serif">
            Event Map
            </h2>

            <div className="relative mb-8">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[calc(100%+32px)] w-[calc(100%+32px)] rounded-3xl blur-[28px] md:h-[calc(100%+48px)] md:w-[calc(100%+48px)] md:rounded-3xl md:blur-[36px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_10%,rgba(194,65,12,0.55)_40%,rgba(255,122,0,0.22)_80%,rgba(255,122,0,0)_100%)]"
            />

            <div className="relative z-10 bg-white rounded-3xl p-12 shadow-lg">
                <div className="grid grid-cols-8 gap-4">
                {stalls.map((status, index) => (
                <button
                    key={index}
                    onClick={() => handleStallClick(index)}
                    disabled={status === "not-available"}
                    className={`
                    aspect-square rounded-lg transition-all duration-300
                    ${getStallColor(status)}
                    ${
                        status === "not-available"
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:scale-105 hover:shadow-md"
                    }
                    `}
                    aria-label={`Stall ${index + 1} - ${status}`}
                />
                ))}
                </div>
            </div>
            </div>

            <div className="flex justify-center items-center">
            <div className="flex gap-8">
                <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-700 rounded"></div>
                <span className="text-sm text-gray-700">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded"></div>
                <span className="text-sm text-gray-700">Not Available</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <span className="text-sm text-gray-700">Available</span>
                </div>
            </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashBoard;
