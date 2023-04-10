import React from "react";

export default function AreaPie(piedata, clickInfo) {

    let areaID = () => {
        if(clickInfo.feature.properties.GEOID.length === 5) {
            return 'county_id'
        } else if (clickInfo.feature.properties.GEOID.length === 7) {
            return 'dist_id'
        } else if (clickInfo.feature.properties.STUSPS) {
            return 'state_abb'
        }
    }

    // const data =


}