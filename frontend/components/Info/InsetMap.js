import React, { useEffect, useRef} from "react";
import Map, {Source, Layer, FillLayer} from 'react-map-gl';
import mapbox_token from "../../Key";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function InsetMap({id, bounds}) {

    // Using the useMap hook to set up ease to functionality
    const mapRef = useRef();

    const onLoad = () => {
        mapRef.current.fitBounds(bounds, {padding: 25, duration:1000});
    }

    let stringID = ''+id;

    const boundaryLayer = {
        id: 'boundary',
        type: 'fill',
        source: 'boundary-source',
        'source-layer': 'cb_2018_us_county_500k-6dd9y3',
        paint: {
            'fill-outline-color': 'rgba(0,0,0,0.1)',
            'fill-color': 'rgba(0,0,0,0.1)'
        },
        filter: ['==', 'GEOID', stringID]
    }

    return(
        <>
        <Map 
        ref={mapRef}
        initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 3.5
          }}
        style={{width: 500, height: 300}}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={mapbox_token}
        attributionControl={false}
        className='overflow-x-auto w-500'
        onData={onLoad}
        >
        <Source id='boundary-source' type="vector" url="mapbox://theokaufman.6i9q4by5">
            <Layer {...boundaryLayer} />
        </Source>
        </Map>
        </>
    )

}