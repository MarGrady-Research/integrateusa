import React from "react";
import Search from "../Search";

export default function Control({
  radio,
  handleRadio,
  handleVisibility,
  handleBounds,
}) {
  // Radio Elements and functions

  const handleChange = (e) => {
    handleRadio(e);
    handleVisibility(e.target.value);
  };

  //  Legend elements
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
        <div className="flex flex-col pt-2">
          <div className="p-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="School"
                value="School"
                checked={radio.level === "School"}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
              />
              No Boundary
            </label>
          </div>

          <div className="p-1 flex items-center">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="District"
                value="District"
                checked={radio.level === "District"}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
              />
              District
            </label>
          </div>

          <div className="p-1 inline-flex">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="County"
                value="County"
                checked={radio.level === "County"}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
              />
              County
            </label>
          </div>

          <div className="p-1 inline-flex">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="State"
                value="State"
                checked={radio.level === "State"}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
              />
              State
            </label>
          </div>
        </div>

        <div className="pt-5">
          <Search radio={radio} handleBounds={handleBounds} />
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="flex flex-col w-full">
        <p className="text-lg text-gray-900 pb-2">Legend</p>
        <div className="text-left p-1">{legend()}</div>
      </div>

      <p className="text-lg pt-4 text-gray-900">Boundaries</p>
      {boundaries()}
    </div>
  );
}
