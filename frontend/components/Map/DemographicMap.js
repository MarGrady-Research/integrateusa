import React, { useEffect, useState } from "react";
import axios from 'axios';
import Map, {Layer, Source, NavigationControl, GeolocateControl, FullscreenControl} from 'react-map-gl';
import mapbox_token from "../../Key";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function DemographicMap() {

    const [data, setData] = useState({});

    const getData = async () => {
        const response = await axios.get("http://localhost:8000/api/mapschools/");
        setData({type: "FeatureCollection", features: response.data.map(e => e.map_data)});
    }

    useEffect(() => {
        getData();
    }, [])

    const boundaryLayer = {
        id: 'boundary',
        type: 'fill',
        source: 'boundary-source',
        'source-layer': 'cb_2018_us_state_500k-8q06w5',
        paint: {
            'fill-outline-color': 'rgba(0,0,0,0.1)',
            'fill-color': 'rgba(0,0,0,0.1)'
        },
        // filter: ['==', 'GEOID', stringID]
    }

    const LayerProps = {
        id: 'schools',
        type: 'circle',
        paint: {
            'circle-radius': 4,
            'circle-color': [
                'case', ['==', 
                            ['get', 'prop_as'], 
                            ['max', ['get', 'prop_as'], ['get', 'prop_bl'], ['get', 'prop_hi'], ['get', 'prop_or'], ['get', 'prop_wh']]
                        ], "#FF5050", 
                        ['==', 
                            ['get', 'prop_bl'], 
                            ['max', ['get', 'prop_as'], ['get', 'prop_bl'], ['get', 'prop_hi'], ['get', 'prop_or'], ['get', 'prop_wh']]
                        ],  "#4472C4", 
                        ['==', 
                            ['get', 'prop_hi'], 
                            ['max', ['get', 'prop_as'], ['get', 'prop_bl'], ['get', 'prop_hi'], ['get', 'prop_or'], ['get', 'prop_wh']]
                        ],  "#FF9900", 
                        ['==', 
                            ['get', 'prop_or'], 
                            ['max', ['get', 'prop_as'], ['get', 'prop_bl'], ['get', 'prop_hi'], ['get', 'prop_or'], ['get', 'prop_wh']]
                        ],  "#FFC000", 
                        ['==', 
                            ['get', 'prop_wh'], 
                            ['max', ['get', 'prop_as'], ['get', 'prop_bl'], ['get', 'prop_hi'], ['get', 'prop_or'], ['get', 'prop_wh']]
                        ],  "#339933", 
                        "#808080"
                ],
        }
    }



    return (
        <>
        {data !== undefined &&
        <Map 
        initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 3.5
          }}
        style={{width: 1200, height:700}}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={mapbox_token}
        attributionControl={false}
        >
        <GeolocateControl position="top-left"/>
        <FullscreenControl position="top-left"/>
        <NavigationControl position = "top-left"/>
        <Source type='geojson' data={data}>
        <Layer {...LayerProps}/>
        </Source>
        <Source id='boundary-source' type="vector" url="mapbox://theokaufman.a7l31auu">
            <Layer {...boundaryLayer} />
        </Source>
        </Map>
        }
        </>
    )

}