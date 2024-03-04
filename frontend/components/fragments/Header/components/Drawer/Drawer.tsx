import React from "react";
import clsx from "clsx";

import Drawer from "@mui/material/Drawer";

import { drawerPaper } from "./Drawer.module.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children?: React.ReactNode;
}

export default function HeaderDrawer({ isOpen, setIsOpen, children }: Props) {
  const handleClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClick={handleClose}
      anchor="top"
      classes={{
        paper: clsx(drawerPaper, "!h-screen p-6 text-center"),
      }}
      id="drawer"
      data-testid="drawer"
      aria-labelledby="hamburger"
      variant="persistent"
    >
      {children}
    </Drawer>
  );
}
