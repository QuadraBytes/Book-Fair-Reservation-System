import React from "react";
import clsx from "clsx";

type StepSectionProps = {
  step: number;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  className?: string;
};

const StepSection: React.FC<StepSectionProps> = ({
  step,
  title,
  description,
  image,
  reverse = false,
  className,
}) => {
  return (
    <section
      className={clsx(
        // width ~80% centered
        "mx-auto w-[80%]",
        // layout
        "flex flex-col items-center justify-between gap-8 py-16 md:flex-row",
        reverse && "md:flex-row-reverse",
        className
      )}
    >
      {/* Image + glow wrapper */}
      <div className="relative flex w-full justify-center md:w-1/2">
        <div className="relative inline-block">
          {/* Glow/blur background */}
          <div
            aria-hidden="true"
            className={clsx(
              "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              // default (mobile)
              "h-[calc(100%+32px)] w-[calc(100%+32px)] rounded-[12px] blur-[22px]",
              // md+
              "md:h-[calc(100%+48px)] md:w-[calc(100%+48px)] md:rounded-[16px] md:blur-[28px]",
              // radial gradient background
              "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_6%,rgba(153,52,4,0.65)_36%,rgba(255,122,0,0.28)_82%,rgba(255,122,0,0)_100%)]"
            )}
          />
          <img
            src={image}
            alt={title}
            className="relative z-10 block w-80 rounded-2xl object-cover shadow-lg md:w-96"
          />
        </div>
      </div>

      {/* Text block */}
      <div className="w-full text-center md:w-1/2 md:text-left">
        <h1 className="mb-4 font-serif text-4xl font-bold tracking-widest text-[#6b021e]">
          {title}
        </h1>
        <p className="mb-3 font-serif text-2xl font-semibold tracking-widest text-[#6b021e]">
          Step {step}
        </p>
        <p className="font-serif text-lg tracking-widest text-gray-700">
          {description}
        </p>
      </div>
    </section>
  );
};

export default StepSection;
