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
import { paper } from "./InfoDialog.module.scss";

interface Props {
  open: boolean;
  handleClose: () => void;
  name: string;
  children: React.ReactNode;
  infoUrlParams: string;
  segUrlParams: string;
}

const InfoDialog = memo(
  ({
    open,
    handleClose,
    name,
    children,
    infoUrlParams,
    segUrlParams,
  }: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const infoUrl = `/info${infoUrlParams}`;
    const segUrl = `/segregation${segUrlParams}`;

    return (
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        fullScreen={fullScreen}
        classes={{ root: "font-sans", paper }}
      >
        <DialogTitle className="text-center !font-semibold">{name}</DialogTitle>
        <DialogContent>
          {children}
          <div className="flex pt-10 justify-between">
            <Link href={infoUrl}>
              <a className="font-semibold text-primary hover:underline">
                Demographic Info
              </a>
            </Link>
            <Link href={segUrl}>
              <a className="font-semibold text-primary hover:underline">
                Segregation
              </a>
            </Link>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default InfoDialog;
