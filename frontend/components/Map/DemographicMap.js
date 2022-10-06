import React from "react";
import Map from 'react-map-gl';
import mapbox_token from "../../Key";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function DemographicMap() {

    return (
        <Map 
        initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 3.5
          }}
        style={{width: 1200, height:500}}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={mapbox_token}
        attributionControl={false}
        />
    )

}