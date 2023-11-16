import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import LevelSelect from "./components/LevelSelect";
import SearchSelect from "./components/SearchSelect";
import YearSelect from "./components/YearSelect";
import GradeSelect from "./components/GradeSelect";

interface Props {
  getData: () => void;
  isLoading: boolean;
}

export default function Selection({ getData, isLoading }: Props) {
  return (
    <div className="shadow">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 container mx-auto p-5 font-raleway">
        <LevelSelect />
        <SearchSelect />
        <YearSelect />
        <GradeSelect />
        <div>
          <button
            onClick={getData}
            disabled={isLoading}
            className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
