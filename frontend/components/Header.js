import React from "react";
import Link from 'next/link';
import Image from "next/image";

function Header() {

// Note: Header code adapted from https://tailblocks.cc/

return(
    <header className="text-gray-600 bg-gray-300 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <Image src="/mg_logo_cropped.png" 
                       alt="margrady logo"
                       width = {50}
                       height={50}/>
      <span className="ml-3 text-xl">IntegrateUSA</span>
    </a>
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
    <Link href="/info">
    <a className="mr-5 hover:text-gray-900">Demographic Info</a>
    </Link>
    <Link href="/segregation">
    <a className="mr-5 hover:text-gray-900">Segregation</a>
    </Link>
    <Link href="/map">
    <a className="mr-5 hover:text-gray-900">Map</a>
    </Link>
    <Link href="/about">
    <a className="mr-5 hover:text-gray-900">About</a>
    </Link>
    </nav>
  </div>
</header>
)
}

export default Header