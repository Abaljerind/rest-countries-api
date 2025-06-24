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
    if (!params.cca3) return;

    async function fetchDetail() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_RESTCOUNTRIES_ALPHA_API}/${params.cca3}`,
        );
        const data = await res.json();
        setDetail(data[0]);
      } catch (error) {
        console.log("Failed to fetch detail country.", error.message);
      }
    }

    fetchDetail();
  }, [params.cca3]);

  useEffect(() => {
    if (!detail?.borders || !countryName?.length) return;

    const names = detail?.borders.map((code) => {
      const match = countryName?.find((country) => country.cca3 === code);
      return match
        ? { code: match.cca3, name: match.name.common }
        : { code, name: code };
    });

    setBorderName(names);
  }, [detail, countryName]);

  const currencyNames = detail?.currencies
    ? Object.values(detail.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";

  const languageNames = detail?.languages
    ? Object.values(detail.languages).join(", ")
    : "N/A";

  const nativeName = detail?.name ? Object.values(detail.name)[1] : "N/A";

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
              className="w-full md:h-64 md:w-[65%] md:object-fill xl:h-80 xl:w-[80%]"
              src={detail?.flags.png}
              alt={`${detail?.flags.alt} Flag`}
            />
          </div>

          <div className="md:mx-auto md:w-[65%] xl:w-[85%]">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h2 className="mt-6 text-2xl font-extrabold xl:text-3xl">
                  {detail?.name.common}
                </h2>
                <div className="mt-4 flex flex-col gap-2">
                  <p className="p-text-format">
                    Native Name:{" "}
                    <span className="font-light">{nativeName}</span>
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
                    <span className="font-light">{detail?.capital[0]}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <p className="p-text-format">
                  Top Level Domain:{" "}
                  <span className="font-light">{detail?.tld}</span>
                </p>
                <p className="p-text-format">
                  Currencies:{" "}
                  <span className="font-light">{currencyNames}</span>
                </p>
                <p className="p-text-format">
                  Languages: <span className="font-light">{languageNames}</span>
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
