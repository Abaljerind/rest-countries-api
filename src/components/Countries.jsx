import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Countries = ({ searchCountry, selectedRegion }) => {
  const countries = useLoaderData();

  const [allCountries, setAllCountries] = useState(countries);

  const deleteCountry = allCountries.filter((country) => {
    if (country.name.common !== "Israel") {
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
        country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
      ) {
        return country;
      }
    });

  const displayCountries =
    searchCountry === "" && selectedRegion === "Filter by Region"
      ? filteredCountries.slice(0, 8)
      : filteredCountries;

  return (
    <div className="grid gap-9 py-9 md:grid-cols-2 xl:grid-cols-4 xl:gap-20 xl:px-12">
      {displayCountries.map((country, index) => {
        return (
          <Link
            to={`/detail/${country.cca3}`}
            key={index + 1}
            className="bg-bg-secondary mx-auto w-[70%] overflow-hidden rounded-md shadow-md transition-all duration-300 hover:scale-105 hover:shadow-2xl xl:w-[95%]"
          >
            <div>
              <img
                src={country?.flags.png}
                alt={country?.flags.alt}
                className="h-40 w-full object-fill"
              />
            </div>
            <div className="p-6">
              <p className="mb-3 text-lg font-extrabold">
                {country?.name.common}
              </p>
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
                <span className="font-light">{country?.capital[0]}</span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Countries;
