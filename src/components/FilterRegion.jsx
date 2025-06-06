import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

const FilterRegion = ({ selectedRegion, setSelectedRegion }) => {
  const [isOpen, setIsOpen] = useState(false);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleSelect(region) {
    setSelectedRegion(region);
    setIsOpen(false);
  }

  return (
    <div className="relative mx-4 mt-6 md:mt-0">
      <div className="bg-bg-secondary w-[55%] cursor-pointer rounded-md p-4 drop-shadow-sm md:w-full">
        <button
          onClick={toggleDropdown}
          className="flex w-full cursor-pointer items-center justify-between text-sm md:mr-6 md:px-2"
        >
          {selectedRegion} <RiArrowDownSLine />
        </button>
      </div>

      <div
        className={`absolute mt-2 w-[55%] origin-top ${isOpen ? "scale-y-100" : "scale-y-0"} drop-shadow-sm duration-300 md:w-full`}
      >
        <ul className="bg-bg-secondary cursor-pointer rounded-md px-4 py-2">
          {regions.map((region) => {
            return (
              <li
                className="hover:bg-bg-primary mt-1.5 text-sm transition-all duration-200 hover:rounded-lg hover:px-4 hover:py-2"
                key={region}
                onClick={() => handleSelect(region)}
              >
                {region}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FilterRegion;
