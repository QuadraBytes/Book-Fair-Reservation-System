import React from 'react';
import './footer.css';
import Button from '../button/button';

function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center text-white py-20"
      style={{
        backgroundImage: "url('/footer%20img.jpg')",
      }}
    >
      {/* Overlay for dim effect */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif tracking-widest">
          COLOMBO BOOK FAIR
        </h1>

        <Button variant="white" className="px-6 py-2 rounded-full font-medium">Book Your Stall</Button>

        <div className="mt-4 text-lg">
          <p>bookfair@gmail.com</p>
          <p>070-12345678</p>
        </div>

        <div className="relative z-10 text-center py-4 text-sm text-gray-300">
            All Rights Reserved @ {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
