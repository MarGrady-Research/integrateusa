import React, { memo } from "react";
import clsx from "clsx";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import Loader from "../../../Loader";

// @ts-ignore
import { paper } from "./LoadingDialog.module.scss";
import { MapStatus } from "../../../../../interfaces";

interface Props {
  open: boolean;
  mapStatus: MapStatus;
}

const InfoDialog = memo(({ open, mapStatus }: Props) => {
  let message = " ";

  switch (mapStatus) {
    case MapStatus.Fetching:
      message = "Fetching data";
      break;
    case MapStatus.Rendering:
      message = "Rendering data";
      break;
    case MapStatus.Failed:
      message = "Fetching data failed";
      break;
    case MapStatus.Complete:
      message = "Data rendered";
      break;
  }

  const fetchingFailed = mapStatus === MapStatus.Failed;

  return (
    <Dialog
      open={open}
      classes={{
        root: "font-sans !absolute !bottom-auto !right-auto !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2",
        paper,
      }}
      hideBackdrop
      disableEnforceFocus
    >
      <DialogContent
        classes={{
          root: "flex flex-col items-center justify-center h-80 w-full sm:w-80",
        }}
      >
        {!fetchingFailed && <Loader />}
        <p
          className={clsx({
            "mt-5 italic": true,
            "text-red-500": fetchingFailed,
          })}
        >
          {message}
        </p>
      </DialogContent>
    </Dialog>
  );
});

export default InfoDialog;
