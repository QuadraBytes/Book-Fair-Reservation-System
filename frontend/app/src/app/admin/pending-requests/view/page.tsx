"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, Phone, Calendar, Info, CheckCircle, XCircle } from "lucide-react";

const RequestDetailsPage = () => {
  const router = useRouter();

  // Temporary sample data – replace with real API later
  const request = {
    company: "Lake House Publishers",
    contact: "+94 70 123 4567",
    type: "Book Stall",
    date: "2025-02-12",
    stallNumbers: ["A3", "A4"],
    description: "A long-established publishing company participating in the Colombo Book Fair.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
        <div className="max-w-5xl mx-auto px-8 py-6 flex items-center gap-6">
          <button
            onClick={() => router.back()}
            className="w-12 h-12 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center transition-all shadow-md hover:scale-105"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Request Details</h1>
            <p className="text-gray-300 text-sm">Colombo Book Fair 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-8 py-10">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">

          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info size={28} className="text-orange-600" />
            Vendor Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="text-orange-700" />
                <p className="font-semibold text-gray-800">{request.company}</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-orange-700" />
                <p className="text-gray-700">{request.contact}</p>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-orange-700" />
                <p className="text-gray-700">
                  {new Date(request.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-semibold">Stall Numbers:</span>{" "}
                {request.stallNumbers.join(", ")}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Type:</span> {request.type}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{request.description}</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-10">

            <button
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-md transition-transform hover:scale-105"
            >
              <CheckCircle size={20} />
              Approve
            </button>

            <button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-md transition-transform hover:scale-105"
            >
              <XCircle size={20} />
              Reject
            </button>

          </div>

        </div>
      </main>
    </div>
  );
};

export default RequestDetailsPage;
