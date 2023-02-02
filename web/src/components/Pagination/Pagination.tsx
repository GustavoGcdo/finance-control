import { useEffect, useState } from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import PaginateItem from './PaginateItem';

type PaginateProps = {
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  onChangePage?: (page: number) => void;
};

type Pager = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  pages: number[];
};

const pagerInit = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  endPage: 0,
  pages: [],
  pageSize: 0,
  startPage: 0
};

const Pagination = (props: PaginateProps) => {
  const [pager, setPager] = useState<Pager>(pagerInit);
  const [maxPages, setMaxPages] = useState(5);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const pagerInit = getPager(props.totalItems, 1, props.pageSize);
    setPager(pagerInit);
  }, [props.totalItems, props.pageSize]);

  const setPage = (page: number) => {
    if (page < 1 || page > pager.totalPages) return;
    const newPager = getPager(props.totalItems, page, props.pageSize, maxPages);
    setPager(newPager);

    if (props.onChangePage) {
      props.onChangePage(page);
    }
  };

  useEffect(() => {
    if (isMobile) {
      setMaxPages(1);
    } else {
      setMaxPages(5);
    }
  }, [isMobile]);

  useEffect(() => {
    const newPager = getPager(pager.totalItems, pager.currentPage, props.pageSize, maxPages);
    setPager(newPager);
  }, [maxPages]);

  const getPager = (
    totalItems: number = 0,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages = 5
  ) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  };

  return (
    <div className="flex sm:flex-row flex-col flex-wrap justify-center items-center sm:justify-end">
      <div className="text-sm cursor-text">Total de {props.totalItems} registros</div>
      <ul className="p-3 flex gap-2 justify-end">
        {!isMobile && (
          <PaginateItem
            text="Primeiro"
            isDisabled={pager.currentPage === 1 || pager.currentPage === 0}
            onClick={() => setPage(1)}
          />
        )}

        <PaginateItem
          text="Anterior"
          isDisabled={pager.currentPage === 1 || pager.currentPage === 0}
          onClick={() => setPage(pager.currentPage - 1)}
        />

        {pager.pages.map((page, index) => (
          <PaginateItem
            key={index}
            text={page}
            isActive={pager.currentPage === page}
            onClick={() => setPage(page)}
          />
        ))}

        <PaginateItem
          text="Próximo"
          isDisabled={pager.currentPage === pager.totalPages}
          onClick={() => setPage(pager.currentPage + 1)}
        />

        {!isMobile && (
          <PaginateItem
            text="Último"
            isDisabled={pager.currentPage === pager.totalPages}
            onClick={() => setPage(pager.totalPages)}
          />
        )}
      </ul>
    </div>
  );
};

export default Pagination;
