import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { Loader } from "../Loader";
import Map, {Layer, Source, Popup, NavigationControl, GeolocateControl, FullscreenControl} from 'react-map-gl';
import mapbox_token from "../../Key";
import MapPie from "./MapPies";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function DemographicMap() {

    // Loading state variable
    const [isLoading, setIsLoading] = useState(false);

    // Cursor state variable
    const [cursor, setCursor] = useState('auto')

    // Data state variable
    const [data, setData] = useState({});

    const getData = async () => {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8000/api/mapschools/?q=2021");
        setData({type: "FeatureCollection", features: response.data.map(e => e.map_data)});
        setIsLoading(false);
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
    }

    const LayerProps = {
        id: 'schools',
        type: 'circle',
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 3.5, 1, 14, 9],
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

    const [clickInfo, setClickInfo] = useState(null);

    const handleClick = (event) => {
        const school = event.features && event.features[0];
        setClickInfo({
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
          sch_name: school && school.properties.sch_name,
          prop_as: school && school.properties.prop_as,
          prop_bl: school && school.properties.prop_bl,
          prop_hi: school && school.properties.prop_hi,
          prop_or: school && school.properties.prop_or,
          prop_wh: school && school.properties.prop_wh
        });
      }

    const selectedSchool = clickInfo && clickInfo.sch_name || '';

    // Set State on mouse enter
    const onMouseEnter = useCallback(() => setCursor('pointer'), []);
    const onMouseLeave = useCallback(() => setCursor('auto'), []);

    return (
        <>
        {isLoading ? <Loader /> :
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
        interactiveLayerIds={['schools']}
        onClick={handleClick}
        cursor={cursor}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
        {selectedSchool &&
        <Popup 
            anchor={'left'}
            longitude={clickInfo.longitude}
            latitude={clickInfo.latitude}
            offset={[0,-10]}
            closebutton={true}
            closeOnClick={true}
            onClose={() => setClickInfo(null)}>
        <b>{selectedSchool}</b>
        <MapPie clickInfo={clickInfo} />
        </Popup>
        }
        </Map>
        }
        </>
    )

}