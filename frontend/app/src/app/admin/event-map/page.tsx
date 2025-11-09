"use client";

import { useState } from "react";

const initialUnavailable = new Set([2, 6, 12, 18]);
const initialSelected = new Set([9, 10]);

export default function EventMapPage() {
  const cols = 7;
  const rows = 5;

  const [unavailable] = useState<Set<number>>(initialUnavailable);
  const [selected, setSelected] = useState<Set<number>>(initialSelected);

  function toggleCell(index: number) {
    if (unavailable.has(index)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section className="p-12 bg-gradient-to-br from-orange-50 to-pink-50">
      <h3 className="text-center text-2xl font-serif mb-8">Event Map</h3>

      <div className="max-w-4xl mx-auto rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(255,122,0,0.12)]">
        <div className="grid grid-cols-7 gap-4 p-6 bg-white rounded-lg">
          {Array.from({ length: cols * rows }).map((_, i) => {
            const isUnavailable = unavailable.has(i);
            const isSelected = selected.has(i);
            const cls = isUnavailable
              ? "bg-black"
              : isSelected
              ? "bg-orange-600"
              : "bg-gray-200";
            return (
              <div
                key={i}
                onClick={() => toggleCell(i)}
                className={`${cls} h-12 w-12 rounded-md cursor-pointer`}
              />
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 bg-orange-600 rounded-sm" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 bg-black rounded-sm" />
            <span>Not Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 bg-gray-200 rounded-sm" />
            <span>Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
