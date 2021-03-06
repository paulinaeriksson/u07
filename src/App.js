import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState("metric");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState([]);
  const [sunset, setSunset] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [toggleTemp, setToggleTemp] = useState("C");
  const [toggleWind, setToggleWind] = useState("m/s");
  const [buttonText, setButtonText] = useState("°F");
  const [daily, setDaily] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [current, setCurrent] = useState([]);

  const API_key = process.env.REACT_APP_API_KEY;
  //One Call API
  let API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_key}&units=${unit}`;
  //Current weather API
  let API_URL_1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${unit}`;

  const sliceDaily = daily.slice(1, 6);
  const sliceHourly = hourly.slice(0, 24);

  //Get location
  const getCity = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    if (longitude && latitude) {
      axios.get(API_URL_1).then((response) => {
        setLocation(response.data.name);
      });
    }
  };

  //Current weather
  const getWeather = async () => {
    try {
      if (longitude && latitude && weather) {
        const response = await axios.get(API_URL);
        setWeather([response.data]);
        setTemperature(Math.round(response.data.current.temp));
        setHumidity(response.data.current.humidity);
        setWindSpeed(response.data.current.wind_speed.toFixed(1));
        setSunset(response.data.current.sunset);
        setSunrise(response.data.current.sunrise);
        setCurrent(response.data.current.weather[0].icon);
      }
    } catch (event) {
      if (!weather) {
        console.log(event);
      }
    }
  };

  //Hourly and daily forecast
  const getWeatherForecast = async () => {
    try {
      if (longitude && latitude && weather) {
        const res = await axios.get(API_URL);
        setDaily(res.data.daily);
        setHourly(res.data.hourly);
      }
    } catch (event) {
      if (!weather) {
        console.log(event);
      }
    }
  };

  useEffect(() => {
    getCity();
    getWeather();
    getWeatherForecast();
  }, [latitude, longitude, unit]);

  //Toggle units
  const changeUnit = () => {
    if (unit === "metric") {
      setToggleTemp("F");
      setToggleWind("mph");
      setButtonText("°C");
      setUnit("imperial");
    }

    if (unit === "imperial") {
      setToggleTemp("C");
      setToggleWind("m/s");
      setButtonText("°F");
      setUnit("metric");
    }
  };

  return (
    <div className="app">
      <div className="flex-container">
        <div className="header"></div>
        <div className="button">
          <button onClick={changeUnit}>
            <strong>{buttonText}</strong>
          </button>
        </div>
        <section className="today">
          <div>
            <h1>{location}</h1>
          </div>
          <div className="today-img">
            <img
              className="current-img"
              src={`http://openweathermap.org/img/wn/${current}.png`}
              alt={"weather icon"}
            />
          </div>
          <div className="today-header">
            <h2>
              {temperature}°{toggleTemp}
            </h2>
          </div>
        </section>
        <section className="now-container">
          <div className="now">
            <h2>The Weather Today in {location}</h2>
          </div>
          <section className="today-section">
            <div className="today-wind">
              <p>
                <strong>Wind:</strong>
              </p>
              <p>
                {" "}
                {windSpeed} {toggleWind}
              </p>
            </div>
            <div className="today-humidity">
              <p>
                <strong>Humidity:</strong>
              </p>
              <p>{humidity}%</p>
            </div>
            <div className="today-sunrise">
              <p>
                <strong>Sunrise:</strong>
              </p>
              <p>
                {new Date(sunrise * 1000).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="today-sunset">
              <p>
                <strong>Sunset:</strong>
              </p>
              <p>
                {new Date(sunset * 1000).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </section>
        </section>

        <section className="fivedays">
          <h2>Upcoming Weather</h2>
          {sliceDaily.map((data) => {
            return (
              <section className="daily-card" key={data.dt}>
                <h3>
                  {new Date(data.dt * 1000).toLocaleDateString("en-GB", {
                    weekday: "long",
                  })}
                </h3>
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt={data.weather[0].main}
                />
                <p>
                  <strong>Temperature:</strong> {Math.round(data.temp.day)}°
                  {toggleTemp}
                </p>
                <p>
                  <strong>Humidity:</strong> {data.humidity}%
                </p>
                <p>
                  <strong>Wind speed:</strong> {data.wind_speed.toFixed(1)} {toggleWind}
                </p>
              </section>
            );
          })}
        </section>

        <section className="hourly">
          <h2>Hour by Hour</h2>
          <div className="card-container">
            {sliceHourly.map((data) => {
              return (
                <section className="hourly-card" key={data.dt}>
                  <h3>
                    {new Date(data.dt * 1000).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt={data.weather[0].main}
                  />
                  <p>
                    <strong>Temperature:</strong> {Math.round(data.temp)}°
                    {toggleTemp}
                  </p>
                  <p>
                    <strong>Humidity:</strong>
                  </p>
                  <p>{data.humidity}%</p>
                  <p>
                    <strong>Wind speed:</strong> {data.wind_speed.toFixed(1)} {toggleWind}
                  </p>
                </section>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
