import { useState, useEffect } from "react";

export const usePaginate = (data: any, perPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<any[]>([]);
  const lastPage = Math.ceil(data?.length / perPage);

  const goNext = (): void => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, lastPage));
  };

  const goPrev = (): void => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, lastPage));
  };

  useEffect(() => {
    const begin = (currentPage - 1) * perPage;
    const end = begin + perPage;
    setCurrentData(data?.slice(begin, end));
  }, [currentPage, perPage, data]);

  return { goNext, goPrev, goToPage, currentData, currentPage, lastPage };
};
