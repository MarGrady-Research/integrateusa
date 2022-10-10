import React from "react";
import Map from 'react-map-gl';
import mapbox_token from "../../Key";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function InsetMap() {

    return(
        <Map 
        initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 3.5
          }}
        style={{width: 500, height: 250}}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={mapbox_token}
        attributionControl={false}
        className='overflow-x-auto'
        />
    )

}