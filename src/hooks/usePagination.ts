import { useMemo } from 'react';

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Simplified version for now
    const range = [];
    for (let i = 1; i <= totalPageCount; i++) {
      range.push(i);
    }
    return range;
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
