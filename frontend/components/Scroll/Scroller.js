import React, {useState} from "react";
import {Scrollama, Step} from 'react-scrollama';
import ScrollerPie from "./Graph1";
import ScrollerBar from "./Graph2";
import Link from "next/link";
import Image from 'next/image';
import {ChevronDoubleRightIcon, ChevronDoubleDownIcon} from '@heroicons/react/20/solid';


export default function Scroller() {

     const rawdata = {
        year:2019,
        grade:"06",
        dist_id:"1500000",
        dist_name:"NYC Geographic District #15",
        asian:346,
        black:350,
        hispanic:1107,
        other:100,
        white:812
    };

    const schooldata = [ 
        {"sch_name":"Pave Academy Charter School","prop_as":3.6,"prop_bl":39.3,"prop_hi":55.4,"prop_or":0,"prop_wh":1.8},
        {"sch_name":"Summit Academy Charter School","prop_as":0,"prop_bl":21.6,"prop_hi":75.7,"prop_or":0,"prop_wh":2.7},
        {"sch_name":"Sunset Park Prep","prop_as":20.9,"prop_bl":1.1,"prop_hi":75.4,"prop_or":0,"prop_wh":2.7},
        {"sch_name":"Is 136 Charles O. Dewey",'prop_as':8.7,'prop_bl':1.1,'prop_hi':84.8,'prop_or':1.1,"prop_wh":4.3},
        {"sch_name":"Jhs 88 Peter Rouget","prop_as":20.7,"prop_bl":13.5,"prop_hi":55,"prop_or":1.8,"prop_wh":9},
        {"sch_name":"Brooklyn Urban Garden Charter School","prop_as":1,"prop_bl":38.4,"prop_hi":34.3,"prop_or":5.1,"prop_wh":21.2},
        {"sch_name":"Brooklyn Collaborative Studies","prop_as":3.5,"prop_bl":23.5,"prop_hi":37.4,"prop_or":6.1,"prop_wh":29.6},
        {"sch_name":"Park Slope Collegiate","prop_as":8.4,"prop_bl":26.3,"prop_hi":33.7,"prop_or":1.1,"prop_wh":30.5},
        {"sch_name":"Hellenic Classical Charter School","prop_as":2,"prop_bl":18,"prop_hi":38,"prop_or":10,"prop_wh":32},
        {"sch_name":"Brooklyn Prospect Charter School-Csd 15","prop_as":8.2,"prop_bl":13.6,"prop_hi":36.4,"prop_or":5.5,"prop_wh":36.4},
        {"sch_name":"MS 839","prop_as":9.4,"prop_bl":10.2,"prop_hi":29.7,"prop_or":5.5,"prop_wh":45.3},
        {"sch_name":"MS 51 William Alexander","prop_as":19.4,"prop_bl":6.2,"prop_hi":22.5,"prop_or":4.9,"prop_wh":47},
        {"sch_name":"Math and Science Exploratory School (the)","prop_as":10.9,"prop_bl":15.2,"prop_hi":22.8,"prop_or":2.7,"prop_wh":48.4},
        {"sch_name":"Boerum Hill School for International Studies (the)","prop_as":2.9,"prop_bl":18.8,"prop_hi":19.4,"prop_or":8.2,"prop_wh":50.6},
        {"sch_name":"MS 442 Carroll Gardens School for Innovation","prop_as":12.8,"prop_bl":7.1,"prop_hi":22,"prop_or":6.4,"prop_wh":51.8},
        {"sch_name":"New Voices School of Academic and Creative Arts","prop_as":9.3,"prop_bl":9.3,"prop_hi":20.5,"prop_or":4.9,"prop_wh":56.1},
    ];

    const [pie, setPie] = useState({});
    const [bar, setBar] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(null);

    const onStepEnter = ({data}) => {
        setCurrentStepIndex(data);
        if (data === 0 ) {
            setPie(rawdata);
            setBar([]);
        };
        if (data === 1) {
            setPie({});
            setBar(schooldata);
        }
    };

    return (
        <div>
             <div style={{ position: 'sticky', top: 0, border: '1px solid orchid' }}>
             I'm sticky. The current triggered step index is:
             </div>
                <Scrollama offset={0.5} onStepEnter={onStepEnter} >
                <Step>
                    <div
                        style={{
                            margin: '50vh 0',
                            border: '1px solid gray',
                            display: 'flex flex-row'
                            // opacity: currentStepIndex === stepIndex ? 1 : 0.2,
                        }}
                        >
                        <div className='flex flex-col items-center mx-auto'>
                        
                        <div className='inline-flex items-center'>
                        <Image src="/mg_logo_cropped.png" 
                                        alt="margrady logo"
                                        width = {100}
                                        height={80}/>
                        <span className="ml-3 text-3xl font-raleway">IntegrateUSA</span>
                        </div>
                
                        <Link href='/info'>
                        <span className='inline-flex items-center hover:text-gray-500 hover:cursor-pointer font-raleway py-5'>Explore the dashboard <ChevronDoubleRightIcon className='h-5 w-5'/></span> 
                        </Link>
                    
                        <div className='py-5 flex items-center'>
                        <span className='font-raleway'>Or scroll through the story </span>
                        <div>
                        <ChevronDoubleDownIcon className='w-5 h-5'/>
                        </div>
                        </div>
                
                        </div>
                    </div>
                </Step> 
                <Step data={0}>
                    <div
                    style={{
                        margin: '50vh 0',
                        border: '1px solid gray',
                        display: 'flex flex-row'
                        // opacity: currentStepIndex === stepIndex ? 1 : 0.2,
                    }}
                    >
                    <div className="w-1/2">
                        <span>In 2019, New York City's School District 15 was a racially diverse district</span>
                    </div>
                    <div className="w-1/2">
                    <ScrollerPie rawdata={pie}/>
                    </div>
                    </div>
                </Step>
                <Step data={1}>
                    <div
                    style={{
                        margin: '50vh 0',
                        border: '1px solid gray',
                        display: 'flex flex-row'
                        // opacity: currentStepIndex === stepIndex ? 1 : 0.2,
                    }}
                    >
                    <div className="w-1/2">
                        <span>But, when we look at District 15 on a school level, we see that the district was highly segregated</span>
                    </div>
                    <div className="w-1/2">
                    <ScrollerBar schooldata={bar}/>
                    </div>
                    </div>
                </Step>
                </Scrollama>
            </div>
    );
}