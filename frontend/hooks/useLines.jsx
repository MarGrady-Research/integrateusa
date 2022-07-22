import {useEffect, useState} from 'react';


function useLines(arr, chartdata) {

    const [lines, setLines] = useState([]);

   useEffect(() => { 
    
        let dataArray = [];
        let objArray = [];

        function lineData() {  

            arr.forEach(el => {
                let chartFilter = chartdata.filter(chartEl => {
                chartEl.grade == el  
            })

            dataArray.push(chartFilter)

            })

            dataArray.forEach(el => {
            
                let newData = {
                    label: "Test",
                    data: el.map(x => x.seg_index_tot),
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgb(255, 99, 132)'],
                    borderWidth: 1
                }

                objArray.push(newData)

            })

            return objArray
           
        }

        let finalArr = lineData()
        setLines(finalArr)

   }, [])

    return lines

}


export default useLines


