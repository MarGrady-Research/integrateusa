import React, { useEffect, useState, useCallback, useRef} from "react";
import axios from 'axios';
import { Loader } from "../Loader";
import Map, {Layer, Source, Popup, NavigationControl, GeolocateControl, FullscreenControl} from 'react-map-gl';
import mapbox_token from "../../Key";
import Control from "./Control";
import MapPie from "./MapPies";
import Slideover from "./SLideover";
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

    // State variable to control the visibility of the boundary layer
    const [stateVisible, setStateVisible] = useState('none')

    const handleVisibility = (level) => {
        if (level === "District") {
            setDistrictVisible('visible');
            setCountyVisible('none');
            setStateVisible('none');
        } else if (level === "County") {
            setDistrictVisible('none');
            setCountyVisible('visible');
            setStateVisible('none');
        } else if (level === "State") {
            setDistrictVisible('none');
            setCountyVisible('none')
            setStateVisible('visible')  
        } else {
            setDistrictVisible('none');
            setCountyVisible('none')
            setStateVisible('none')
        }
    }

    // Layer object for state boundary layer
    const stateLayer = {
        id: 'state-boundary',
        type: 'fill',
        source: 'state-boundary-source',
        'source-layer': 'cb_2018_us_state_500k-8q06w5',
        paint: {
            'fill-outline-color': 'rgba(0,0,0,0.1)',
            'fill-color': 'rgba(0,0,0,0.1)'
        },
        layout: {
            visibility: stateVisible
        }
    }

    // State variable to control the visibility of the county boundary layer
    const [countyVisible, setCountyVisible] = useState('none')

    // Layer object for the county boundary layer
    const countyLayer = {
        id: 'county-boundary',
        type: 'fill',
        source: 'county-boundary-source',
        'source-layer': 'cb_2018_us_county_500k-6dd9y3',
        paint: {
            'fill-outline-color': 'rgba(0,0,0,0.1)',
            'fill-color': 'rgba(0,0,0,0.1)'
        },
        layout: {
            visibility: countyVisible
        }
    }

    // State variable to control the visibility of the district boundary layer
    const [districtVisible, setDistrictVisible] = useState('none')

    // Layer object for the district boundary layer
    const districtLayer = {
        id: 'district-boundary',
        type: 'fill',
        'source-layer': '2021_sd_unified-4mqqrn',
        paint: {
            'fill-outline-color': 'rgba(0,0,0,0.1)',
            'fill-color': 'rgba(0,0,0,0.1)'
        },
        layout: {
            visibility: districtVisible
        }
    }

    const prop_array = ['max', ['get', 'prop_as'], ['get', 'prop_bl'], ['get', 'prop_hi'], ['get', 'prop_or'], ['get', 'prop_wh']]

    const LayerProps = {
        id: 'schools',
        type: 'circle',
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 3.5, 1, 14, 9],
            'circle-color': [
                'case', ['==', ['get', 'prop_as'], prop_array],  "#FF5050", 
                        ['==', ['get', 'prop_bl'], prop_array],  "#4472C4", 
                        ['==', ['get', 'prop_hi'], prop_array],  "#FF9900", 
                        ['==', ['get', 'prop_or'], prop_array],  "#FFC000", 
                        ['==', ['get', 'prop_wh'], prop_array],  "#339933", 
                        "#808080"
                ],
        }
    }

    // Using the useMap hook to set up ease to functionality
    const mapRef = useRef();

    // Click info state variable, to hold relevant data from clicked school
    const [clickInfo, setClickInfo] = useState(null);

    const handleClick = useCallback((event) => {
        setClickInfo(null);
        const school = event.features && event.features[0];
        setClickInfo({
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
          sch_name: school && school.properties.sch_name,
          year: school && school.properties.year,
          tot_enr: school && school.properties.tot_enr,
          prop_as: school && school.properties.prop_as,
          prop_bl: school && school.properties.prop_bl,
          prop_hi: school && school.properties.prop_hi,
          prop_or: school && school.properties.prop_or,
          prop_wh: school && school.properties.prop_wh
        });
        const center = [event.lngLat.lng, event.lngLat.lat];
        school && mapRef.current.easeTo({center: center, duration: 500});
      }, [])

      
    const selectedSchool = clickInfo && clickInfo.sch_name || '';


    // Set State on mouse enter
    const onMouseEnter = useCallback(() => setCursor('pointer'), []);
    const onMouseLeave = useCallback(() => setCursor('auto'), []);

    return (
        <>
        {isLoading ? <Loader /> :
        <>
        <Map 
        ref={mapRef}
        initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 4
          }}
        style={{position: 'relative', width: '100vw', height:'100vh'}}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={mapbox_token}
        attributionControl={true}
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
        <Source id='district-boundary-source' type="vector" url="mapbox://theokaufman.45uz283x">
            <Layer {...districtLayer} />
        </Source>
        <Source id='county-boundary-source' type="vector" url="mapbox://theokaufman.6i9q4by5">
            <Layer {...countyLayer} />
        </Source>
        <Source id='state-boundary-source' type="vector" url="mapbox://theokaufman.a7l31auu">
            <Layer {...stateLayer} />
        </Source>
        {selectedSchool &&
        <Popup 
            anchor={'bottom-left'}
            longitude={clickInfo.longitude}
            latitude={clickInfo.latitude}
            offset={5}
            closebutton={false}
            closeOnClick={false}
            onClose={() => setClickInfo(null)}
            className='text-left'>
        {/* <div className="text-left"> */}
        <span className="font-medium text-center"><b>{selectedSchool}</b></span>
        <br></br>
        <span>In <b>{clickInfo.year}</b>, there were <b>{clickInfo.tot_enr}</b> total students enrolled</span>
        <MapPie clickInfo={clickInfo}/>
        {/* </div> */}
        </Popup>
        }
        </Map>
        <div className="absolute top-32 right-10">
        <Control handleVisibility={handleVisibility}/>
        {/* <Slideover /> */}
        </div>
        </>
        }
        </>
    )

}