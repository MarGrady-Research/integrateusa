import clsx from "clsx";
import React from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Hamburger({ isOpen, setIsOpen }: Props) {
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const commonClass = "block transition-all duration-300 ease-out h-0.5 w-6";

  return (
    <button
      onClick={handleClick}
      className="flex flex-col p-1.5 lg:hidden justify-center items-center"
      aria-label={isOpen ? "Close the menu" : "Open the menu"}
      aria-expanded={isOpen}
      aria-controls="drawer"
      id="hamburger"
    >
      <span
        className={clsx(commonClass, {
          "rotate-45 translate-y-1 bg-secondary": isOpen,
          "-translate-y-0.5 bg-primary": !isOpen,
        })}
        aria-hidden
      />
      <span
        className={clsx(commonClass, "my-0.5", {
          "opacity-0 bg-secondary": isOpen,
          "opacity-100 bg-primary": !isOpen,
        })}
        aria-hidden
      />
      <span
        className={clsx(commonClass, {
          "-rotate-45 -translate-y-1 bg-secondary": isOpen,
          "translate-y-0.5 bg-primary": !isOpen,
        })}
        aria-hidden
      />
    </button>
  );
}
