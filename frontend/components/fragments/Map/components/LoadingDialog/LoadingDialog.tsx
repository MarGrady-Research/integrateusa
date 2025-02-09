import React, { memo } from "react";
import clsx from "clsx";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import Loader from "components/fragments/Loader";

import { paper } from "./LoadingDialog.module.scss";
import { MapStatus } from "interfaces";

interface Props {
  open: boolean;
  mapStatus: MapStatus;
}

const LoadingDialog = memo(({ open, mapStatus }: Props) => {
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
        root: "!absolute !bottom-auto !right-auto !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2 !z-10",
        paper,
      }}
      hideBackdrop
      disableAutoFocus
      disableEnforceFocus
      PaperProps={{ title: "Loading Dialog" }}
    >
      <DialogContent
        classes={{
          root: "flex flex-col items-center justify-center h-80 w-80",
        }}
      >
        {!fetchingFailed && <Loader />}
        <p
          className={clsx("mt-5 italic text-xl", {
            "text-red-600": fetchingFailed,
          })}
        >
          {message}
        </p>
      </DialogContent>
    </Dialog>
  );
});

LoadingDialog.displayName = "LoadingDialog";

export default LoadingDialog;
