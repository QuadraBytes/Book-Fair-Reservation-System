import React from 'react'
import Footer from '../../components/footer/Footer'
import Button from '../../components/button/button'
import StepSection from '../../components/step section/StepSection'
import './home.css'

function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="hero relative h-[90vh] flex flex-col items-center justify-center text-center text-white">
                {/* Hero SVG (clipped image + overlays) rendered below */}

                <svg
                className="absolute inset-0 w-full h-full hero-svg"
                viewBox="0 0 1500 680"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                >
                <defs>
                    {/* Clip path for the main hero image */}
                    <clipPath id="heroClip">
                    <path d="M 0,0 L 0,380 Q 750,760 1500,380 L 1500,0 Z" />
                    </clipPath>

                    {/* Slightly larger version for background gradient layer */}
                    <path id="heroBackgroundShape" d="M 0,0 L 0,420 Q 750,840 1500,420 L 1500,0 Z" />

                    {/* Gradient definition */}
                    <radialGradient id="orangeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="80%" stopColor="#de600b" />   {/* dark orange top */}
                    <stop offset="100%" stopColor="#ffffff" />  {/* white bottom */}
                    </radialGradient>

                    {/* Blur filter reused */}
                    <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="24" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                    </filter>
                </defs>

                {/* BACKGROUND gradient shape — bottom layer */}
                <use href="#heroBackgroundShape" fill="url(#orangeGradient)" opacity="0.8" />

                {/* Main hero image clipped by curved path */}
                <image
                    href="home-background.png"
                    width="1500"
                    height="600"
                    clipPath="url(#heroClip)"
                    preserveAspectRatio="xMidYMid slice"
                />

                {/* Overlay for dark effect */}
                <rect x="0" y="0" width="1500" height="600" clipPath="url(#heroClip)" fill="rgba(0,0,0,0.35)" />
                </svg>

                <div className="absolute inset-0 "></div>
                <div className="relative z-10 px-6 hero-content">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Colombo Book Fair</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Sri Lanka’s largest celebration of books, brings together readers, writers, and publishers from across the country.
                    </p>
                </div>

                {/* Keep a small curve-blur element for depth and a centered curve button */}
                <div className="hero-curve" aria-hidden="true">
                    <div className="curve-blur"></div>
                    <div className="curve-button-wrap">
                        <Button variant="orange" className="px-6 py-2 rounded-full font-medium">Book Your Stall</Button>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <StepSection
                step="01"
                title="Choose Your Stall"
                description="Browse the available spaces and select the perfect spot for your book display at the fair."
                image="book-fair-table.png"
            />
            <StepSection
                step="02"
                title="Add Your Details"
                description="Provide essential information such as exhibitor name, contact details, and stall preferences."
                image="home-open-book.png"
                reverse
            />
            <StepSection
                step="03"
                title="Get QR Access"
                description="Receive a unique QR code for instant entry and management of your reserved stalls at the event."
                image="home-book-stall.png"
            />

            {/* Footer component */}
            <Footer />
        </div>
    )
}

export default Home