import React, { useEffect, useMemo } from "react";


export default function SchoolLevelTable({schoolLevel}) {

    const tableRows = (schooltype) => {
         return(
                 <tr key={schooltype} className="border-b">
                 <td className="text-sm text-gray-900 text-center font-light px-4 py-2 ">{schooltype}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-4 py-2 whitespace-nowrap">{schoolLevel[schooltype].length}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-4 py-2 whitespace-nowrap">{Math.round((schoolLevel[schooltype].length/schoolLevel.Total.all_schools)*100)}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-4 py-2 whitespace-nowrap">{schoolLevel[schooltype].map(e => e.tot_enr).reduce((a,b) => a+b, 0).toLocaleString()}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-4 py-2 whitespace-nowrap">{Math.round((schoolLevel[schooltype].map(e => e.tot_enr).reduce((a,b) => a+b, 0)/schoolLevel.Total.all_students)*100)}</td>
                 </tr> 
         )
     }

    return(
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                <div className="overflow-x-auto"> 
                    <table className="min-w-full  ">
                        <thead className="border-b bg-gray-200">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">School Type</th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">#</th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">%</th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center"># Students</th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">% Students</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableRows('ES')}
                            {tableRows('ESMS')}
                            {tableRows('MS')}
                            {tableRows('MSHS')}
                            {tableRows('HS')}
                            {tableRows('K12')}
                            {tableRows('Other')}
                        </tbody>
                        
                        <tfoot className="border-b">
                            <tr>
                                <td scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">Total</td>
                                <td scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">{schoolLevel.Total.all_schools}</td>
                                <td scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">100</td>
                                <td scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">{schoolLevel.Total.all_students.toLocaleString()}</td>
                                <td scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">100</td>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            </div>
            </div>
    )
}