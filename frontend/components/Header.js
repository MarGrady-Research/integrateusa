import React from "react";
import Link from 'next/link';
import Image from "next/image";

function Header() {

// Note: Header code adapted from https://tailblocks.cc/

return(
  <header className="text-black bg-white body-font font-raleway drop-shadow-md">
  <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
    <Link href='/'>
    <a className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
                <Image src="/IntegrateUSALogo.png" 
                       alt="IntegrateUSA logo"
                       width = {200}
                       height={60}/>
    </a>
    </Link>
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
    <Link href="/info">
    <a className="mr-5 hover:text-gray-500">Demographic Info</a>
    </Link>
    <Link href="/segregation">
    <a className="mr-5 hover:text-gray-500">Segregation</a>
    </Link>
    <Link href="/map">
    <a className="mr-5 hover:text-gray-500">Map</a>
    </Link>
    <Link href="/about">
    <a className="mr-5 hover:text-gray-500">About</a>
    </Link>
    </nav>
    <Link href='http://www.margrady.com/'>
    <span className="inline-flex items-center hover:cursor-pointer sm:ml-auto sm:mt-0 mt-4 md:justify-center">
        {/* <a> */}
        <Image src="/mg-logo-text.png" 
               alt="MarGrady Logo"
               width = {250}
               height={60}/>
        {/* /> */}
        {/* </a> */}
    <Link href='http://www.margrady.com/'>
    <span className="inline-flex items-center hover:cursor-pointer sm:ml-auto sm:mt-0 mt-4 md:justify-center">
        {/* <a> */}
        <Image src="/mg-logo-text.png" 
               alt="MarGrady Logo"
               width = {250}
               height={60}/>
        {/* /> */}
        {/* </a> */}
      </span>
    </Link>
  </div>
</header>
)
}

export default Header