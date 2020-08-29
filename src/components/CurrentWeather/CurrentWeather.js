import React from "react";
import "./style.css"


const CurrentWeather = (props) => {
  const { name, description, icon, temp, clouds, humidity, wind } = props;

  return (
    <div className="currentBlock">
      <h3>{description}</h3>
      <h2>{name}</h2>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={icon}/>
      <h2>{Math.round(temp)}&deg;C</h2>
      <h5>Cloudiness : {clouds} %</h5>
      <h5>Humidity : {humidity} %</h5>
      <h5>winds : {Math.round(wind)} m/s</h5>
    </div>
  );
};

export default CurrentWeather;
