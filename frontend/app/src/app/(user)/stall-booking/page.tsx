"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import StallMap, { Stall, MapElement } from "@/components/stallMap";
import React, { useState } from "react";

const StallBookingPage = () => {
  const [stalls, setStalls] = useState<Stall[]>([
    // Row 0 - Top section with large stalls
    {
      id: "A1",
      size: "large",
      status: "available",
      row: 0,
      col: 0,
      colspan: 2,
      rowspan: 2,
    },
    {
      id: "A2",
      size: "large",
      status: "not-available",
      row: 0,
      col: 2,
      colspan: 2,
      rowspan: 2,
    },
    {
      id: "A3",
      size: "large",
      status: "available",
      row: 0,
      col: 4,
      colspan: 2,
      rowspan: 2,
    },
    {
      id: "A4",
      size: "large",
      status: "available",
      row: 0,
      col: 6,
      colspan: 2,
      rowspan: 2,
    },
    {
      id: "A5",
      size: "large",
      status: "not-available",
      row: 0,
      col: 8,
      colspan: 2,
      rowspan: 2,
    },

    // Row 2 - Medium stalls
    {
      id: "B1",
      size: "medium",
      status: "available",
      row: 2,
      col: 1,
      colspan: 2,
    },
    {
      id: "B2",
      size: "medium",
      status: "available",
      row: 2,
      col: 3,
      colspan: 2,
    },
    {
      id: "B3",
      size: "medium",
      status: "not-available",
      row: 2,
      col: 5,
      colspan: 2,
    },
    {
      id: "B4",
      size: "medium",
      status: "available",
      row: 2,
      col: 7,
      colspan: 2,
    },
    {
      id: "B5",
      size: "medium",
      status: "available",
      row: 2,
      col: 9,
      colspan: 2,
    },

    // Row 3 - Small stalls left side
    { id: "C1", size: "small", status: "available", row: 3, col: 0 },
    { id: "C2", size: "small", status: "available", row: 3, col: 1 },
    { id: "C3", size: "small", status: "not-available", row: 3, col: 2 },
    { id: "C4", size: "small", status: "available", row: 3, col: 3 },
    { id: "C5", size: "small", status: "available", row: 3, col: 4 },

    // Row 3 - Small stalls right side
    { id: "C6", size: "small", status: "available", row: 3, col: 6 },
    { id: "C7", size: "small", status: "available", row: 3, col: 7 },
    { id: "C8", size: "small", status: "not-available", row: 3, col: 8 },
    { id: "C9", size: "small", status: "available", row: 3, col: 9 },
    { id: "C10", size: "small", status: "available", row: 3, col: 10 },

    // Row 4 - Small stalls left side
    { id: "D1", size: "small", status: "available", row: 4, col: 0 },
    { id: "D2", size: "small", status: "not-available", row: 4, col: 1 },
    { id: "D3", size: "small", status: "available", row: 4, col: 2 },
    { id: "D4", size: "small", status: "available", row: 4, col: 3 },
    { id: "D5", size: "small", status: "available", row: 4, col: 4 },

    // Row 4 - Small stalls right side
    { id: "D6", size: "small", status: "available", row: 4, col: 6 },
    { id: "D7", size: "small", status: "available", row: 4, col: 7 },
    { id: "D8", size: "small", status: "available", row: 4, col: 8 },
    { id: "D9", size: "small", status: "not-available", row: 4, col: 9 },
  ]);

  // Map elements (entrance, exit, restrooms, info desk)
  const mapElements: MapElement[] = [
    { type: "entrance", label: "ENTRANCE", row: 3, col: 5, rowspan: 2 },
    { type: "exit", label: "EXIT", row: 4, col: 10, rowspan: 1 },
    { type: "restroom", label: "🚻", row: 0, col: 10 },
    { type: "restroom", label: "🚻", row: 1, col: 10 },
    { type: "info", label: "INFO", row: 2, col: 0 },
  ];

  const handleStallClick = (stallId: string) => {
    setStalls((prevStalls) =>
      prevStalls.map((stall) => {
        if (stall.id === stallId) {
          return {
            ...stall,
            status:
              stall.status === "available"
                ? "selected"
                : stall.status === "selected"
                ? "available"
                : stall.status,
          };
        }
        return stall;
      })
    );
  };

  const handleBooking = () => {
    const selectedStalls = stalls
      .filter((stall) => stall.status === "selected")
      .map((stall) => stall.id);

    if (selectedStalls.length === 0) {
      alert("Please select at least one stall");
      return;
    }

    const stallDetails = stalls
      .filter((stall) => stall.status === "selected")
      .map((stall) => `${stall.id} (${stall.size})`)
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
          stalls={stalls}
          mapElements={mapElements}
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
