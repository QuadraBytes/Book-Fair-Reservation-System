"use client";
import React, { useState } from "react";

const StallBookingPage = () => {
  const [stalls, setStalls] = useState([
    // Row 1
    "available", "available", "available", "available", "available", "available", "available", "not-available",
    // Row 2
    "available", "available", "available", "available", "available", "available", "available", "available",
    // Row 3
    "available", "not-available", "available", "selected", "selected", "available", "available", "available",
    // Row 4
    "available", "not-available", "available", "available", "available", "available", "available", "available",
    // Row 5
    "available", "available", "available", "available", "available", "available", "available", "available",
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


  const getStallColor = (status:string) => {
    switch (status) {
      case "selected":
        return "bg-orange-700";
      case "not-available":
        return "bg-black";
      default:
        return "bg-gray-300";
    }
  };

  const handleBooking = () => {
    const selectedStalls = stalls
      .map((status, index) => (status === "selected" ? index + 1 : null))
      .filter((stall) => stall !== null);

    if (selectedStalls.length === 0) {
      alert("Please select at least one stall");
      return;
    }

    alert(`Booking stalls: ${selectedStalls.join(", ")}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-light tracking-widest uppercase font-serif text-black">
          COLOMBO BOOK FAIR
        </h1>
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
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-light text-center mb-12 text-gray-800 font-serif">
          Event Map
        </h2>

        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl p-12 shadow-lg mb-8">
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

        {/* Legend + Button */}
        <div className="flex justify-between items-center">
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

          <button
            onClick={handleBooking}
            className="px-12 py-3 text-base font-medium text-white bg-orange-700 rounded-full cursor-pointer transition-all duration-300 hover:bg-orange-800 hover:-translate-y-0.5 active:translate-y-0"
          >
            Book
          </button>
        </div>
      </main>
    </div>
  );
};

export default StallBookingPage;
