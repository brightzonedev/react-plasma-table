import { useState, useMemo } from "react";

type sortConfig = {
  key: string;
  direction: string;
} | null;

export const useSort = (sortedData, config = null) => {
  const [sortConfig, setSortConfig] = useState<sortConfig>(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...sortedData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig?.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortedData, sortConfig]);

  const sort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig?.key === key &&
      sortConfig?.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { sortedData: sortedItems, sort, sortConfig };
};
