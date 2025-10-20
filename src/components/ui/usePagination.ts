import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], initialPageSize: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // 计算总页数
  const totalPages = Math.ceil(data.length / pageSize);

  // 获取当前页的数据
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  // 页码改变处理
  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  // 每页数量改变处理
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    // 重新计算当前页，确保不超出范围
    const newTotalPages = Math.ceil(data.length / size);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  };

  // 重置到第一页
  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    currentData,
    totalItems: data.length,
    handlePageChange,
    handlePageSizeChange,
    resetPage
  };
}
