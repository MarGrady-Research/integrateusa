import React from "react";

export default function RaceTable({enrGroups, enrTotal}) {

    const tableRows = (arr) => {
        return arr.map(e => {
         return(
                 <tr key={e.group}>
                 <td>{e.group}</td>
                 <td>{e.enr}</td>
                 <td>{Math.round((e.enr/enrTotal)*100)}</td>
                 </tr> 
         )
         })
     }

    return(
    <table className="ml-10">
                <thead>
                <tr>
                    <th>Group</th>
                    <th>#</th>
                    <th>%</th>
                </tr>
                </thead>

                <tbody>
                    {tableRows(enrGroups)}
                </tbody>
                
                <tfoot>
                <tr>
                    <td>Total</td>
                    <td>{enrTotal}</td>
                    <td>100</td>
                </tr>
                </tfoot>
            </table>
    )
}