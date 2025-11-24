"use client";
import React from "react";

export type StallSize = "small" | "medium" | "large";
export type StallStatus = "available" | "selected" | "not-available";

export interface Stall {
  id: string;
  size: StallSize;
  status: StallStatus;
  row: number;
  col: number;
  colspan?: number;
  rowspan?: number;
}

export interface MapElement {
  type: "entrance" | "exit" | "restroom" | "info" | "empty";
  label: string;
  row: number;
  col: number;
  colspan?: number;
  rowspan?: number;
}

interface StallMapProps {
  stalls: Stall[];
  mapElements?: MapElement[];
  onStallClick?: (stallId: string) => void;
  showLegend?: boolean;
  readonly?: boolean;
}

const StallMap: React.FC<StallMapProps> = ({
  stalls,
  mapElements = [],
  onStallClick,
  showLegend = true,
  readonly = false,
}) => {
  const getStallColor = (status: StallStatus, size: StallSize) => {
    if (status === "selected") {
      return "bg-orange-600 border-orange-700";
    }
    if (status === "not-available") {
      return "bg-black border-black";
    }
    // Light colors for different sizes when available
    switch (size) {
      case "small":
        return "bg-blue-100 border-blue-200 hover:bg-blue-200";
      case "medium":
        return "bg-purple-100 border-purple-200 hover:bg-purple-200";
      case "large":
        return "bg-green-100 border-green-200 hover:bg-green-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  const getElementColor = (type: string) => {
    switch (type) {
      case "entrance":
        return "bg-emerald-400 border-emerald-500 text-blue";
      case "exit":
        return "bg-red-300 border-red-400 text-white";
      case "restroom":
        return "bg-cyan-300 border-cyan-400";
      case "info":
        return "bg-yellow-300 border-yellow-400 text-black";
      default:
        return "bg-transparent border-transparent";
    }
  };

  const handleClick = (stallId: string, status: StallStatus) => {
    if (!readonly && status !== "not-available" && onStallClick) {
      onStallClick(stallId);
    }
  };

  // Calculate grid dimensions
  const maxRow = Math.max(
    ...stalls.map((s) => s.row + (s.rowspan || 1) - 1),
    ...mapElements.map((e) => e.row + (e.rowspan || 1) - 1)
  );
  const maxCol = Math.max(
    ...stalls.map((s) => s.col + (s.colspan || 1) - 1),
    ...mapElements.map((e) => e.col + (e.colspan || 1) - 1)
  );

  // Create a grid to track occupied cells
  const grid: (Stall | MapElement | null)[][] = Array(maxRow + 1)
    .fill(null)
    .map(() => Array(maxCol + 1).fill(null));

  // Place stalls in grid
  stalls.forEach((stall) => {
    const rowspan = stall.rowspan || 1;
    const colspan = stall.colspan || 1;
    for (let r = 0; r < rowspan; r++) {
      for (let c = 0; c < colspan; c++) {
        grid[stall.row + r][stall.col + c] = stall;
      }
    }
  });

  // Place map elements in grid
  mapElements.forEach((element) => {
    const rowspan = element.rowspan || 1;
    const colspan = element.colspan || 1;
    for (let r = 0; r < rowspan; r++) {
      for (let c = 0; c < colspan; c++) {
        grid[element.row + r][element.col + c] = element;
      }
    }
  });

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl p-8 mb-6 shadow-[0_20px_60px_rgba(255,122,0,0.12)] overflow-x-auto">
        <div
          className="grid gap-2 min-w-max min-h-[500px]"
          style={{
            gridTemplateColumns: `repeat(${maxCol + 1}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${maxRow + 1}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (!cell) {
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="aspect-square"
                  />
                );
              }

              // Check if this is the origin cell for a multi-cell element
              const isOrigin =
                "id" in cell
                  ? cell.row === rowIndex && cell.col === colIndex
                  : cell.row === rowIndex && cell.col === colIndex;

              if (!isOrigin) {
                return null; // Skip non-origin cells of multi-cell elements
              }

              if ("type" in cell) {
                // Map element
                const element = cell as MapElement;
                return (
                  <div
                    key={`element-${rowIndex}-${colIndex}`}
                    className={`
                      rounded-lg border-2 flex items-center justify-center
                      ${getElementColor(element.type)}
                      ${
                        element.type !== "empty"
                          ? "font-medium text-white text-xs"
                          : ""
                      }
                    `}
                    style={{
                      gridRow: `${element.row + 1} / span ${
                        element.rowspan || 1
                      }`,
                      gridColumn: `${element.col + 1} / span ${
                        element.colspan || 1
                      }`,
                      minHeight: "4rem",
                    }}
                  >
                    {element.label}
                  </div>
                );
              } else {
                // Stall
                const stall = cell as Stall;
                return (
                  <button
                    key={`stall-${stall.id}`}
                    onClick={() => handleClick(stall.id, stall.status)}
                    disabled={readonly || stall.status === "not-available"}
                    className={`
                      rounded-lg border-2 transition-all duration-300 flex items-center justify-center
                      ${getStallColor(stall.status, stall.size)}
                      ${
                        readonly || stall.status === "not-available"
                          ? "cursor-default"
                          : "cursor-pointer hover:scale-105 hover:shadow-md"
                      }
                      ${
                        stall.status === "selected"
                          ? "text-white font-bold"
                          : "text-gray-700 text-xs"
                      }
                    `}
                    style={{
                      gridRow: `${stall.row + 1} / span ${stall.rowspan || 1}`,
                      gridColumn: `${stall.col + 1} / span ${
                        stall.colspan || 1
                      }`,
                      minHeight: "4rem",
                    }}
                    aria-label={`Stall ${stall.id} - ${stall.size} - ${stall.status}`}
                  >
                    {stall.id}
                  </button>
                );
              }
            })
          )}
        </div>
      </div>

      {showLegend && (
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Stall sizes */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 border-2 border-blue-200 rounded"></div>
            <span className="text-sm text-gray-700">Small Stall</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-100 border-2 border-green-200 rounded"></div>
            <span className="text-sm text-gray-700">Medium Stall</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-100 border-2 border-purple-200 rounded"></div>
            <span className="text-sm text-gray-700">Large Stall</span>
          </div>

          {/* Stall status */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-600 border-2 border-orange-700 rounded"></div>
            <span className="text-sm text-gray-700">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black border-2 border-black rounded"></div>
            <span className="text-sm text-gray-700">Not Available</span>
          </div>

          {/* Map elements */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-400 border-2 border-emerald-500 rounded"></div>
            <span className="text-sm text-gray-700">Entrance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-400 border-2 border-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Exit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-cyan-300 border-2 border-cyan-400 rounded"></div>
            <span className="text-sm text-gray-700">Restroom</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-300 border-2 border-yellow-400 rounded"></div>
            <span className="text-sm text-gray-700">Info Desk</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StallMap;
