import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config } from "tailwindcss/types/config";

import tailwindConfig from "../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig as Config);

const breakpoints = fullConfig?.theme?.screens || {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const breakpointsNumbers = { sm: 0, md: 0, lg: 0, xl: 0, "2xl": 0 };

for (const bp in breakpoints) {
  breakpointsNumbers[bp as Breakpoint] = parseInt(
    breakpoints[bp as Breakpoint].slice(0, -2)
  );
}

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
type BreakpointRegion = "xs" | "sm" | "md" | "lg" | "xl" | null;

export function useBreakpointRegion() {
  const [breakpointRegion, setBreakpointRegion] = useState(
    null as BreakpointRegion
  );

  const { sm, md, lg, xl } = breakpointsNumbers;

  useEffect(() => {
    const returnBreakpointRegion = (): BreakpointRegion => {
      if (window.innerWidth < sm) {
        return "xs";
      }

      if (window.innerWidth < md) {
        return "sm";
      }

      if (window.innerWidth < lg) {
        return "md";
      }

      if (window.innerWidth < xl) {
        return "lg";
      }

      return "xl";
    };

    const handleResize = () => {
      const currentBreakpointRegion = returnBreakpointRegion();
      setBreakpointRegion(currentBreakpointRegion);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sm, md, lg, xl]);

  return breakpointRegion;
}
