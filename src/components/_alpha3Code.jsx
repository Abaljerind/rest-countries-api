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
      return match
        ? { code: match.alpha3Code, name: match.name }
        : { code, name: code };
    });

    setBorderName(names);
  }, [detail, countryName]);

  return (
    <div>
      <div className="p-6">
        <Link
          to={"/"}
          className="bg-bg-secondary mt-2 mb-8 flex w-24 cursor-pointer items-center justify-evenly rounded-xs px-2 py-1 text-sm drop-shadow-md xl:ml-8"
        >
          <FaArrowLeftLong />
          <p>Back</p>
        </Link>

        <div className="xl:grid xl:grid-cols-2 xl:items-center">
          <div className="flex justify-center">
            <img
              className="w-full md:h-64 md:w-[65%] md:object-cover xl:h-80 xl:w-[80%]"
              src={detail?.flags.png}
              alt={`${detail?.name} Flag`}
            />
          </div>

          <div className="md:mx-auto md:w-[65%] xl:w-[85%]">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h2 className="mt-6 text-2xl font-extrabold xl:text-3xl">
                  {detail?.name}
                </h2>
                <div className="mt-4 flex flex-col gap-2">
                  <p className="p-text-format">
                    Native Name:{" "}
                    <span className="font-light">{detail?.nativeName}</span>
                  </p>
                  <p className="p-text-format">
                    Population:{" "}
                    <span className="font-light">
                      {detail?.population.toLocaleString()}
                    </span>
                  </p>
                  <p className="p-text-format">
                    Region: <span className="font-light">{detail?.region}</span>
                  </p>
                  <p className="p-text-format">
                    Sub Region:{" "}
                    <span className="font-light">{detail?.subregion}</span>
                  </p>
                  <p className="p-text-format">
                    Capital:{" "}
                    <span className="font-light">{detail?.capital}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <p className="p-text-format">
                  Top Level Domain:{" "}
                  <span className="font-light">{detail?.topLevelDomain}</span>
                </p>
                <p className="p-text-format">
                  Currencies:{" "}
                  <span className="font-light">
                    {detail?.currencies?.[0]?.name}
                  </span>
                </p>
                <p className="p-text-format">
                  Languages:{" "}
                  <span className="font-light">
                    {detail?.languages?.[0]?.nativeName}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="p-text-format">Border Countries:</h3>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {borderNames.map((border, index) => {
                  return (
                    <Link
                      to={`/detail/${border.code}`}
                      className="bg-bg-secondary flex cursor-pointer items-center justify-center rounded-xs py-1 text-center text-xs font-light shadow-md md:px-2 xl:px-1 xl:py-2 xl:text-sm"
                      key={index + 1}
                    >
                      {border.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default _alpha3Code;
