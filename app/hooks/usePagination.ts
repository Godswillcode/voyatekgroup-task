import { useState, useMemo } from "react";

export function usePagination<T>(data: T[], pageSize: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [currentPage, data, pageSize]);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const resetPage = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    pageSize,
    paginatedData,
    changePage,
    resetPage,
    totalItems,
  };
}
