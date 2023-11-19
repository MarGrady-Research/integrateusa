import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import MenuIcon from "@mui/icons-material/Menu";
import { XMarkIcon } from "@heroicons/react/24/outline";

import Control from "../Control";
import { button } from "./Slideover.module.scss";

export default function Slideover({ handleVisibility, handleBounds }) {
  // state for panel open/close
  const [open, setOpen] = useState(false);

  // radio state
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

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="absolute right-0 h-full z-30"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="relative inset-0 overflow-hidden">
            <div className="inset-0 overflow-hidden">
              <div className="pointer-events-none relative  right-0  max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <div className="relative flex flex-col h-screen drop-shadow-xl bg-gray-100 shadow-xl">
                      <button
                        type="button"
                        className="rounded-md text-black hover:text-primary focus:outline-none p-3"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-xl font-medium text-gray-900">
                          Map Options
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <Control
                            radio={radio}
                            handleRadio={handleRadio}
                            handleVisibility={handleVisibility}
                            handleBounds={handleBounds}
                          />
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
