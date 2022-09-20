import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from 'react-paginate';
import LineGraph from "./Line";

export default function Comparison({SegData, id, grade, compData, itemsPerPage}) {

    // Filtering
    // const [filters, setFilters] = useState({})

    // const filteredRows = filterRows(rows, filters)



    // Sorting
    const [sortedField, setSortedField] = useState(null)

    const sortCol = () => {compData.sort((a, b) => {
            if (sortedField !== null) { 
                if (a[sortedField] < b[sortedField]) {
                    return -1;
                }
                if (a[sortedField] > b[sortedField]) {
                    return 1;
                }
                return 0;
            }
        })
    }

    useEffect(() => {
        sortCol();
    }, [sortedField])

    // Pagination
    const [currentItems, setCurrentItems] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect( () => {
        // if(compData.length >0 ) {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(compData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(compData.length/itemsPerPage));
        // }
    }, [itemOffset, itemsPerPage, compData]);


    const handlePageClick = (event) => {
        const newOffset =(event.selected * itemsPerPage) % compData.length;
        setItemOffset(newOffset);
    };

    // function for capturing selected objects in table
    const currentObj = useRef(null);
    let selectedIds = [id];

    const getID = (e) => {
        currentObj.current = e
        if (selectedIds.includes(currentObj.current)) {
            let index = selectedIds.indexOf(currentObj.current);
            selectedIds.splice(index, 1);
            console.log(selectedIds)
        } else {
        selectedIds.push(currentObj.current);
        console.log(selectedIds);
        console.log(currentObj.current)
        }
    } 

    // Returning table rows
    const tableRows = () => {
        if(currentItems) {
        return currentItems.map((e) => {
         return(
                 <tr key={e.dist_id} className="border-b">
                 <th scope="row">
                    <input
                    type="checkbox"
                    className="form-check-input"
                    id={e.dist_id}
                    onClick={(e) => getID(e.target.id)}
                    //   checked={this.state.MasterChecked}
                    
                    //   onChange={(e) => this.onMasterCheck(e)}
                    />
                 </th>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 ">{e.dist_name}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 ">{e.num_schools}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_as}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_bl}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_hi}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_wh}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_or}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.norm_exp_aw}</td>
                 </tr> 
            )
         })
        }
     }

    return(
        <>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-x-auto"> 
                        <table className="min-w-full">

                            <thead className="border-b bg-gray-200">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left"></th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left"><button type = "button" onClick = {() => setSortedField('dist_name')} >County Name</button></th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left"><button type = "button" onClick = {() => setSortedField('num_schools')} ># Schools</button></th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">% Asian</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">% Black</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">% Hispanic</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">% White</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">% Other</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Normalized Exposure</th>
                                </tr>
                            </thead>

                            <tbody>
                            <tr>
                                    <td></td>
                                    <td><input
                                            className="text-sm font-medium text-gray-900 px-3 py-2 text-left"
                                            key={1}
                                            type="search"
                                            placeholder={`Search District Name`}
                                            // value={filters[column.accessor]}
                                            // onChange={event => handleSearch(event.target.value, column.accessor)}
                                        />
                                    </td>
                                    <td> <input

                                            max={100}
                                            type="range"
                                            className="text-sm font-medium text-gray-900 px-3 py-2 text-left"
                                            // id={`${e}Range`}
                                        />
                                    </td>
                                    <td> <input
                                            max={100}
                                            type="range"
                                            className="text-sm font-medium text-gray-900 px-3 py-2 text-left"
                                            // id={`${e}Range`}
                                        />
                                    </td>
                                    <td> <input
                                            max={100}
                                            type="range"
                                            className="text-sm font-medium text-gray-900 px-3 py-2 text-left"
                                            // id={`${e}Range`}
                                        />
                                    </td>
                                    <td> <input
                                            max={100}
                                            type="range"
                                            className="text-sm font-medium text-gray-900 px-3 py-2 text-left"
                                            // id={`${e}Range`}
                                        />
                                    </td>
                                    <td> <input
                                            max={100}
                                            type="range"
                                            className="text-sm font-medium text-gray-900 px-3 py-2 text-left"
                                            // id={`${e}Range`}
                                        />
                                    </td>
                                    <td> <input
                                            max={100}
                                            type="range"
                                            className="text-sm font-medium text-gray-900 px-3 py-2 text-left"
                                            // id={`${e}Range`}
                                        />
                                    </td>
                                    <td> <input
                                            max={100}
                                            type="range"
                                            className="text-sm font-medium text-gray-900 px-3 py-2 text-left"
                                            // id={`${e}Range`}
                                        />
                                    </td>
                                </tr>
                                {tableRows(currentItems)}
                            </tbody>

                        </table>
                    </div>
                </div>
             </div>
             <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                initialPage={1}
                className="flex justify-end overflow-x-auto"
                nextClassName="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                breakClassName="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                pageClassName="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                previousClassName="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                />
        
        <div className="w-full">
          <LineGraph selectedIds={selectedIds} grade={grade}/>
        </div>
        </>
    );
}