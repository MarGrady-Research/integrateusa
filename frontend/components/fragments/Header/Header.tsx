import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/router";

import { root } from "./Header.module.scss";

import MarGradyLogoText from "public/MarGradyLogoText.png";
import IntegrateUSALogo from "public/IntegrateUSALogo.png";

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
      className={clsx("mr-6 last:mr-0 duration-300 hover:text-secondary", {
        "text-primary hover:text-primary": isActiveURL,
      })}
    >
      {title}
    </Link>
  );
}

export default function Header() {
  return (
    <header className={clsx("text-black bg-white shadow relative", root)}>
      <div className="container px-3 h-full mx-auto flex flex-wrap flex-col lg:flex-row items-center justify-center lg:justify-between">
        <div className="flex items-center flex-col lg:flex-row">
          <Link
            href="/"
            className="flex items-center text-black w-40 sm:w-auto"
          >
            <Image src={IntegrateUSALogo} alt="IntegrateUSA logo" width={200} />
          </Link>
          <nav className="hidden lg:block lg:pl-4 lg:border-l lg:border-gray-400 flex items-center justify-center text-xl font-medium">
            <NavLink url="/" title="Home" />
            <NavLink url="/info" title="Demographic Info" />
            <NavLink url="/segregation" title="Segregation" />
            <NavLink url="/research" title="Research" />
            <NavLink url="/about" title="About" />
          </nav>
        </div>
        <div className="hidden xl:block inline-flex items-center justify-center hover:cursor-pointer ">
          <a href="https://www.margrady.com/" target="_blank">
            <Image src={MarGradyLogoText} alt="MarGrady Logo" width={250} />
          </a>
        </div>
      </div>
    </header>
  );
}
