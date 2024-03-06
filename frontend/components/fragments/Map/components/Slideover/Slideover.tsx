import React, { useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

const Drawer = dynamic(() => import("@mui/material/Drawer"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const ChevronRightIcon = dynamic(
  () => import("@mui/icons-material/ChevronRight")
);
const Divider = dynamic(() => import("@mui/material/Divider"));

const Control = dynamic(() => import("../Control"));

import { Bounds, MapLevel } from "interfaces";

import { button, drawerPaper } from "./Slideover.module.scss";

interface Props {
  mapLevel: MapLevel;
  handleMapLevel: (l: MapLevel) => void;
  handleBounds: (e: Bounds) => void;
}

export default function Slideover({
  mapLevel,
  handleMapLevel,
  handleBounds,
}: Props) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((o) => !o);

  return (
    <>
      <button
        onClick={toggleOpen}
        className={clsx(
          "absolute top-2.5 right-2.5 z-20 flex flex-col justify-center items-center",
          button
        )}
        aria-label="Open map options"
      >
        <span className="block bg-map-control h-1 w-8 rounded translate-y-3" />
        <span className="block bg-map-control h-1 w-8 rounded" />
        <span className="block bg-map-control h-1 w-8 rounded -translate-y-3" />
      </button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleOpen}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
        classes={{
          paper: drawerPaper,
        }}
        variant="persistent"
      >
        <div className="flex flex-start p-2">
          <IconButton onClick={toggleOpen} aria-label="Close map options">
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <div className="p-4">
          <h1 className="text-xl mb-4">Map Options</h1>
          <Control
            mapLevel={mapLevel}
            handleMapLevel={handleMapLevel}
            handleBounds={handleBounds}
          />
        </div>
      </Drawer>
    </>
  );
}
