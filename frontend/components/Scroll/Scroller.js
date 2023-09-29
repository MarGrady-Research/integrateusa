import React, {useState} from "react";
import {Scrollama, Step} from 'react-scrollama';
import ScrollerPie from "./Graph1";
import ScrollerBar from "./Graph2";
import ScrollerBar2 from "./Graph3";
import ScrollerBar3 from "./Graph4";
import ScrollerLine from "./Graph5";
import ScrollerLine2 from "./Graph6";
import ScrollerLine3 from "./Graph7";
import ScrollerLine4 from "./Graph8";
import {rawdata, schooldata, exposureData, comparisonData, d15ExposureWhiteV1, d15ExposureWhiteV2, fullCompData, compDataNormalized } from "./Data";
import Link from "next/link";
import Image from 'next/image';
import {ChevronDoubleRightIcon, ChevronDoubleDownIcon} from '@heroicons/react/20/solid';


export default function Scroller() {

     const stepStyle = {
        margin: '0 auto 3rem auto',
        paddingTop: '50%',
        paddingBottom: '50%',
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

     

    // State

    const [currentStepIndex, setCurrentStepIndex] = useState(null);

    // Step Functions

    const onStepEnter = ({data}) => {
        setCurrentStepIndex(data);
    };

    const onStepExit = ({data, direction}) => {
        data === 0 && direction === 'up' ? setCurrentStepIndex(-1) : null;
    };

    //  Return charts based on active Step

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
                <ScrollerLine d15ExposureWhite={d15ExposureWhiteV1}/>
            )
        };
        if (currentStepIndex === 5) {
            return (
                <ScrollerLine2 d15ExposureWhite={d15ExposureWhiteV2}/>
            )
        };
        if (currentStepIndex === 6) {
            return (
                <ScrollerLine3 fullCompData={fullCompData}/>
            )
        };
        if (currentStepIndex === 7) {
            return (
                <ScrollerLine4 compDataNormalized={compDataNormalized}/>
            )
        };
    }

    return (

        <div>            
            {/* Opening Screen, navigate to Dashboard or scroll down for story */}
            <div className='w-screen h-screen flex flex-col space-y-20 items-center justify-center'>
                
                <div className='inline-flex items-center'>
                    <Link href='/info'>
                    <Image src="/IntegrateUSALogo.png" 
                                    alt="IntegrateUSA Logo"
                                    width = {300}
                                    height={80}
                                    className='hover:cursor-pointer'/>
                    </Link>
                </div>
            
                <Link href='/info'>
                <div className='flex flex-col  hover:text-gray-500 hover:cursor-pointer items-center'>
                <span className='font-raleway inline-flex items-center text-xl'>Explore the dashboard <ChevronDoubleRightIcon className='h-6 w-6'/></span> 
                </div>
                </Link>
                
                <div className='flex flex-col items-center'>
                    <div><span className='font-raleway text-xl'>Scroll down for a case study of New York City&#39;s District 15 </span></div>
                    <div>
                    <ChevronDoubleDownIcon className='w-7 h-7 pt-2 animate-bounce'/>
                    </div>
                </div>
            
            </div>
    
            {/* Scroller Component */}
            <div style ={{
                        padding: '40vh 2vw 20vh',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                
                <div style={{flexBasis: "35%"}}>
                <Scrollama offset={0.5} onStepEnter={onStepEnter} onStepExit={onStepExit}>
                <Step style={stepStyle} data={0}>
                    <div style={stepStyle} >
                    <div className="text-center text-xl">
                        <span>In 2019, New York City&#39;s School District 15 was a racially diverse district
                        <br/>
                        <br/>
                        The 6th graders in the district were:
                        <br/>
                        <br/>
                        <b>
                        <span className="text-hispanic">41% Hispanic</span> <br/>
                        <span className="text-whitestudents">30% White</span> <br/>
                        <span className="text-asian">13% Asian</span> <br/>
                        <span className="text-blackstudents">13% Black</span> <br/>
                        <span className="text-other">4% Other Races</span> <br/>
                        </b> 
                        </span>
                    </div>  
                    </div>
                </Step>
                <Step data={1}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>But when we look at District 15 on a school level, White students appear to be segregated from non-White students 
                        <br/>
                        <br/>
                        In 2019, <span className="text-whitestudents"><b>2/3 of White students</b></span> in the district attend just <b>5</b> of the district&#39;s <b>16</b> middle schools
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
                        For example, we can compare the share of <span className="text-whitestudents">White</span> students in the average <span className="text-whitestudents">White</span> student&#39;s school to the share of <span className="text-whitestudents">White</span> students in the average non-<span className="text-whitestudents">White</span> student&#39;s school
                        </span>
                    </div>
                    </div>
                </Step>
                <Step data={3}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>In District 15 in 2019, the average White student&#39;s school had <b>42%</b> White students
                        <br/>
                        <br/>
                        The average non-White student&#39;s school had <b>24%</b> White students
                        <br/>
                        <br/>
                        The difference of these shares is the <b>Normalized Exposure</b> rate: <b>18%</b> 
                        </span>
                    </div>
                    </div>
                </Step>
                <Step data={4}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>Normalized Exposure rates can help us to understand segregation in the district over time</span>
                    </div>
                    </div>
                </Step>
                <Step data={5}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>In 2019, <span className="text-line-red"><b>District 15</b></span> implemented an integration plan
                        <br/>
                        <br/>
                        After the plan&#39;s implementation, we see a dropoff in Normalized Exposure rates for White students in the District
                        </span>
                    </div>
                    </div>
                </Step>
                <Step data={6}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>We can compare <span className="text-line-red"><b>District 15</b></span> to demographically similar districts without integration plans
                        <br/>
                        <br/>
                        The Normalized Exposure for White students in <span className="text-line-red"><b>District 15</b></span> shows a steep drop compared to other districts
                        </span>
                    </div>
                    </div>
                </Step>
                <Step data={7}>
                    <div style={stepStyle}>
                    <div className="text-center text-xl">
                        <span>We can also normalize these rates using the 2019 values for each district
                        <br/>
                        <br/>
                        <span className="text-line-red"><b>District 15</b></span> has the largest drop in White Normalized Exposure rates of any comparable district after 2019
                        </span>
                    </div>
                    </div>
                </Step>
                </Scrollama>
                </div>
                {/* Sticky Graphic */}
                <div style ={graphicStyle}>
                    <div className="w-3/4">
                        {charts()}
                    </div>
                </div>
            </div>

            <div className='sticky w-screen h-screen flex flex-col py-10 items-center justify-between'>
                    
                <div className='flex flex-col px-4 items-center'>
                    <span className='font-raleway inline-flex items-center text-center text-xl'>
                    IntegrateUSA was built to explore segregation in districts, counties and states nationwide
                    <br/>
                    <br/>
                    Use the dashboard to visualize demographics and understand segregation levels in different areas over time
                    </span> 
                </div>

                <Link href='/info'>
                    <div className='flex flex-col  hover:text-gray-500 hover:cursor-pointer items-center'>
                        <span className='font-raleway inline-flex items-center text-xl'>Explore the dashboard <ChevronDoubleRightIcon className='h-6 w-6'/></span> 
                    </div>
                </Link>

                <div className='inline-flex items-center hover:cursor-pointer'>
                    <Link href='http://www.margrady.com/'>
                    <Image src="/mg-logo.png" 
                        alt="MarGrady Logo"
                        width = {350}
                        height={80}/>
                    </Link>
                </div>
                
            </div>
            
        </div>
    );
}