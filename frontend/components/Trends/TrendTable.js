import React from "react";

export default function TrendTable({TrendData}) {

    const columns = [
        {accessor: 2000, label: 2000},
        {accessor: 2001, label: 2001},
        {accessor: 2002, label: 2002},
        {accessor: 2003, label: 2003},
        {accessor: 2004, label: 2004},
        {accessor: 2005, label: 2005},
        {accessor: 2006, label: 2006},
        {accessor: 2007, label: 2007},
        {accessor: 2008, label: 2008},
        {accessor: 2009, label: 2009},
        {accessor: 2010, label: 2010},
        {accessor: 2011, label: 2011},
        {accessor: 2012, label: 2012},
        {accessor: 2013, label: 2013},
        {accessor: 2014, label: 2014},
        {accessor: 2015, label: 2015},
        {accessor: 2016, label: 2016},
        {accessor: 2017, label: 2017},
        {accessor: 2018, label: 2018},
        {accessor: 2019, label: 2019},
        {accessor: 2020, label: 2020},
        {accessor: 2021, label: 2021},
    ]

    let sortedData = TrendData.sort((a,b) => {return ((a['year']-b['year']))})
    console.log(sortedData)

    const table = (cols, data) => {
        return(
            <>
            <thead className="border-b bg-gray-200">
                <tr>
                    <th key='race' scope="col" className="text-sm border-2 font-medium text-gray-900 px-2 py-4 text-left">Race</th>
                    {cols.map(column => {
                        return <th key= {column.accessor} scope="col" className="text-sm border-2 font-medium text-gray-900 px-2 py-4 text-left">{column.label}</th>
                    })}
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className="text-xs text-gray-900 border-2 font-light px-2 py-4 whitespace-nowrap">Asian</td>
                    {data.map(e => {return (<td key = 'asian' className="text-xs text-gray-900 border-2 font-light px-2 py-4 whitespace-nowrap">{e.asian}</td>)})}
                </tr>
                <tr>
                    <td className="text-xs text-gray-900 border-2 font-light px-2 py-4 whitespace-nowrap">Black</td>
                    {data.map(e => {return (<td key = 'black' className="text-xs text-gray-900 border-2 font-light px-2 py-4 whitespace-nowrap">{e.black}</td>)})}
                </tr>
                <tr>
                    <td className="text-xs text-gray-900 border-2 font-light px-2 py-4 whitespace-nowrap">Hispanic</td>
                    {data.map(e => {return (<td key = 'hispanic' className="text-xs text-gray-900 border-2 font-light px-2 py-4 whitespace-nowrap">{e.hispanic}</td>)})}
                </tr>
                <tr>
                    <td className="text-xs text-gray-900 border-2 font-light px-2 py-4 whitespace-nowrap">Other</td>
                    {data.map(e => {return (<td key = 'other' className="text-xs text-gray-900 border-2 font-light px-2 py-4 whitespace-nowrap">{e.other}</td>)})}
                </tr>
                <tr>
                    <td className="text-xs text-gray-900 border-2 font-light px-2 py-4 whitespace-nowrap">White</td>
                    {data.map(e => {return (<td key = 'white' className="text-xs text-gray-900 border-2 font-light px-2 py-4 whitespace-nowrap">{e.white}</td>)})}
                </tr>
            </tbody>
            </>
        )
    }

   return(
       <>
           {/* <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
               <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                   <div className="overflow-x-auto">  */}
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                       {/* <table className="min-w-full"> */}

                           {table(columns, sortedData)}

                       </table>
                   </div>
               </div>
            </div>
            </div>
       </>
   )
}