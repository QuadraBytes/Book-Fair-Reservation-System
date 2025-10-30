import React from "react";
import './StepSection.css'

const StepSection = ({ step, title, description, image, reverse }) => {
  return (
    <div
      className={`step-section flex flex-col md:flex-row items-center justify-between gap-8 py-16 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="relative w-full md:w-1/2 flex justify-center">
        <div className="step-image-wrap">
          <div className="step-image-blur" aria-hidden="true"></div>
          <img
            src={image}
            alt={title}
            className="step-img rounded-2xl shadow-lg w-80 md:w-96 object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-4 text-maroon-700 font-serif tracking-widest">
          {title}
        </h1>
        <p className="step-number mb-3 text-2xl font-serif tracking-widest">Step {step}</p>
        <p className="text-gray-700 text-lg font-serif tracking-widest">{description}</p>
      </div>
    </div>
  );
};

export default StepSection;
