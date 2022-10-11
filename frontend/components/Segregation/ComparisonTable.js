import React, { useEffect, useRef, useState, useMemo } from "react";
import LineGraph from "./Line";
import Pagination from "./Pagination";
import {sortRows, filterRows, paginateRows} from "./Helpers";
import axios from "axios";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Comparison({id, grade, filteredData}) {

    // Setting columns array
    const columns = [
        {accessor: "checkbox", label: ""},
        {accessor: "dist_name", label: "District Name"},
        {accessor: "num_schools", label: "# Schools"},
        {accessor: "enr_prop_as", label: "% Asian"},
        {accessor: "enr_prop_bl", label: "% Black"},
        {accessor: "enr_prop_hi", label: "% Hispanic"},
        {accessor: "enr_prop_wh", label: "% White"},
        {accessor: "enr_prop_or", label: "% Other"},
        {accessor: "norm_exp_aw", label: "Normalized Exposure"},
    ]

    // Filtering
    const [filters, setFilters] = useState({})

    const handleSearch = (value, accessor) => {
        setActivePage(1);

        if (value) {
            setFilters(prevFilters => ({
                ...prevFilters,
                [accessor]: value,
            }))
        } else {
            setFilters(prevFilters => {
                const updatedFilters = {...prevFilters}
                delete updatedFilters[accessor]

                return updatedFilters
            })
        }
    }


    // Sorting 
    const [sort, setSort] = useState({order: 'asc', orderBy:'dist_name'})

    const handleSort = accessor => {
        setActivePage(1);
        setSort(prevSort => ({
            order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
            orderBy: accessor,
        }))
    }

    // Filter then sort, then paginate
    const filteredRows = useMemo(() => filterRows(filteredData, filters), [filteredData, filters])
    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])

    // Pagination
    const [activePage, setActivePage] = useState(1);
    const rowsPerPage = 10;
    const count = filteredRows.length;
    const totalPages = Math.ceil(count/rowsPerPage)
    // Paginate after sorting and filtering
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)


    // Beginning of Line Data section
    const [lines, setLines] = useState([id]);
    const [linedata, setLineData] = useState([]);

    class Line {
        constructor(id, dist_name, data) {
            this.id = id;
            this.name = dist_name;
            this.data = data;
        }
    }

    const getLineData =  async (id) => {
        const response = await axios.get("http://localhost:8000/api/district/?grade=" + grade + "&dist_id=" + id);
        let data = response.data;

        const finaldata = data.map((e) => 
                   e.norm_exp_aw,
            )

        const name = data[0].dist_name
      
        const templine = new Line(id, name, finaldata)  
        setLineData(prevarray => [...prevarray, templine])  

        }


    const updateLineState = (e) => {
        if (lines.includes(e) === false) {
            setLines(current => [...current, e]);
        } else {
            setLines(current => 
                current.filter(obj => {
                    return obj !== e
                }))
        }
    }

    console.log(id)

    const updateID = (e) => {
       updateLineState(e);
    }

    useEffect(() => {
        setLineData([]);
        lines.forEach((e) => {
            getLineData(e);
        })
    }, [lines])

    // Returning table JSX
    const tableRows = (columns, filteredData) => {
        return(

            <table className="min-w-full">

                <thead className="border-b bg-gray-200">
                    <tr>
                        {columns.map(column => {

                        const sortIcon = () => {
                            if(column.accessor === sort.orderBy) {
                                if(sort.order === 'asc'){ 
                                    return '\u2191'}  
                                    return '\u2193'
                            } else {
                                return '\u2195'
                            }
                        }
                        return <th key={column.accessor} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                <div className="flex flex-row">
                                <span className="px-1">{column.label}</span>
                                { column.accessor !== "checkbox" && 
                                <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>}
                                </div>
                                </th>
                    })}
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        {columns.map(column => {
                            if (column.accessor == "checkbox") {
                                return <td></td>
                            }
                            if (column.accessor == "dist_name") {
                                return (
                                <td>
                                    <input
                                        className="text-sm font-medium text-gray-900 px-3 py-2 text-left"
                                        key={`${column.accessor}-search`}
                                        type="search"
                                        value={filters[column.accessor]}
                                        placeholder={`Search District Name`}
                                        onChange={event => handleSearch(event.target.value, column.accessor)}
                                    />  
                                </td>)
                            }
                            else {
                                return <td>
                                        <div className="px-4">
                                       <Slider 
                                       range
                                       className="px-5"
                                       min={0}
                                       max={100}
                                       pushable={10}
                                       allowCross={false}
                                       defaultValue={[10, 60]}
                                       />
                                       </div>
                                       </td>
                            }
                        })}
                    </tr>
                    {calculatedRows.map(row => {
                        return (
                            <tr key={row.dist_id}>
                                {columns.map(column => {
                                    if(column.accessor == "checkbox") {
                                        return (<th scope="row">
                                                   <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={row.dist_id}
                                                    onClick={(e) => updateID(e.target.id)}
                                                    />
                                                 </th>)
                                    }
                                    
                                    return <td key={column.accessor} className="text-sm text-gray-900 font-light px-6 py-4">{row[column.accessor]}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>

            </table>
            
            )}


    return(
        <>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-x-auto"> 
                        {tableRows(columns, filteredData)}
                    </div>
                </div>
             </div>
        
            <Pagination 
            activePage={activePage}
            count={count}
            rowsPerPage={rowsPerPage}
            totalPages={totalPages}
            setActivePage={setActivePage}
            />
        
            <div className="w-full">
            <LineGraph linedata ={linedata}/>
            </div>
        </>
    );
}