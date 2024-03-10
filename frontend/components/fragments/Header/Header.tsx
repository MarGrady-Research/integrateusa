import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/router";

const Drawer = dynamic(() => import("./components/Drawer"));

import Hamburger from "./components/Hamburger";

import { useBreakpointRegion } from "hooks";

import { root } from "./Header.module.scss";

import MarGradyLogoText from "public/MarGradyLogoText.png";
import IntegrateUSALogo from "public/IntegrateUSALogo.png";

interface NavLinkProps {
  url: string;
  title: string;
}

function NavLink({ url, title }: NavLinkProps) {
  const router = useRouter();

  const isActiveURL =
    url === "/" ? router.pathname === url : router.pathname.startsWith(url);

  return (
    <Link
      href={url}
      className={clsx(
        "mr-0 lg:mr-6 last:mr-0 mb-2 lg:mb-0 duration-300 hover:text-primary text-2xl lg:text-xl font-medium",
        {
          "text-primary underline underline-offset-8 decoration-2 ":
            isActiveURL,
        }
      )}
    >
      {title}
    </Link>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const breakpointRegion = useBreakpointRegion();
  const onTablet =
    breakpointRegion === "xs" ||
    breakpointRegion === "sm" ||
    breakpointRegion === "md";

  useEffect(() => {
    if (!onTablet && isOpen) {
      setIsOpen(false);
    }
  }, [onTablet, isOpen]);

  const navLinks = (
    <>
      <NavLink url="/" title="Home" />
      <NavLink url="/info" title="Demographic Info" />
      <NavLink url="/segregation" title="Segregation" />
      <NavLink url="/research" title="Research" />
      <NavLink url="/about" title="About" />
    </>
  );

  return (
    <>
      <header className={clsx("text-black bg-white shadow relative", root)}>
        <div className="max-w-full lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl pl-4 pr-2.5 lg:px-6 h-full mx-auto flex items-center justify-between">
          <div className="flex items-center flex-col lg:flex-row">
            <Link href="/" className="relative mr-0 lg:mr-4">
              <Image
                src={IntegrateUSALogo}
                alt="IntegrateUSA logo"
                width={200}
              />
              <span className="text-sm sm:text-base absolute bottom-1 sm:bottom-0 right-0.5 sm:right-0 text-red-600">
                beta
              </span>
            </Link>
            <nav className="hidden lg:block lg:pl-4 lg:border-l lg:border-gray-400 flex items-center justify-center">
              {navLinks}
            </nav>
          </div>
          <div className="hidden xl:block inline-flex items-center justify-center hover:cursor-pointer">
            <a href="https://www.margrady.com/" target="_blank">
              <Image
                src={MarGradyLogoText}
                alt="MarGrady Logo"
                width={250}
                style={{ height: "auto", width: "auto" }}
              />
            </a>
          </div>
          <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </header>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {navLinks}
      </Drawer>
    </>
  );
}
