import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Countries = ({ searchCountry, selectedRegion }) => {
  const countries = useLoaderData();

  const [allCountries, setAllCountries] = useState(countries);

  const deleteCountry = allCountries.filter((country) => {
    if (country.name !== "Israel") {
      return country;
    }
  });

  const filteredCountries = deleteCountry
    .filter((country) => {
      if (selectedRegion !== "Filter by Region") {
        return country.region === selectedRegion;
      }
      return true;
    })
    .filter((country) => {
      if (searchCountry === "") {
        return country;
      } else if (
        country.name.toLowerCase().includes(searchCountry.toLowerCase())
      ) {
        return country;
      }
    });

  const displayCountries =
    searchCountry === "" && selectedRegion === "Filter by Region"
      ? filteredCountries.slice(0, 8)
      : filteredCountries;

  return (
    <div className="grid gap-9 py-9">
      {displayCountries.map((country, index) => {
        return (
          <div
            key={index + 1}
            className="bg-bg-secondary mx-auto w-[70%] overflow-hidden rounded-md shadow-md"
          >
            <div>
              <img
                src={country?.flag}
                alt={country?.name}
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              <p className="mb-3 text-lg font-extrabold">{country?.name}</p>
              <p className="text-sm">
                <span className="font-semibold">Population:</span>{" "}
                <span className="font-light">
                  {country?.population.toLocaleString()}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Region:</span>{" "}
                <span className="font-light">{country?.region}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Capital:</span>{" "}
                <span className="font-light">{country?.capital}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Countries;
