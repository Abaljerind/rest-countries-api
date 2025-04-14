import { useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import Countries from "./Countries";
import FilterRegion from "./FilterRegion";

const CountrySearch = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");

  return (
    <div className="my-6">
      <div className="bg-bg-secondary mx-4 rounded-md drop-shadow-sm">
        <form className="flex items-center gap-4 py-2">
          <PiMagnifyingGlassBold className="text-text-secondary ml-4 text-xl" />
          <input
            type="text"
            onChange={(e) => setSearchCountry(e.target.value)}
            className="text-text-primary mr-4 w-full py-1 text-sm outline-0 placeholder:text-sm"
            placeholder="Search for a country..."
          />
        </form>
      </div>

      <FilterRegion
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

      <Countries
        searchCountry={searchCountry}
        selectedRegion={selectedRegion}
      />
    </div>
  );
};

export default CountrySearch;
