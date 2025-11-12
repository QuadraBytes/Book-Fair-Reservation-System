"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const BookingDetailsPage = () => {
  const bookingData = {
    company: "ABC Company",
    stalls: "A1, B3",
    contact: "0704352515421",
    social: "FB, Insta",
    type: "Educational",
    location: "Peradeniya, Kandy"
  };

  const stalls = [
    "available", "available", "available", "available", "available", "available", "available", "not-available",
    "available", "available", "available", "available", "available", "available", "available", "available",
    "available", "not-available", "available", "booked", "booked", "available", "available", "available",
    "available", "not-available", "available", "available", "available", "available", "available", "available",
    "available", "available", "available", "available", "available", "available", "available", "available"
  ];

  const getStallColor = (status: string) => {
    switch (status) {
      case "booked":
        return "bg-orange-700";
      case "not-available":
        return "bg-black";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Header />

      <main className="max-w-4xl mx-auto px-8 py-12 pt-24">
        <h2 className="text-3xl font-light text-center mb-12 text-gray-800 font-serif">
          Your Booking Details
        </h2>

        {/* Booking Details Card */}
        <div className="bg-white rounded-3xl p-12 mb-8 shadow-[0_20px_60px_rgba(255,122,0,0.12)]">
          <div className="space-y-6">
            <div className="flex border-b border-gray-100 pb-4">
              <span className="w-32 text-gray-600 font-medium">Company:</span>
              <span className="text-gray-800">{bookingData.company}</span>
            </div>
            <div className="flex border-b border-gray-100 pb-4">
              <span className="w-32 text-gray-600 font-medium">Stalls:</span>
              <span className="text-gray-800">{bookingData.stalls}</span>
            </div>
            <div className="flex border-b border-gray-100 pb-4">
              <span className="w-32 text-gray-600 font-medium">Contact:</span>
              <span className="text-gray-800">{bookingData.contact}</span>
            </div>
            <div className="flex border-b border-gray-100 pb-4">
              <span className="w-32 text-gray-600 font-medium">Social:</span>
              <span className="text-gray-800">{bookingData.social}</span>
            </div>
            <div className="flex border-b border-gray-100 pb-4">
              <span className="w-32 text-gray-600 font-medium">Type:</span>
              <span className="text-gray-800">{bookingData.type}</span>
            </div>
            <div className="flex pb-2">
              <span className="w-32 text-gray-600 font-medium">Location:</span>
              <span className="text-gray-800">{bookingData.location}</span>
            </div>
          </div>
        </div>

        {/* Event Map Section */}
        <h3 className="text-2xl font-light text-center mb-8 text-gray-800 font-serif">
          Event Map
        </h3>

        <div className="bg-white rounded-3xl p-12 mb-8 shadow-[0_20px_60px_rgba(255,122,0,0.12)]">
          <div className="grid grid-cols-8 gap-4">
            {stalls.map((status, index) => (
              <div
                key={index}
                className={`
                  aspect-square rounded-lg
                  ${getStallColor(status)}
                `}
                aria-label={`Stall ${index + 1} - ${status}`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-700 rounded"></div>
              <span className="text-sm text-gray-700">Your Bookings</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingDetailsPage;