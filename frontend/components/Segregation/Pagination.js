import React from "react";

export default function Pagination({ activePage, count, rowsPerPage, totalPages, setActivePage }) {

    const beginning = activePage == 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
    const end = activePage == totalPages ? count : beginning + rowsPerPage - 1;

    return (
        <> 
        <div className="pagination flex flex-row justify-end overflow-x-auto">
            <button disabled={activePage == 1} onClick={() => setActivePage(1)} className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">First </button>
            <button disabled={activePage == 1} onClick={() => setActivePage(activePage-1)} className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">&laquo;</button>
            <p className="page-link relative block py-1.5 px-3">Page {activePage} of {totalPages}</p>
            <button disabled={activePage == totalPages} onClick={() => setActivePage(activePage+1)} className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">&raquo;</button>
            <button disabled={activePage == totalPages} onClick={() => setActivePage(totalPages)} className="page-link relative block py-1.5 pl-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">Last</button>
        
        </div>
        </>
    )
}