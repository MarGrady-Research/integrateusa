import React, { useCallback, useEffect, useRef} from "react";
import Map, {Source, Layer, FillLayer} from 'react-map-gl';
import mapbox_token from "../../Key";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function InsetMap({id, bounds}) {

    // Using the useMap hook to set up ease to functionality
    const mapRef = useRef();

    const onLoad = useCallback(() => {
        mapRef.current.fitBounds(bounds, {padding: 25, duration:2000});
    }, []);

    let stringID = ''+id;

    const districtLayer = {
        id: 'district-boundary',
        type: 'fill',
        'source-layer': '2021_sd_unified-4mqqrn',
        paint: {
            'fill-outline-color': 'rgba(0,0,0,0.1)',
            'fill-color': 'rgba(0,0,0,0.1)'
        },
        filter: ['==', 'GEOID', stringID]
    }

    const countyLayer = {
        id: 'boundary',
        type: 'fill',
        'source-layer': 'cb_2018_us_county_500k-6dd9y3',
        paint: {
            'fill-outline-color': 'rgba(0,0,0,0.1)',
            'fill-color': 'rgba(0,0,0,0.1)'
        },
        filter: ['==', 'GEOID', stringID]
    }

    const stateLayer = {
        id: 'state-boundary',
        type: 'fill',
        'source-layer': 'cb_2018_us_state_500k-8q06w5',
        paint: {
            'fill-outline-color': 'rgba(0,0,0,0.1)',
            'fill-color': 'rgba(0,0,0,0.1)'
        },
        filter: ['==', 'STUSPS', stringID]
    }

    return(
        <>        
        <Map 
        ref={mapRef}
        initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 2.5
          }}
        style={{width: '100%', height: '100%'}}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={mapbox_token}
        className='overflow-x-auto w-500'
        onLoad={onLoad}
        >
        <Source id='district-boundary-source' type="vector" url="mapbox://theokaufman.45uz283x">
            <Layer {...districtLayer} />
        </Source>
        <Source id='county-boundary-source' type="vector" url="mapbox://theokaufman.6i9q4by5">
            <Layer {...countyLayer} />
        </Source>
        <Source id='state-boundary-source' type="vector" url="mapbox://theokaufman.a7l31auu">
            <Layer {...stateLayer} />
        </Source>
        </Map>
        </>
    )

}