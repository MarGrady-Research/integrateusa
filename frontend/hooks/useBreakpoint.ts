import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config } from "tailwindcss/types/config";

import tailwindConfig from "../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig as Config);

const breakpoints = fullConfig?.theme?.screens || {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

const breakpointsNumbers = { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 };

for (const bp in breakpoints) {
  breakpointsNumbers[bp] = parseInt(breakpoints[bp].slice(0, -2));
}

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(null as Breakpoint);

  const { xs, sm, md, lg } = breakpointsNumbers;

  useEffect(() => {
    const returnBreakpoint = (): Breakpoint => {
      if (window.innerWidth < xs) {
        return "xs";
      }

      if (window.innerWidth < sm) {
        return "sm";
      }

      if (window.innerWidth < md) {
        return "md";
      }

      if (window.innerWidth < lg) {
        return "lg";
      }

      return "xl";
    };

    const handleResize = () => {
      const currentBreakpoint = returnBreakpoint();
      setBreakpoint(currentBreakpoint);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
}
