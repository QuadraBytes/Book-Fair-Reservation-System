"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";

const AddDetailsPage: React.FC = () => {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("");
  const [social, setSocial] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", { company, contact, type, social, location });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-12 py-8">
        <h1 className="font-serif text-3xl font-light uppercase tracking-wider text-gray-800">
          COLOMBO BOOK FAIR
        </h1>
        
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 transition-colors duration-300 hover:bg-gray-700">
          <svg
            className="h-6 w-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 pt-32 pb-16">
        <div className="w-full max-w-3xl px-8">
          <h2 className="mb-12 text-center font-serif text-4xl font-light text-gray-800">
            Add Your Details
          </h2>

          <div className="rounded-3xl bg-white px-12 py-10 shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="company"
                    className="text-base font-normal font-serif text-gray-800"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors duration-300 focus:border-orange-700"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact"
                    className="text-base font-normal font-serif text-gray-800"
                  >
                    Contact
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors duration-300 focus:border-orange-700"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>

                {/* Type */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="type"
                    className="text-base font-normal font-serif text-gray-800"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors duration-300 focus:border-orange-700"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </div>

                {/* Social */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="social"
                    className="text-base font-normal  font-serif text-gray-800"
                  >
                    Social
                  </label>
                  <input
                    type="text"
                    id="social"
                    className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors duration-300 focus:border-orange-700"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Location (Full Width) */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="location"
                  className="text-base font-normal font-serif text-gray-800"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors duration-300 focus:border-orange-700"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex justify-center">
                <Button variant="orange" className="z-20 min-w-[200px] font-serif">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AddDetailsPage;