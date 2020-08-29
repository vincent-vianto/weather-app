import React from "react";
import "./style.css";
import dayjs from "dayjs";

const Forecast = (props) => {
  const forecast = props.forecast;

  const dayPicker = (time) => {
    const dateNow = dayjs(Date.now());
    const dateDt = dayjs(time);
    let dayDiff =
      dateNow.diff(dateDt, "day") === 0
        ? "Today"
        : dateNow.diff(dateDt, "day") === -1
        ? "Tomorrow"
        : dateDt.format("D MMM");
    return dayDiff;
  };

  return (
    <div className="forecastWrapper">
      {forecast &&
        forecast.map((item, index) => (
          <div className="forecastBlock" key={index}>
            <h6>{dayPicker(item.dt * 1000)}</h6>
            <h6>{dayjs(item.dt * 1000).format("h:mm A")}</h6>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].icon}
            />
            <h6>{Math.round(item.main.temp)}&deg;C</h6>
          </div>
        ))}
    </div>
  );
};
export default Forecast;
