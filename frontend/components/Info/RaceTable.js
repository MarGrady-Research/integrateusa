import React, { useEffect, useMemo } from "react";


export default function RaceTable({enrGroups, enrTotal, schoolLevel}) {

    const tableRows = (schooltype) => {
         return(
                 <tr key={schooltype} className="border-b">
                 <td className="text-sm text-gray-900 font-light px-6 py-2 ">{schooltype}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{schoolLevel[schooltype]}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{Math.round((schoolLevel[schooltype]/schoolLevel.Total)*100)}</td>
                 </tr> 
         )
     }

    return(
        // <div className="flex flex-col border-2 border-black">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-x-auto"> 
                        <table className="min-w-full  ">
                            <thead className="border-b bg-gray-200">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">School Type</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">%</th>
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
                                    <td scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Total</td>
                                    <td scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">{schoolLevel.Total}</td>
                                    <td scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">100</td>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
                </div>
             </div>
        // </div>
    
    )
}