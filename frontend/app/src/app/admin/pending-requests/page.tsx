"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Phone, Building2, Calendar, FileText, Eye } from "lucide-react";

const PendingRequestsPage: React.FC = () => {
  const router = useRouter();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const pendingList = [
    {
      vendor: "Lake House Publishers",
      contact: "+94 70 123 4567",
      date: "2025-02-12",
      status: "Pending",
      stallNumbers: ["A3", "A4"],
    },
    {
      vendor: "Sarasavi Book Shop",
      contact: "+94 77 222 3333",
      date: "2025-02-13",
      status: "Pending",
      stallNumbers: ["B7"],
    },
    {
      vendor: "M.D. Gunasena",
      contact: "+94 71 555 8888",
      date: "2025-02-13",
      status: "Pending",
      stallNumbers: ["C2", "C3"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="flex items-center gap-6 px-8 py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
            <button
              onClick={() => router.back()}
              className="w-12 h-12 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ArrowLeft className="text-white" size={20} />
            </button>

            <div>
              <h1 className="text-4xl font-bold text-white mb-1">Pending Requests</h1>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left py-5 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} />
                      Vendor
                    </div>
                  </th>

                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      Contact
                    </div>
                  </th>

                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      Date
                    </div>
                  </th>

                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="text-center py-5 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {pendingList.map((req, i) => (
                  <tr
                    key={i}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`border-b border-gray-100 transition-all duration-200 ${
                      hoveredRow === i
                        ? "bg-gradient-to-r from-orange-50 to-pink-50 shadow-md"
                        : i % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50/50"
                    }`}
                  >
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {req.vendor.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{req.vendor}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Stalls: {req.stallNumbers.join(", ")}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-6 px-6 font-medium">{req.contact}</td>

                    <td className="py-6 px-6 font-medium">
                      {new Date(req.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-6 px-6">
                      <span className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-orange-200 to-orange-300 text-orange-900 font-bold shadow-sm flex items-center w-fit">
                        <Clock size={14} className="inline mr-1" />
                        {req.status}
                      </span>
                    </td>

                    <td className="py-6 px-8 text-center">
                      <button
                        onClick={() => router.push(`/pending-requests/view`)}
                        className={`px-6 py-2.5 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2 mx-auto shadow-md ${
                          hoveredRow === i
                            ? "bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg transform scale-105"
                            : "bg-orange-700 hover:bg-orange-800"
                        }`}
                      >
                        <Eye size={18} />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pendingList.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                  <FileText size={48} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No pending requests found.</p>
                <p className="text-gray-400 text-sm mt-2">
                  All requests have been processed.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PendingRequestsPage;
