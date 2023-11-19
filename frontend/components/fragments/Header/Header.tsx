import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface NavLinkProps {
  url: string;
  title: string;
}

function NavLink({ url, title }: NavLinkProps) {
  const router = useRouter();

  const isActiveURL = router.pathname === url;

  return (
    <Link href={url}>
      <a
        className={`mr-5 last:mr-0 hover:text-secondary ${
          isActiveURL ? "text-primary hover:text-primary" : ""
        }`}
      >
        {title}
      </a>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="text-black bg-white font-sans shadow text-sm sm:text-base lg:text-lg">
      <div className="container p-3 mx-auto flex flex-wrap flex-col lg:flex-row items-center justify-center lg:justify-between">
        <div className="flex items-center flex-col lg:flex-row">
          <Link href="/">
            <a className="flex items-center text-black w-40 sm:w-auto">
              <Image
                src="/IntegrateUSALogo.png"
                alt="IntegrateUSA logo"
                width={200}
                height={60}
              />
            </a>
          </Link>
          <nav className="lg:pl-4 lg:border-l lg:border-gray-400	flex flex-wrap items-center  justify-center">
            <NavLink url="/info" title="Demographic Info" />
            <NavLink url="/segregation" title="Segregation" />
            <NavLink url="/map" title="Map" />
            <NavLink url="/about" title="About" />
          </nav>
        </div>
        <div className="absolute lg:relative w-28 sm:w-40 lg:w-auto top-0 right-0 inline-flex items-center hover:cursor-pointer justify-center">
          <Link href="http://www.margrady.com/">
            <Image
              src="/mg-logo-text.png"
              alt="MarGrady Logo"
              width={250}
              height={57}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
