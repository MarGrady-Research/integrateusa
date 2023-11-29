import React from "react";
import clsx from "clsx";

// @ts-ignore
import { root } from "./Popup.module.scss";

interface Props {
  name: string;
  coordinates: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  children: React.ReactNode;
}

export default function Popup({ name, coordinates, children }: Props) {
  const { x, y, height, width } = coordinates;

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const left = x < halfWidth ? 20 : -260;
  const top = y < halfHeight ? 20 : -430;

  return (
    <div
      style={{
        left: coordinates.x + left,
        top: coordinates.y + top,
        zIndex: 10,
        position: "absolute",
        maxWidth: "300px",
      }}
      className={clsx(
        "bg-white p-3 w-60 font-sans font-normal p-1 text-center text-sm ",
        root
      )}
    >
      <p className="mb-2">{name}</p>
      {children}
      <p className="italic mt-5">Click for more info</p>
    </div>
  );
}
