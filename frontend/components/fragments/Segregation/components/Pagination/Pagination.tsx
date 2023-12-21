import React from "react";

interface Props {
  activePage: number;
  totalPages: number;
  handleActivePage: (page: number) => void;
}

export default function Pagination({
  activePage,
  totalPages,
  handleActivePage,
}: Props) {
  const goToFirstPage = () => handleActivePage(1);
  const goToNextPage = () => handleActivePage(activePage + 1);
  const goToPrevPage = () => handleActivePage(activePage - 1);
  const goToLastPage = () => handleActivePage(totalPages);

  const onFirstPage = activePage === 1;
  const onLastPage = activePage === totalPages;

  return (
    <div className="mt-4 hidden sm:flex sm:items-center sm:justify-between">
      <p className="text-sm text-gray-700">
        Page <span className="font-medium">{activePage}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </p>
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          disabled={onFirstPage}
          onClick={goToFirstPage}
          className="paginate-btn rounded-l-md"
        >
          First
        </button>
        <button
          disabled={onFirstPage}
          onClick={goToPrevPage}
          className="paginate-btn"
        >
          &laquo;
        </button>
        <button
          disabled={onLastPage}
          onClick={goToNextPage}
          className="paginate-btn"
        >
          &raquo;
        </button>
        <button
          disabled={onLastPage}
          onClick={goToLastPage}
          className="paginate-btn rounded-r-md"
        >
          Last
        </button>
      </nav>
    </div>
  );
}
