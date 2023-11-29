import React, { memo } from "react";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

// @ts-ignore
import { paper } from "./Dialog.module.scss";

interface Props {
  open: boolean;
  handleClose: () => void;
  name: string;
  children: React.ReactNode;
}

const DialogMain = memo(({ open, handleClose, name, children }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      fullScreen={fullScreen}
      classes={{ root: "font-sans", paper }}
    >
      <DialogTitle className="text-center !font-semibold">{name}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
});

export default DialogMain;
