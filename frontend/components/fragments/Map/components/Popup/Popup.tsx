import React from "react";
import clsx from "clsx";

// @ts-ignore
import { root } from "./Popup.module.scss";

export default function Popup({ name, coordinates }) {
  const { x, y, height, width } = coordinates;

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const left = x < halfWidth ? 20 : -160;
  const top = y < halfHeight ? 20 : -70;

  return (
    <div
      style={{
        left: coordinates.x + left,
        top: coordinates.y + top,
        zIndex: 10,
        position: "absolute",
        maxWidth: "300px",
      }}
      className={clsx("bg-white font-sans p-1 text-center", root)}
    >
      <p className="text-sm">{name}</p>
      <p className="italic">Click for more info</p>
    </div>
  );
}
