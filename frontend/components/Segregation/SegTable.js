import React from "react";


export default function SegTable({focus, idlevel, namelevel}) {

    const tableRows = (e) => {
         return(
                 <tr key={e[idlevel]} className="border-b">
                <td className="text-sm text-gray-900 font-light px-6 py-4 ">{e[namelevel]}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-6 py-4 whitespace-nowrap">{e.num_schools}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_as}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_bl}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_hi}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_wh}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_or}</td>
                 <td className="text-sm text-gray-900 text-center font-light px-6 py-4 whitespace-nowrap">{e.norm_exp_aw}</td>
                 </tr> 
         )
     }

    return(
        <>
            {/* <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 "> */}

        <div className="mt-2 container flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align -middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="overflow-x-auto"> 
                            <table className="min-w-full">

                                <thead className="border-b bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"># Schools</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">% Asian</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">% Black</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">% Hispanic</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">% White</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">% Other</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Normalized Exposure</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tableRows(focus)}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        
        )

}