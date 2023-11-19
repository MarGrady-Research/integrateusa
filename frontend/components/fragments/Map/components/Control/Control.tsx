import React, { useState } from "react";
import Search from "../Search";

export default function Control({ handleVisibility, handleBounds }) {
  const [level, setLevel] = useState("School");

  const handleChange = (e) => {
    setLevel(e.target.value);
    handleVisibility(e.target.value);
  };

  const race = [
    { race: "Asian", color: "#FF5050" },
    { race: "Black", color: "#4472C4" },
    { race: "Hispanic", color: "#FF9900" },
    { race: "Other Races", color: "#FFC000" },
    { race: "White", color: "#339933" },
  ];

  // Function to return legend JSX
  const legend = () =>
    race.map((el) => {
      return (
        <div key={el.race} className="flex items-center">
          <span
            className="w-4 h-4 rounded-sm mr-2 p-1"
            key={el.color}
            style={{ backgroundColor: el.color }}
          ></span>
          <span key={el.race} className="text-md">
            {el.race}
          </span>
        </div>
      );
    });

  // Function to return boundaries JSX
  const boundaries = () => {
    return (
      <>
        <p className="text-lg text-gray-900 mb-1">Boundaries</p>
        <div className="flex flex-col mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="School"
              value="School"
              checked={level === "School"}
              onChange={handleChange}
              className="w-4 h-4 mr-2"
            />
            No Boundary
          </label>

          <div className="flex items-center">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="District"
                value="District"
                checked={level === "District"}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
              />
              District
            </label>
          </div>

          <div className="inline-flex">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="County"
                value="County"
                checked={level === "County"}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
              />
              County
            </label>
          </div>

          <div className="inline-flex">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="State"
                value="State"
                checked={level === "State"}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
              />
              State
            </label>
          </div>
        </div>

        <div>
          <Search level={level} handleBounds={handleBounds} />
        </div>
      </>
    );
  };

  return (
    <>
      <p className="text-lg text-gray-900 mb-1">Legend</p>
      <div className="flex flex-col w-full mb-4">
        <div className="text-left">{legend()}</div>
      </div>

      {boundaries()}
    </>
  );
}
