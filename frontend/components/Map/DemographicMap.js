import React, { useEffect, useState, useCallback, useRef} from "react";
import axios from 'axios';
import { Loader } from "../Loader";
import Map, {Layer, Source, Popup, NavigationControl, GeolocateControl, FullscreenControl} from 'react-map-gl';
import mapbox_token from "../../Key";
import MapPie from "./MapPies";
import Slideover from "./Slideover";
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
        const response = await axios.get("http://localhost:8000/api/mapschools/?q=2022");
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
            'fill-outline-color': [
                'case',
                ['boolean', ['feature-state', 'hover'], true],
                'rgba(0,0,0,0.1)',
                'rgba(255,255,255,0.1)'
            ],
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

    const prop_array = ['max', ['get', 'prop_as'], ['get', 'prop_bl'], ['get', 'prop_hi'], ['get', 'prop_or'], ['get', 'prop_wh']];

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

    // Using the useMap hook to access additional map methods
    const mapRef = useRef();

    const updateBounds = useCallback((e) => {
        mapRef.current.fitBounds([[e.lngmin, e.latmin], [e.lngmax, e.latmax]], {padding: 25, duration:2000});
    }, []);

    // Handle bounds change
    const handleBounds = (e) => {
       updateBounds(e);
    }

    // Click info state variable, to hold relevant data from clicked school
    const [clickInfo, setClickInfo] = useState(null);

    const handleClick = useCallback((event) => {
        setClickInfo(null);
        const {
            features,
            point: {x,y},
        } = event;
        const hoveredFeature = event.features && event.features[0];
        setClickInfo(hoveredFeature && {feature: hoveredFeature, x, y});
        clickInfo && mapRef.current.setFeatureState({source: 'county-boundary-source', sourceLayer: 'cb_2018_us_county_500k-6dd9y3', id: 'county-boundary'}, {hover: true})
        // const center = [event.lngLat.lng, event.lngLat.lat];
        // hoveredFeature && mapRef.current.easeTo({center: center, duration: 500});
      }, [])

      
    const selectedSchool = clickInfo && clickInfo.feature.properties.sch_name || '';
    const selectedArea = clickInfo && clickInfo.feature.properties.NAME || ''


    // Set State on mouse enter
    const onMouseEnter = useCallback(() => setCursor('pointer'), []);
    const onMouseLeave = useCallback(() => setCursor('auto'), []);

    return (
        <>
        {isLoading ? <div className="pt-5"><Loader /></div> :
        <>
        <div className="relative w-full h-[calc(100vh-66px)]">
        <Map 
        ref={mapRef}
        initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 4
          }}
        style={{position: 'relative', width: '100%', height:'100%'}}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={mapbox_token}
        attributionControl={true}
        interactiveLayerIds={['schools', 'district-boundary', 'county-boundary', 'state-boundary']}
        onMouseMove={handleClick}
        cursor={cursor}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
        <GeolocateControl position="top-left"/>
        <FullscreenControl position="top-left"/>
        <NavigationControl position = "top-left"/>
        <Source id='district-boundary-source' type="vector" url="mapbox://theokaufman.45uz283x">
            <Layer {...districtLayer} />
        </Source>
        <Source id='county-boundary-source' type="vector" url="mapbox://theokaufman.6i9q4by5">
            <Layer {...countyLayer} />
        </Source>
        <Source id='state-boundary-source' type="vector" url="mapbox://theokaufman.a7l31auu">
            <Layer {...stateLayer} />
        </Source>
        <Source type='geojson' data={data}>
        <Layer {...LayerProps}/>
        </Source>
        {(selectedSchool || selectedArea) && (
            <div style={{left: clickInfo.x + 20, top: clickInfo.y + 20, zIndex: 10, position: 'absolute', fontSize: '10px', maxWidth: '300px'}} className="bg-gray-900 text-white text-center font-raleway w-60 h-300 rounded-md">

            {selectedSchool && (
                <div className="p-3">
                <span className="overflow-ellipsis"><b>{selectedSchool}</b></span>
                <br/>
                <span><b>District: </b>{clickInfo.feature.properties.dist_name}</span>
                <br/>
                <span><b>County: </b>{clickInfo.feature.properties.county_name}</span>
                <br/>
                <span><b>{clickInfo.feature.properties.year} Enrollment: </b> {clickInfo.feature.properties.tot_enr}</span>
                <br/>
                <span className="text-asian"><b>Asian:</b> <span className="text-white">{(clickInfo.feature.properties.prop_as*100).toFixed(1)}%</span></span>
                <br/>
                <span className="text-blackstudents"><b>Black:</b> <span className="text-white">{(clickInfo.feature.properties.prop_bl*100).toFixed(1)}%</span></span>
                <br/>
                <span className="text-hispanic"><b>Hispanic:</b> <span className="text-white">{(clickInfo.feature.properties.prop_hi*100).toFixed(1)}%</span></span>
                <br/>
                <span className="text-other"><b>Other:</b> <span className="text-white">{(clickInfo.feature.properties.prop_or*100).toFixed(1)}%</span></span>
                <br/>
                <span className="text-whitestudents"><b>White:</b> <span className="text-white">{(clickInfo.feature.properties.prop_wh*100).toFixed(1)}%</span></span>
                <br/>
                <div className="w-1/2 justify-center pt-2 mx-auto">
                <MapPie clickInfo={clickInfo}/>
                </div>
                
                </div>
            )}

            {selectedArea && 
                <div className="p-3">
                <span><b>{selectedArea}</b></span>
                </div>
            }

            </div>  
            )  
        }
        </Map>
        <Slideover handleVisibility={handleVisibility} handleBounds={handleBounds}/>
        </div>
        
        </>
        }
        </>
    )

}