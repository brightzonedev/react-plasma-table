import { useState, useEffect } from "react";

export const useSearch = (rows: any, searchQuery = "", searchColumns: any) => {
  const [filteredData, setfilteredData] = useState<any>();

  useEffect(() => {
    const filtered = rows?.filter((row: any) =>
      searchColumns?.some(
        (column) =>
          row[column]
            ?.toString()
            ?.toLowerCase()
            .indexOf(searchQuery?.toLowerCase()) > -1
      )
    );
    setfilteredData(filtered);
  }, [searchQuery]);

  return { filteredData };
};
