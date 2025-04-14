import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLoaderData, useParams } from "react-router-dom";

const _alpha3Code = () => {
  const params = useParams();
  const allCountries = useLoaderData();

  const [detail, setDetail] = useState();
  const [countryName, setCountryName] = useState(allCountries);
  const [borderNames, setBorderName] = useState([]);

  useEffect(() => {
    if (!params.alpha3Code) return;

    async function fetchDetail() {
      try {
        const res = await fetch(
          `https://restcountries.com/v2/alpha/${params.alpha3Code}`,
        );
        const data = await res.json();
        setDetail(data);
      } catch (error) {
        console.log("Failed to fetch detail country.", error.message);
      }
    }

    fetchDetail();
  }, [params.alpha3Code]);

  useEffect(() => {
    if (!detail?.borders || !countryName?.length) return;

    const names = detail?.borders.map((code) => {
      const match = countryName?.find((country) => country.alpha3Code === code);
      return match ? match.name : code;
    });

    setBorderName(names);
  }, [detail, countryName]);

  return (
    <div>
      <div className="p-6">
        <Link
          to={"/"}
          className="bg-bg-secondary mt-2 mb-8 flex w-24 cursor-pointer items-center justify-evenly rounded-xs px-2 py-1 text-sm drop-shadow-md"
        >
          <FaArrowLeftLong />
          <p>Back</p>
        </Link>

        <div className="flex justify-center">
          <img
            className="w-full md:h-64 md:w-[65%] md:object-cover"
            src={detail?.flags.png}
            alt={`${detail?.name} Flag`}
          />
        </div>

        <div className="md:mx-auto md:w-[65%]">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h2 className="mt-6 text-2xl font-extrabold">{detail?.name}</h2>
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-sm font-bold">
                  Native Name:{" "}
                  <span className="font-light">{detail?.nativeName}</span>
                </p>
                <p className="text-sm font-bold">
                  Population:{" "}
                  <span className="font-light">
                    {detail?.population.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm font-bold">
                  Region: <span className="font-light">{detail?.region}</span>
                </p>
                <p className="text-sm font-bold">
                  Sub Region:{" "}
                  <span className="font-light">{detail?.subregion}</span>
                </p>
                <p className="text-sm font-bold">
                  Capital: <span className="font-light">{detail?.capital}</span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <p className="text-sm font-bold">
                Top Level Domain:{" "}
                <span className="font-light">{detail?.topLevelDomain}</span>
              </p>
              <p className="text-sm font-bold">
                Currencies:{" "}
                <span className="font-light">
                  {detail?.currencies?.[0]?.name}
                </span>
              </p>
              <p className="text-sm font-bold">
                Languages:{" "}
                <span className="font-light">
                  {detail?.languages?.[0]?.nativeName}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold">Border Countries:</h3>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {borderNames.map((border, index) => {
                return (
                  <p
                    className="bg-bg-secondary flex items-center justify-center rounded-xs py-1 text-center text-xs font-light shadow-md md:px-2"
                    key={index + 1}
                  >
                    {border}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default _alpha3Code;
