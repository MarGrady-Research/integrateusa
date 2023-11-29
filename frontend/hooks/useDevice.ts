import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config, ScreensConfig } from "tailwindcss/types/config";

import tailwindConfig from "../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig as Config);

const breakpoints = fullConfig?.theme?.screens || {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

const breakpointsNumbers = { md: 0 };

for (const bp in breakpoints) {
  breakpointsNumbers[bp] = parseInt(breakpoints[bp].slice(0, -2));
}

type Device = "Tablet" | "Desktop" | "Initial";

export function useDevice() {
  const [device, setDevice] = useState("Initial" as Device);

  const { md } = breakpointsNumbers;

  useEffect(() => {
    const returnDevice = (): Device => {
      if (window.innerWidth < md) {
        return "Tablet";
      }

      return "Desktop";
    };

    const handleResize = () => {
      const currentDevice = returnDevice();
      setDevice(currentDevice);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return device;
}
