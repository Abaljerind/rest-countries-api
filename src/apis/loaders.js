export const getAllCountries = async () => {
  try {
    const res = await fetch("https://restcountries.com/v2/all");

    if (!res.ok) {
      throw new Error("Fetch failed, check error message.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Something wrong happened: " + error.message);
  }
};
