import React from "react";
import Image from "next/image";
import Link from "next/link";

import MarGradyLogoText from "public/MarGradyLogoText.png";

export default function Footer() {
  return (
    <footer className="flex justify-center mt-5 xl:hidden">
      <Link href="https://www.margrady.com/">
        <Image src={MarGradyLogoText} alt="MarGrady Logo" width={250} />
      </Link>
    </footer>
  );
}
