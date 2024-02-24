import React from "react";
import clsx from "clsx";

import { firstSection as firstSectionStyle } from "./Section.module.scss";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  firstSection?: boolean;
}

export default function Section({ children, firstSection = false }: Props) {
  return (
    <div
      className={clsx({
        "relative px-5 md:px-10 py-12 flex flex-col items-center text-center text-sm md:text-base lg:text-lg xl:text-xl":
          true,
        [firstSectionStyle]: firstSection,
        "min-h-screen": !firstSection,
      })}
    >
      {children}
    </div>
  );
}
