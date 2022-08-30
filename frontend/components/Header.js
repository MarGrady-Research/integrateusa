import React from "react";
import Link from 'next/link';
import Image from "next/image";

function Header() {

    return(
        <div className="relative h-400">
        <div className="relative h-300 mt-10">
            <div className="flex flex-row justify-evenly">
                <a href="https://www.margrady.com"
                   className="flex justify-start basis-1/4 ml-20">
                <Image src="/mg_logo.png" 
                       alt="margrady logo" 
                       width={100}
                       height={30}/>
                </a>
                <h1 className="flex justify-center text-4xl basis-1/2">IntegrateUSA</h1>
                <a href="https://www.carnegie.org/"
                   className="flex justify-end basis-1/4 mr-20">
                    <Image 
                        src="/ccny_logo.svg" 
                        alt="ccny logo" 
                        width={100} 
                        height={30}
                    />
                </a>
            </div> 
        </div>
        <div className="h-500 mt-10">
            <div className="static flex justify-evenly text-3l">
                <Link href="/info">
                    <a className="hover:underline active:underline">Info and Trends</a>
                </Link>
                <Link href="/segregation">
                    <a className="hover:underline">Segregation Measures</a>
                </Link>
                <Link href="/map">
                    <a className="hover:underline">Map</a>
                </Link>
                <Link href="/about">
                    <a className="hover:underline">About</a>
                </Link>
            </div>
    </div>
    </div>
    )
}

export default Header