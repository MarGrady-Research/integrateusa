import React from "react";
import Image from "next/image";

import MarGradyLogoText from "public/MarGradyLogoText.png";

export default function Footer() {
  return (
    <footer className="flex justify-center mt-5 sm:hidden">
      <Image src={MarGradyLogoText} alt="MarGrady Logo" width={250} />
    </footer>
  );
}
