import React from "react";
import clsx from "clsx";

import { firstSection as firstSectionStyle } from "./Section.module.scss";

interface Props {
  children: React.ReactNode[];
  firstSection?: boolean;
}

export default function Section({ children, firstSection = false }: Props) {
  return (
    <div
      className={clsx({
        "px-5 md:px-10 py-12 flex flex-col items-center": true,
        [firstSectionStyle]: firstSection,
      })}
    >
      {children}
    </div>
  );
}
