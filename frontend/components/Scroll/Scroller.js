import React, {useState} from "react";
import {Scrollama, Step} from 'react-scrollama';
import ScrollerPie from "./Graph1";
import ScrollerBar from "./Graph2";
import ScrollerBar2 from "./Graph3";
import ScrollerBar3 from "./Graph4";
import Link from "next/link";
import Image from 'next/image';
import {ChevronDoubleRightIcon, ChevronDoubleDownIcon} from '@heroicons/react/20/solid';


export default function Scroller() {

     const stepStyle = {
        margin: '0 auto 3rem auto',
        padding: '180px 0',
        // border: '1px solid #333',
        '& p': {
          textAlign: 'center',
          padding: '1rem',
          fontSize: '1.8rem',
          margin: 0,
        },
        '&:lastChild': {
          marginBottom: 0,
        },
      }

      const graphicStyle = {
        flexBasis: '60%',
        position: 'sticky',
        width: '100%',
        height: '60vh',
        top: '20vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& p': {
        fontSize: '5rem',
        fontWeight: 700,
        textAlign: 'center',
        color: '#fff',
        }}

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

    const exposureData = [
        {
            name: 'Avg White Student',
            asian: 8.99,
            black: 14.85,
            hispanic: 28.86,
            other:	5.30,
            white: 41.99
        },
        {
            name: 'Avg Non-White Student',
            asian: 8.79,
            black: 17.11,
            hispanic: 46.64,
            other: 3.38,
            white: 24.08
        }
    ]

    const comparisonData = [42, 24, 18];

    const [currentStepIndex, setCurrentStepIndex] = useState(null);

    const onStepEnter = ({data}) => {
        setCurrentStepIndex(data);
    };

    const charts = () => {
        if (currentStepIndex === 0 ) {
            return (    
            <ScrollerPie rawdata={rawdata}/>
            )
        };
        if (currentStepIndex === 1) {
            return (
            <ScrollerBar schooldata={schooldata}/>
            )
        };
        if (currentStepIndex === 2) {
            return (
            <ScrollerBar2 exposureData={exposureData}/>
            )
        };
        if (currentStepIndex === 3) {
            return (
            <ScrollerBar3 comparisonData={comparisonData}/>
            )
        };
        if (currentStepIndex === 4) {
            return (
            <Image src = '/D15 Headline.png'
                   alt="District 15 headline"
                   width = {500}
                   height={300}
                   placeholder='blur'
                   priority
                   blurDataURL="/D15 Headline.png"
                   style={{transition: '0.5s'}}
                   className='w-full h-full transition-opacity ease-in transition-duration-500'/>
            )
        };
        if (currentStepIndex === 5) {

        }
    }

    return (

        <div>            
            <div className='w-screen h-screen flex flex-col py-5 items-center justify-between'>
                
                <div className='inline-flex items-center'>
                    <Image src="/IntegrateUSALogo.png" 
                                    alt="IntegrateUSA Logo"
                                    width = {300}
                                    height={80}/>
                </div>
            
                <Link href='/info'>
              
                <div className='flex flex-col  hover:text-gray-500 hover:cursor-pointer items-center'>
                <span className='font-raleway inline-flex items-center text-xl'>Explore the dashboard <ChevronDoubleRightIcon className='h-6 w-6'/></span> 
                
               
                </div>
               
                </Link>
                
                <div className='flex flex-col items-center'>
                    <div><span className='font-raleway text-xl'>Explore the story </span></div>
                    <div>
                    <ChevronDoubleDownIcon className='w-7 h-7 pt-2 animate-bounce'/>
                    </div>
                </div>
            
            </div>
    

             <div style ={{
                        padding: '40vh 2vw 20vh',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                <div style={{flexBasis: "35%"}}>
                <Scrollama offset={0.5} onStepEnter={onStepEnter} >
                <Step style={stepStyle} data={0}>
                    <div style={stepStyle} >
                    <div className="text-center text-xl">
                        <span>In 2019, New York City&#39;s School District 15 was a racially diverse district:
                        <br/>
                        <br/>
                        <b>
                        <span className="text-asian">13% Asian</span> <br/>
                        <span className="text-blackstudents">13% Black</span> <br/>
                        <span className="text-hispanic">41% Hispanic</span> <br/>
                        <span className="text-other">4% Other Races</span> <br/>
                        <span className="text-whitestudents">30% White</span> <br/>
                        </b> 
                        </span>
                    </div>  
                    </div>
                </Step>
                <Step data={1}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>But when we look at District 15 on a school level, White students appear to be highly segregated from non-White students 
                        <br/>
                        <br/>
                        <span className="text-whitestudents"><b>2/3 of White students</b></span> in the district attend just <b>5</b> of its <b>16</b> schools
                        </span>
                    </div>
                    </div>
                </Step>
                <Step data={2}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>One way to measure segregation is using <b>Normalized Exposure</b> rates
                        <br/>
                        <br/>
                        We compare the share of White students in the average White student's school to the share of White students in the average non-White student's school
                        </span>
                    </div>
                    </div>
                </Step>
                <Step data={3}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>In District 15 in 2019, the average White student's school had <b>42%</b> white students
                        <br/>
                        <br/>
                        The average non-White student's school had <b>24%</b> White students
                        <br/>
                        <br/>
                        The difference of these shares is our <b>Normalized Exposure</b> rate: <b>18%</b> 
                        </span>
                    </div>
                    </div>
                </Step>
                <Step data={4}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>In 2019, District 15 implemented an integration plan for 6th graders
                        <br/>
                        <br/>
                        One of the ways we can track the progress of this plan is by tracking Normalized Exposure rates in the District over time
                        </span>
                    </div>
                    </div>
                </Step>
                <Step data={5}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>When we look at Normalized exposure rates in the District, we see a dropoff after time
                        <br/>
                        <br/>
                        
                        </span>
                    </div>
                    </div>
                </Step>
                </Scrollama>
                </div>
                <div style ={graphicStyle}>
                    <div className="w-3/4">
                        {charts()}
                    </div>
                
                </div>
                </div>
        </div>
    );
}