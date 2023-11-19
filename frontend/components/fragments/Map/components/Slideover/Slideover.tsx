import { useState } from "react";
import clsx from "clsx";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";

import Control from "../Control";
// @ts-ignore
import { button, drawerPaper, drawerRoot } from "./Slideover.module.scss";

export default function Slideover({ handleVisibility, handleBounds }) {
  const [open, setOpen] = useState(false);

  const [radio, setRadio] = useState({ level: "School" });

  const handleRadio = (evt) => {
    setRadio({ level: evt.target.value });
  };

  const toggleOpen = () => setOpen((o) => !o);

  return (
    <>
      <button
        onClick={toggleOpen}
        className={clsx(
          "absolute top-2.5 right-2.5 z-20 flex justify-center items-center",
          button
        )}
      >
        <MenuIcon fontSize="large" />
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
          root: drawerRoot,
          paper: drawerPaper,
        }}
        variant="persistent"
      >
        <div className="flex flex-start p-2">
          <IconButton onClick={toggleOpen}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <div className="p-4 font-sans">
          <h1>Map Options</h1>
          <Control
            radio={radio}
            handleRadio={handleRadio}
            handleVisibility={handleVisibility}
            handleBounds={handleBounds}
          />
        </div>
      </Drawer>
    </>
  );
}
