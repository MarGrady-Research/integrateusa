import React from "react";


export default function SegTable({focus, idlevel, namelevel}) {

    const tableRows = (e) => {
         return(
                 <tr key={e[idlevel]} className="border-b">
                <td className="text-sm text-gray-900 font-light px-6 py-4 ">{e[namelevel]}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.num_schools}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_as}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_bl}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_hi}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_wh}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.enr_prop_or}</td>
                 <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{e.norm_exp_aw}</td>
                 </tr> 
         )
     }

    return(
        <>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div className="overflow-x-auto"> 
                        <table className="min-w-full">

                            <thead className="border-b bg-gray-200">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left"># Schools</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">% Asian</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">% Black</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">% Hispanic</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">% White</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">% Other</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Normalized Exposure</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tableRows(focus)}
                            </tbody>

                        </table>
                    </div>
                </div>
             </div>
        </>
        
        )

}