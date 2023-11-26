import React from "react";

export default function Pagination({ activePage, totalPages, setActivePage }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{activePage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </span>
          </div>

          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                disabled={activePage === 1}
                onClick={() => setActivePage(1)}
                className="paginate-btn rounded-l-md"
              >
                First
              </button>
              <button
                disabled={activePage === 1}
                onClick={() => setActivePage(activePage - 1)}
                className="paginate-btn"
              >
                &laquo;
              </button>
              <button
                disabled={activePage === totalPages}
                onClick={() => setActivePage(activePage + 1)}
                className="paginate-btn"
              >
                &raquo;
              </button>
              <button
                disabled={activePage === totalPages}
                onClick={() => setActivePage(totalPages)}
                className="paginate-btn rounded-r-md"
              >
                Last
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
