"use client";

import React from "react";
import Button from "@/components/button";
import StepSection from "@/components/stepSection";
import Footer from "@/components/footer"; 

const HomePagePublic: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* HERO SECTION */}
      <section className="relative flex h-[90vh] flex-col items-center justify-center overflow-hidden text-center text-white">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1500 680"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="heroClip">
              <path d="M 0,0 L 0,380 Q 750,760 1500,380 L 1500,0 Z" />
            </clipPath>

            <path
              id="heroBackgroundShape"
              d="M 0,0 L 0,420 Q 750,840 1500,420 L 1500,0 Z"
            />

            <radialGradient id="orangeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="80%" stopColor="#de600b" />
              <stop offset="100%" stopColor="#ffffff" />
            </radialGradient>

            <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="24" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <use href="#heroBackgroundShape" fill="url(#orangeGradient)" opacity="0.8" />

          <image
            href="/home-background.png"
            width="1500"
            height="600"
            clipPath="url(#heroClip)"
            preserveAspectRatio="xMidYMid slice"
          />

          <rect x="0" y="0" width="1500" height="600" clipPath="url(#heroClip)" fill="rgba(0,0,0,0.35)" />
        </svg>

        <div className="relative z-10 px-6">
          <h1 className="mb-4 text-5xl font-bold md:text-6xl">Colombo Book Fair</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            Sri Lanka’s largest celebration of books, bringing together readers,
            writers, and publishers from across the country.
          </p>
        </div>

        {/* Curve blur + center button */}
        <div className="absolute bottom-0 left-0 right-0 flex h-[220px] items-center justify-center">
          <div className="absolute -top-12 h-[200px] w-[380px] rounded-full bg-orange-500/40 blur-[60px]" />
          <Button variant="orange" className="z-20">
            Book Your Stall
          </Button>
        </div>
      </section>

      {/* STEPS */}
      <StepSection
        step={1}
        title="Choose Your Stall"
        description="Browse the available spaces and select the perfect spot for your book display at the fair."
        image="/book-fair-table.png"
      />
      <StepSection
        step={2}
        title="Add Your Details"
        description="Provide essential information such as exhibitor name, contact details, and stall preferences."
        image="/home-open-book.png"
        reverse
      />
      <StepSection
        step={3}
        title="Get QR Access"
        description="Receive a unique QR code for instant entry and management of your reserved stalls at the event."
        image="/home-book-stall.png"
      />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default HomePagePublic;
