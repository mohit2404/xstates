import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://crio-location-selector.onrender.com/countries`
        );
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    async function fetchStates() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        );
        const data = await response.json();
        setStates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching states:", error);
        setLoading(false);
      }
    }
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) return;

    async function fetchCities() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );
        const data = await response.json();
        setCities(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setLoading(false);
      }
    }
    fetchCities();
  }, [selectedState]);

  return (
    <section className="text-center py-10 p-4">
      <h1 className="text-4xl mb-4 font-bold">Select Location</h1>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <div className="border border-gray-300 rounded p-2">
          <select
            name="country"
            id="country"
            onChange={(e) => setSelectedCountry(e.target.value)}
            disabled={loading}
            value={selectedCountry}
            className="focus:outline-none cursor-pointer w-full"
          >
            <option>Select Country</option>
            {countries.length > 0 &&
              countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
          </select>
        </div>
        <div className="border border-gray-300 rounded p-2">
          <select
            name="state"
            id="state"
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
            value={selectedState}
            className="focus:outline-none cursor-pointer w-full"
          >
            <option>Select State</option>
            {states.length > 0 &&
              states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
          </select>
        </div>
        <div className="border border-gray-300 rounded p-2">
          <select
            name="city"
            id="city"
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
            value={selectedCity}
            className="focus:outline-none cursor-pointer w-full"
          >
            <option>Select city</option>
            {cities.length > 0 &&
              cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
      </div>

      <h2 className="text-2xl mt-4 font-semibold">
        You Selected <strong>{selectedCity}</strong>,{" "}
        <span className="text-gray-500">{selectedState}</span>,{" "}
        <span className="text-gray-500">{selectedCountry}</span>
      </h2>
    </section>
  );
}

export default App;
