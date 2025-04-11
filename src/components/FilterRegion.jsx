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
    <div className="relative mx-4 mt-6">
      <div className="bg-bg-secondary w-[55%] cursor-pointer rounded-md p-4 drop-shadow-sm">
        <button
          onClick={toggleDropdown}
          className="flex w-full cursor-pointer items-center justify-between text-sm"
        >
          {selectedRegion} <RiArrowDownSLine />
        </button>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-[55%] drop-shadow-sm">
          <ul className="bg-bg-secondary cursor-pointer rounded-md px-4 py-2">
            {regions.map((region) => {
              return (
                <li
                  className="mt-1.5 text-sm"
                  key={region}
                  onClick={() => handleSelect(region)}
                >
                  {region}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterRegion;
