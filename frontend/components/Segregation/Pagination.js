import React from "react";

export default function Pagination({ activePage, count, rowsPerPage, totalPages, setActivePage }) {

    const beginning = activePage == 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
    const end = activePage == totalPages ? count : beginning + rowsPerPage - 1;

    return (
        <> 
        <div className="pt-3 flex items-center justify-between">

            <div className="flex-1 flex justify-between sm:hidden">
            <button onClick={() => setActivePage(activePage-1)} disabled={activePage === 1} className='relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>Previous</button>
            <button onClick={() => setActivePage(activePage+1)} disabled={activePage === totalPages} className='relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>Next</button>
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="flex gap-x-2">
                    <span className="text-sm text-gray-700"> Page <span className="font-medium">{activePage}</span> of <span className="font-medium">{totalPages}</span></span>
                </div>
            

            <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button disabled={activePage === 1} onClick={() => setActivePage(1)} className="paginate-btn rounded-l-md">First</button>
                    <button disabled={activePage === 1} onClick={() => setActivePage(activePage-1)} className="paginate-btn">&laquo;</button>
                    <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage+1)} className="paginate-btn">&raquo;</button>
                    <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)} className="paginate-btn rounded-r-md">Last</button>
                </nav>
            </div>
            </div>
        </div>
        </>
    )
}