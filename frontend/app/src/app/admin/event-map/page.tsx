"use client";
import React from "react";
import StallMap from "@/components/stallMap";
import { DEFAULT_STALL_CONFIGS } from "@/components/stallData";

const AdminEventMapPage = () => {
  const selectedStallIds = ["A3", "B1", "B4", "C2", "C5", "D3", "D5"];
  const unavailableStallIds = ["A2", "A5", "B3", "C3", "C8", "D2", "D9"];

  const totalStalls = DEFAULT_STALL_CONFIGS.length;
  const availableCount =
    totalStalls - selectedStallIds.length - unavailableStallIds.length;
  const bookedCount = selectedStallIds.length;
  const notAvailableCount = unavailableStallIds.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-800 font-serif mb-2">
            Event Map Overview
          </h1>
          <p className="text-gray-600">View the current status of all stalls</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-gray-600 text-sm mb-2">Total Stalls</div>
            <div className="text-3xl font-bold text-gray-800">
              {totalStalls}
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
              {bookedCount}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-gray-600 text-sm mb-2">Not Available</div>
            <div className="text-3xl font-bold text-gray-800">
              {notAvailableCount}
            </div>
          </div>
        </div>

        <StallMap
          selectedStallIds={selectedStallIds}
          unavailableStallIds={unavailableStallIds}
          showLegend={true}
          readonly={true}
        />
      </div>
    </div>
  );
};

export default AdminEventMapPage;
