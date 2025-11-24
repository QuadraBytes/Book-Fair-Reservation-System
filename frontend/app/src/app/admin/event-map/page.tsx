"use client";
import React, { useState } from "react";
import StallMap, { Stall, MapElement } from "@/components/stallMap";

const AdminEventMapPage = () => {
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

  const availableCount = stalls.filter((s) => s.status === "available").length;
  const bookedCount = stalls.filter((s) => s.status === "not-available").length;
  const selectedCount = stalls.filter((s) => s.status === "selected").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-800 font-serif mb-2">
            Event Map Overview
          </h1>
          <p className="text-gray-600">View the current status of all stalls</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-gray-600 text-sm mb-2">Total Stalls</div>
            <div className="text-3xl font-bold text-gray-800">
              {stalls.length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-gray-600 text-sm mb-2">Available</div>
            <div className="text-3xl font-bold text-green-600">
              {availableCount}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-gray-600 text-sm mb-2">Booked</div>
            <div className="text-3xl font-bold text-orange-600">
              {selectedCount}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-gray-600 text-sm mb-2">Not Available</div>
            <div className="text-3xl font-bold text-gray-800">
              {bookedCount}
            </div>
          </div>
        </div>

        <StallMap
          stalls={stalls}
          mapElements={mapElements}
          showLegend={true}
          readonly={true}
        />
      </div>
    </div>
  );
};

export default AdminEventMapPage;
