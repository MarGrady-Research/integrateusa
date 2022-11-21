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
        // <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        //     <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
        //         <div className="overflow-x-auto">
        <div className="mt-2 container flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align -middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="overflow-x-auto">  
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">School Type</th>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"># of Schools</th>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">% of Schools</th>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"># of Students</th>
                                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">% of Students</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
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
                                        <td scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">{schoolLevel.Total.all_schools.toLocaleString()}</td>
                                        <td scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">100</td>
                                        <td scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">{schoolLevel.Total.all_students.toLocaleString()}</td>
                                        <td scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-center">100</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )   
                   {/* </div>
                </div>
                </div> */}
 
}