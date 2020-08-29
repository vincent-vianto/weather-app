import React, { useState, useEffect } from "react";
import Axios from "axios";
import { easings } from "react-animation";
import ReactLoading from "react-loading";

import SearchCity from "../SearchCity/SearchCity";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import Forecast from "../Forecast/Forecast";
import "./style.css";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState(false);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("jakarta");
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const handleChange = (event) => setQuery(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(query);
    setQuery("");
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const fetchData = async () => {
      try {
        setLoading(true);
        const current = await Axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`
        );
        const forecast = await Axios(
          `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=metric`
        );
        setLoading(false);
        setData({
          name: current.data.name + ", " + current.data.sys.country,
          description: current.data.weather[0].description,
          main: current.data.weather[0].main,
          icon: current.data.weather[0].icon,
          temp: current.data.main.temp,
          clouds: current.data.clouds.all,
          humidity: current.data.main.humidity,
          wind: current.data.wind.speed,
          forecast: forecast.data.list,
        });
        setWeather(true);
        setError(false);
      } catch (error) {
        setLoading(false);
        setWeather(false);
        setError(true);
        setErrorMessage(error.response.data);
      }
    };
    if (search !== "") {
      fetchData();
    }
  }, [search]);

  const style = {
    animation: `fade-in ${easings.easeInOutCubic} 2000ms forwards`,
  };

  return (
    <div className="mt-5">
      <SearchCity
        query={query}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {loading && (
        <div className="loaderWrapper">
          <ReactLoading type="spinningBubbles" height={150} width={150} />
          <div className="mt-5 d-inline-flex flex-row">
            <h3>Loading</h3>
            <div className="align-self-end">
              <ReactLoading type="balls" height={25} width={25} />
            </div>
          </div>
        </div>
      )}
      {!loading && weather && (
        <div className="mt-3" style={style}>
          <CurrentWeather {...data} />
          <Forecast forecast={data.forecast} />
        </div>
      )}
      {!loading && error && (
        <div style={style}>
          <div className="errorWrapper">
            <h1>{errorMessage.cod}</h1>
            <h2>{errorMessage.message}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
