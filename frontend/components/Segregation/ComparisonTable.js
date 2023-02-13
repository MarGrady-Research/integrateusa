import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import LineGraph from "./Line";
import Pagination from "./Pagination";
import {sortRows, filterRows, paginateRows} from "./Helpers";
import axios from "axios";

export default function Comparison({id, grade, filteredData, namelevel, idlevel, table, measure, maxschools}) {

    // Setting columns array
    const columns = [
        {accessor: "checkbox", label: ""},
        {accessor: namelevel, label: "Name"},
        {accessor: "num_schools", label: "# of Schools"},
        {accessor: "enr_prop_as", label: "% Asian"},
        {accessor: "enr_prop_bl", label: "% Black"},
        {accessor: "enr_prop_hi", label: "% Hispanic"},
        {accessor: "enr_prop_wh", label: "% White"},
        {accessor: "enr_prop_or", label: "% Other"},
        {accessor: measure.accessor, label: measure.name},
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
    const [sort, setSort] = useState({order: 'desc', orderBy: 'num_schools'})

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
                   seg: e[measure.accessor],
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
    }, [lines, measure])


    // Max and min

    const [min, setMin] = useState({num_schools: 1,
        enr_prop_as: 0,
        enr_prop_bl: 0,
        enr_prop_hi: 0,
        enr_prop_or: 0,
        enr_prop_wh: 0,
        [measure.accessor]: 0});

    const [max, setMax] = useState({num_schools: maxschools,
        enr_prop_as: 100,
        enr_prop_bl: 100,
        enr_prop_hi: 100,
        enr_prop_or: 100,
        enr_prop_wh: 100,
        [measure.accessor]: 1});

    // Control display

    const [display, setDisplay] = useState({
        table: 'w-full',
        graph: 'w-0',
        tablecontrols: true
    })

    const showTable = useCallback(() => {
            setDisplay({
                table: 'w-full',
                graph: 'w-0',
                tablecontrols: true
            })
        }, [])

    const showGraph = useCallback(() => {
            setDisplay({
                table: 'hidden',
                graph: 'w-full',
                tablecontrols: false
            })
        }, [])

    const showBoth = useCallback(() => {
            setDisplay({
                table: 'w-2/3',
                graph: 'w-1/3',
                tablecontrols: true
            })
        }, [])


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
                        return <th key={column.accessor} scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
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
                                return (<th scope="row" className="px-2 py-4 whitespace-nowrap">
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
                                <td className="px-2 py-1">
                                    <input
                                        className= "px-2 py-2 whitespace-wrap border border-gray-700 rounded-md" 
                                        key={`${column.accessor}-search`}
                                        type="search"
                                        value={filters[column.accessor]}
                                        placeholder={`Search Name`}
                                        onChange={event => handleSearch(event.target.value, column.accessor)}
                                    />  
                                </td>)
                            } 
                            else {                             

                                const minSearch = (e) => {
                                    if (column.accessor === 'num_schools') {
                                        e.target.value === '' || e.target.value === undefined ? setMin(oldmin => ({...oldmin, [column.accessor]: 1})) : setMin(oldmin => ({...oldmin, [column.accessor]: e.target.value})); 
                                    } else {
                                        e.target.value === '' || e.target.value === undefined ? setMin(oldmin => ({...oldmin, [column.accessor]: 0})) : setMin(oldmin => ({...oldmin, [column.accessor]: e.target.value})); 
                                    }
                                    let searchVal = e.target.value === '' ? 0 : e.target.value;
                                    handleSearch([searchVal, max[column.accessor]], column.accessor);
                                }

                                const maxSearch = (e) => {
                                    if (column.accessor === 'num_schools') {
                                        e.target.value === '' || e.target.value === undefined ? setMax(oldmax => ({...oldmax, [column.accessor]: maxschools})) : setMax(oldmax => ({...oldmax, [column.accessor]: e.target.value})); 
                                    } else if (column.accessor === measure.accessor) {
                                        e.target.value === '' || e.target.value === undefined ? setMax(oldmax => ({...oldmax, [column.accessor]: 1})) : setMax(oldmax => ({...oldmax, [column.accessor]: e.target.value})); 
                                    } else {
                                        e.target.value === '' || e.target.value === undefined ? setMax(oldmax => ({...oldmax, [column.accessor]: 100})) : setMax(oldmax => ({...oldmax, [column.accessor]: e.target.value})); 
                                    };
                                    let searchVal = e.target.value === '' ? 100 : e.target.value;
                                    handleSearch([min[column.accessor], searchVal], column.accessor);
                                }

                                return <td>
                                        <div className="w-full px-2 py-1 flex flex-row justify-around">
                                        <input type="text" className="w-7 bg-gray-200 border rounded-md text-xs text-center" placeholder={min[column.accessor]} readOnly = {false} onChange={e => minSearch(e)}/>
                                        <input type="text" className="w-7 bg-gray-200 border rounded-md text-xs text-center" placeholder={max[column.accessor]} readOnly={false} onChange={e => maxSearch(e)}/> 
                                        </div>
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
                                                    className='form-check-input'
                                                    id={row[idlevel]}
                                                    checked={row[idlevel] === ''+id ? true : lines.includes(row[idlevel])}
                                                    disabled={row[idlevel] === ''+id ? true: false}
                                                    onChange={() => {}}
                                                    onClick={(e) => updateID(e.target.id)}
                                                    readOnly={false}
                                                    />
                                                 </th>)
                                     } else if (column.accessor === namelevel) {
                                        return <td key={column.accessor} className={`text-sm text-left text-gray-900 font-light px-2 py-4 ${row[idlevel] === ''+id ? 'text-line-red font-semibold font-raleway' : ''}`}>{row[column.accessor]}</td>
                                     } else {
                                        return <td key={column.accessor} className={`text-sm text-center text-gray-900 font-light px-2 py-4 ${row[idlevel] === ''+id ? 'text-line-red font-semibold font-raleway' : ''}`}>{row[column.accessor]}</td>
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
        <div className="align-center inline-flex font-raleway">
        <button onClick={showBoth} disabled={true} className='border-gray-700 hover:bg-gray-200 focus:bg-gray-200 border inline-flex rounded-md p-1 mr-2'>
        <span className="text-gray-900">Table + Graph</span>       
        </button>
        <button onClick={showTable} className='border-gray-700 hover:bg-gray-200 focus:bg-gray-200 border inline-flex rounded-md p-1 mr-2'>
            <span className="text-gray-900">Table</span>       
        </button>
        <button onClick={showGraph} className='border-gray-700 hover:bg-gray-200 focus:bg-gray-200 border inline-flex rounded-md p-1 mr-2'>
            <span className="text-gray-900">Graph</span>       
        </button>
        </div>

        {display.tablecontrols &&
            <div className="pt-2">
                <div className="align-center inline-flex font-raleway">
                    <button onClick={() => setLines([id])} className='border-gray-700 hover:bg-gray-200 focus:bg-gray-200 border inline-flex rounded-md p-1 mr-2'>
                    <span className="text-gray-900">Clear Selected</span>       
                    </button>
                </div>
            </div>
        } 

        <div className="flex justify-between">
            <div className={`${display.table} transition-width transition-duration-500 ease-in`}>
                <div className="w-full mt-2 container flex flex-col">
                    <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align -middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border border-gray-700 sm:rounded-lg">
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
            </div>
         
            <div className={`${display.graph}  flex flex-1 h-full transition-width transition-duration-500 ease-in`}>
            <div className="w-full">
            <LineGraph linedata={linedata} id={id} measure={measure}/>
            </div>
            </div>
           
        
        </div>
        </>
    );
}