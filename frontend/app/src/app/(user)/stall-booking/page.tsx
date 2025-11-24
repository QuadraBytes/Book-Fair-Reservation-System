"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import StallMap from "@/components/stallMap";
import { DEFAULT_STALL_CONFIGS } from "@/components/stallData";
import React, { useState } from "react";

const StallBookingPage = () => {
  const [selectedStallIds, setSelectedStallIds] = useState<string[]>([]);
  const [unavailableStallIds] = useState<string[]>([
    "A2",
    "A5",
    "B3",
    "C3",
    "C8",
    "D2",
    "D9",
  ]);

  const handleStallClick = (stallId: string) => {
    setSelectedStallIds((prev) => {
      if (prev.includes(stallId)) {
        return prev.filter((id) => id !== stallId);
      } else {
        return [...prev, stallId];
      }
    });
  };

  const handleBooking = () => {
    if (selectedStallIds.length === 0) {
      alert("Please select at least one stall");
      return;
    }

    const stallDetails = selectedStallIds
      .map((id) => {
        const config = DEFAULT_STALL_CONFIGS.find((s) => s.id === id);
        return config ? `${config.id} (${config.size})` : id;
      })
      .join(", ");

    alert(`Booking stalls: ${stallDetails}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Header />

      <main className="max-w-7xl mx-auto px-8 py-12 pt-24">
        <h2 className="text-3xl font-light text-center mb-12 text-gray-800 font-serif">
          Event Map - Select Your Stall
        </h2>

        <StallMap
          selectedStallIds={selectedStallIds}
          unavailableStallIds={unavailableStallIds}
          onStallClick={handleStallClick}
          showLegend={true}
        />

        <div className="flex justify-center mt-8 pb-10">
          <button
            onClick={handleBooking}
            className="px-12 py-3 text-base font-medium text-white bg-orange-700 rounded-full cursor-pointer transition-all duration-300 hover:bg-orange-800 hover:-translate-y-0.5 active:translate-y-0"
          >
            Book Selected Stalls
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StallBookingPage;
