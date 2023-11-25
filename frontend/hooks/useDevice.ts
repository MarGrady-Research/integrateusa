import { useState, useEffect } from "react";

type Device = "Tablet" | "Desktop" | "Initial";

export function useDevice() {
  const [device, setDevice] = useState("Initial" as Device);

  useEffect(() => {
    const returnDevice = (): Device => {
      if (window.innerWidth < 1024) {
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
