import React, { useEffect, useMemo } from "react";


export default function RaceTable({enrGroups, enrTotal}) {

    const tableRows = (arr) => {
        return arr.map(e => {
         return(
                 <tr key={e.group} className="border-b">
                 <td className="text-sm text-gray-900 font-light px-6 py-4 ">{e.group.toUpperCase()}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.round((e.enr/enrTotal)*100)}</td>
                 </tr> 
         )
         })
     }

    return(
        // <div className="flex flex-col border-2 border-black">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-x-auto"> 
                        <table className="min-w-full  ">
                            <thead className="border-b bg-gray-200">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Group</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">%</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tableRows(enrGroups)}
                            </tbody>
                            
                            <tfoot className="border-b">
                                <tr>
                                    <td scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Total</td>
                                    <td scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">{enrTotal}</td>
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