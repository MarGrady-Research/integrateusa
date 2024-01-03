import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/router";

// @ts-ignore
import { root } from "./Header.module.scss";

import MarGradyLogoText from "../../../public/MarGradyLogoText.png";
import IntegrateUSALogo from "../../../public/IntegrateUSALogo.png";

interface NavLinkProps {
  url: string;
  title: string;
}

function NavLink({ url, title }: NavLinkProps) {
  const router = useRouter();

  const isActiveURL = router.pathname === url;

  return (
    <Link
      href={url}
      className={clsx({
        "mr-3 sm:mr-5 last:mr-0 hover:text-secondary ": true,
        "text-primary hover:text-primary": isActiveURL,
      })}
    >
      {title}
    </Link>
  );
}

export default function Header() {
  return (
    <header
      className={clsx(
        "text-black bg-white shadow text-sm sm:text-base lg:text-lg relative",
        root
      )}
    >
      <div className="container p-3 mx-auto flex flex-wrap flex-col lg:flex-row items-center justify-center lg:justify-between">
        <div className="flex items-center flex-col lg:flex-row">
          <Link
            href="/"
            className="flex items-center text-black w-40 sm:w-auto"
          >
            <Image src={IntegrateUSALogo} alt="IntegrateUSA logo" width={200} />
          </Link>
          <nav className="lg:pl-4 lg:border-l lg:border-gray-400	flex flex-wrap items-center justify-center">
            <NavLink url="/" title="Home" />
            <NavLink url="/info" title="Demographic Info" />
            <NavLink url="/segregation" title="Segregation" />
            <NavLink url="/research" title="Research" />
            <NavLink url="/about" title="About" />
          </nav>
        </div>
        <div className="absolute lg:relative w-28 sm:w-40 lg:w-auto top-0 right-0 inline-flex items-center hover:cursor-pointer justify-center">
          <a href="http://www.margrady.com/" target="_blank">
            <Image src={MarGradyLogoText} alt="MarGrady Logo" width={250} />
          </a>
        </div>
      </div>
    </header>
  );
}
