import React, { useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const Drawer = dynamic(() => import("@mui/material/Drawer"));
const ChevronRightRoundedIcon = dynamic(
  () => import("@mui/icons-material/ChevronRightRounded")
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
        <MenuRoundedIcon fontSize="large" />
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
        <div className="flex flex-start p-4">
          <button
            onClick={toggleOpen}
            aria-label="Close map options"
            className={button}
          >
            <ChevronRightRoundedIcon fontSize="large" />
          </button>
        </div>
        <Divider />
        <div className="p-4 pt-2.5">
          <h1 className="text-xl mb-3">Map Options</h1>
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
