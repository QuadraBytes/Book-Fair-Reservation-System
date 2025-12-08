import { Stall, MapElement } from "./stallMap";

export interface StallConfig {
  id: string;
  size: "small" | "medium" | "large";
  row: number;
  col: number;
  colspan?: number;
  rowspan?: number;
}

export const DEFAULT_STALL_CONFIGS: StallConfig[] = [
  { id: "A1", size: "large", row: 0, col: 0, colspan: 2, rowspan: 2 },
  { id: "A2", size: "large", row: 0, col: 2, colspan: 2, rowspan: 2 },
  { id: "A3", size: "large", row: 0, col: 4, colspan: 2, rowspan: 2 },
  { id: "A4", size: "large", row: 0, col: 6, colspan: 2, rowspan: 2 },
  { id: "A5", size: "large", row: 0, col: 8, colspan: 2, rowspan: 2 },

  { id: "B1", size: "medium", row: 2, col: 1, colspan: 2 },
  { id: "B2", size: "medium", row: 2, col: 3, colspan: 2 },
  { id: "B3", size: "medium", row: 2, col: 5, colspan: 2 },
  { id: "B4", size: "medium", row: 2, col: 7, colspan: 2 },
  { id: "B5", size: "medium", row: 2, col: 9, colspan: 2 },

  { id: "C1", size: "small", row: 3, col: 0 },
  { id: "C2", size: "small", row: 3, col: 1 },
  { id: "C3", size: "small", row: 3, col: 2 },
  { id: "C4", size: "small", row: 3, col: 3 },
  { id: "C5", size: "small", row: 3, col: 4 },

  { id: "C6", size: "small", row: 3, col: 6 },
  { id: "C7", size: "small", row: 3, col: 7 },
  { id: "C8", size: "small", row: 3, col: 8 },
  { id: "C9", size: "small", row: 3, col: 9 },
  { id: "C10", size: "small", row: 3, col: 10 },

  { id: "D1", size: "small", row: 4, col: 0 },
  { id: "D2", size: "small", row: 4, col: 1 },
  { id: "D3", size: "small", row: 4, col: 2 },
  { id: "D4", size: "small", row: 4, col: 3 },
  { id: "D5", size: "small", row: 4, col: 4 },

  { id: "D6", size: "small", row: 4, col: 6 },
  { id: "D7", size: "small", row: 4, col: 7 },
  { id: "D8", size: "small", row: 4, col: 8 },
  { id: "D9", size: "small", row: 4, col: 9 },
];

export const DEFAULT_MAP_ELEMENTS: MapElement[] = [
  { type: "entrance", label: "ENTRANCE", row: 3, col: 5, rowspan: 2 },
  { type: "exit", label: "EXIT", row: 4, col: 10, rowspan: 1 },
  { type: "restroom", label: "🚻", row: 0, col: 10 },
  { type: "restroom", label: "🚻", row: 1, col: 10 },
  { type: "info", label: "INFO", row: 2, col: 0 },
];

export const createStallsWithStatus = (
  selectedStallIds: string[] = [],
  unavailableStallIds: string[] = []
): Stall[] => {
  return DEFAULT_STALL_CONFIGS.map((config) => {
    let status: "available" | "selected" | "not-available" = "available";

    if (selectedStallIds.includes(config.id)) {
      status = "selected";
    } else if (unavailableStallIds.includes(config.id)) {
      status = "not-available";
    }

    return {
      ...config,
      status,
    };
  });
};
