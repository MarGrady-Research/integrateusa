import React, { useEffect, useRef, useState, useMemo } from "react";
import LineGraph from "./Line";
import Pagination from "./Pagination";
import {sortRows, filterRows, paginateRows} from "./Helpers";
import axios from "axios";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Comparison({id, grade, filteredData, namelevel, idlevel, table}) {

    // Setting columns array
    const columns = [
        {accessor: "checkbox", label: ""},
        {accessor: namelevel, label: "Name"},
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

    // TODO: Add in a half second timeout in handleSearch

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
    const [sort, setSort] = useState({order: 'asc', orderBy: namelevel})

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
        constructor(id, name, data) {
            this.id = id;
            this.name = name;
            this.data = data;
        }
    }


    const getLineData =  async (id) => {

        const labels = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
            2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
        
        const response = await axios.get("http://localhost:8000/api/" + table + "/?grade=" + grade + "&" + idlevel + "=" + id);
        let data = response.data;

        const finaldata = data.map((e) =>{ return ({
                   seg: e.norm_exp_aw,
                   year: e.year
                })
            })

        labels.forEach(e => {if (!finaldata?.map(e => e.year).includes(e)) {
                                let tempdata = [...finaldata, {seg: null, year:e}];
                                finaldata = tempdata.sort((a,b) => {return  ((a['year'] - b['year']))});
                            } 
                        })

        const name = data[0][namelevel];
      
        const templine = new Line(id, name, finaldata);  
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
                        return <th key={column.accessor} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex flex-row">
                                <span className="px-1">{column.label}</span>
                                { column.accessor !== "checkbox" && 
                                <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>}
                                </div>
                                </th>
                    })}
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        {columns.map(column => {
                            if (column.accessor === "checkbox") {
                                return (<th scope="row" className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        className="form-check-input items-center "
                                        id="master"
                                        onClick={() => {calculatedRows.map(e => e[idlevel]).forEach(e => updateID(e))}}
                                    />
                                </th>)
                            }
                            if (column.accessor === namelevel) {
                                return (
                                <td className="px-6 py-1">
                                    <input
                                        className= "px-2 py-2 whitespace-wrap border border-gray-200 rounded-md" //"text-sm font-medium text-gray-900 px-3 py-2 text-left"
                                        key={`${column.accessor}-search`}
                                        type="search"
                                        value={filters[column.accessor]}
                                        placeholder={`Search Name`}
                                        onChange={event => handleSearch(event.target.value, column.accessor)}
                                    />  
                                </td>)
                            } 
                            else {

                                
                                const maxval = () => {
                                    let arr = filteredData.map(e => parseFloat(e[column.accessor]));
                                    if (column.accessor === "num_schools") {
                                        return Math.max(...arr)
                                    } else { return 100}
                                }

                                const [min, setMin] = useState({num_schools: 1,
                                                                enr_prop_as: 0,
                                                                enr_prop_bl: 0,
                                                                enr_prop_hi: 0,
                                                                enr_prop_or: 0,
                                                                enr_prop_wh: 0});
                                const [max, setMax] = useState({num_schools: maxval(),
                                                                enr_prop_as: maxval(),
                                                                enr_prop_bl: maxval(),
                                                                enr_prop_hi: maxval(),
                                                                enr_prop_or: maxval(),
                                                                enr_prop_wh: maxval()});

                                return <td>
                                        <div className="w-full px-4 py-1 flex flex-row justify-evenly">
                                        <input type="text" className="w-8 bg-gray-200 border rounded-md text-center" placeholder={min[column.accessor]} readOnly = {false} onChange={e => setMax({[column.accessor]: e.target.value})}/>
                                        <input type="text" className="w-8 bg-gray-200 border rounded-md text-center" placeholder={max[column.accessor]} readOnly={false} onChange={e => setMax({[column.accessor]: e.target.value})}/> 
                                        </div>
                                        {/* <div className="px-4">
                                       <Slider 
                                       range
                                       key={`${column.accessor}-search`}
                                       className="px-5"
                                       min={0}
                                       max={maxval()}
                                       pushable={10}
                                       allowCross={false}
                                       defaultValue={[min[column.accessor], max[column.accessor]]}
                                       onChange={e => {
                                                 handleSearch(e, column.accessor);
                                                 setMax({[column.accessor]: e[1]});
                                                 setMin({[column.accessor]: e[0]});
                                                }}
                                       />
                                       </div> */}
                                       </td>
                            }
                        })}
                    </tr>
                    {calculatedRows.map(row => {
                        return (
                            <tr key={row[idlevel]}>
                                {columns.map(column => {
                                    if(column.accessor == "checkbox") {
                                        return (<th scope="row">
                                                   <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={row[idlevel]}
                                                    // defaultChecked={true}
                                                    checked={lines.includes(row[idlevel])}
                                                    onChange={() => {}}
                                                    onClick={(e) => updateID(e.target.id)}
                                                    readOnly={false}
                                                    />
                                                 </th>)
                                     } else if (column.accessor === namelevel) {
                                        return <td key={column.accessor} className="text-sm text-left text-gray-900 font-light px-6 py-4">{row[column.accessor]}</td>
                                     } else {
                                        return <td key={column.accessor} className="text-sm text-center text-gray-900 font-light px-6 py-4">{row[column.accessor]}</td>
                                     }
                                })}
                            </tr>
                        )
                    })}
                </tbody>

            </table>
            
            )}


    return(
        <>

            {/* <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-x-auto"> 
                        {tableRows(columns, filteredData)}
                    </div>
                </div>
             </div> */}
        {/* <div className="relative flex flex-row justify-between"> */}
            
            <div className="mt-2 container flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align -middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <div className="overflow-x-auto"> 
                                {tableRows(columns, filteredData)}
                            </div>
                        </div>
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
        
            <div className="w-full h-full">
            <LineGraph linedata={linedata} id={id}/>
            </div>
        {/* </div> */}

        </>
    );
}