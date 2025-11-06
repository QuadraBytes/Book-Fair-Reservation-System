"use client";

import React from "react";
import Button from "@/components/button";
import StepSection from "@/components/stepSection";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Hero from "@/components/hero";

const HomePagePublic: React.FC = () => {
  const router = useRouter();
  const handleStallBooking = () => {
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <section className="relative flex h-[90vh] flex-col items-center justify-center overflow-hidden text-center text-white mb-20">
        <Hero />
      </section>

      <div className="relative z-20 mt-8 md:-mt-6 lg:-mt-28 mb-12 flex justify-center">
        <Button
          variant="orange"
          className="text-lg cursor-pointer"
          onClick={handleStallBooking}
        >
          Book Your Stall
        </Button>
      </div>

      <StepSection
        step={1}
        title="Choose Your Stall"
        description="Browse the available spaces and select the perfect spot for your book display at the fair."
        image="/images/book-fair-table.png"
      />
      <StepSection
        step={2}
        title="Add Your Details"
        description="Provide essential information such as exhibitor name, contact details, and stall preferences."
        image="/images/home-open-book.png"
        reverse
      />
      <StepSection
        step={3}
        title="Get QR Access"
        description="Receive a unique QR code for instant entry and management of your reserved stalls at the event."
        image="/images/home-book-stall.png"
      />

      <Footer />
    </div>
  );
};

export default HomePagePublic;
