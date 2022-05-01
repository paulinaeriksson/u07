import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

//component imports
import ForecastFiveDays from "./components/ForecastFiveDays";
import ForecastToday from "./components/ForecastToday";

const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherForecast, setWeatherForecast] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [unit, setUnit] = useState("metric");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState([]);
  const [sunset, setSunset] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [toggleTemp, setToggleTemp] = useState("C");
  const [toggleWind, setToggleWind] = useState("m/s");
  const [buttonText, setButtonText] = useState("°F");
  const [weatherImg, setWeatherImg] = useState([{}]);
  const [date, setDate] = useState("");
  const [daily, setDaily] = useState([]);

  const API_key = process.env.REACT_APP_API_KEY;
  let API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_key}&units=${unit}`;
  let API_URL_1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${unit}`;
  let API_img = `http://openweathermap.org/img/wn/${weatherImg}@2x.png`;
  let API_URL_5 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${unit}`;

  const getCity = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(latitude, longitude);
    });
    if (longitude && latitude) {
      axios.get(API_URL_1).then((response) => {
        setLocation(response.data.name);
      });
    }
  };

  const getWeather = async () => {
    try {
      if (longitude && latitude && weather) {
        const response = await axios.get(API_URL);
        setWeather([response.data]);
        /*         console.log(weather);
         */
        setTemperature(Math.round(response.data.current.temp));
        setHumidity(response.data.current.humidity);
        setWindSpeed(response.data.current.wind_speed.toFixed(1));
        setSunset(response.data.current.sunset);
        setSunrise(response.data.current.sunrise);
        setWeatherImg(response.data.current.weather[0].icon);

        if (response.data) {
          /*  setTemperature(Math.round(response.data.current.temp));
         setHumidity(response.data[0].current.humidity);
          setWindSpeed(response.data.wind.speed.toFixed(1));
          setSunset(response.data.sys.sunset);
          setSunrise(response.data.sys.sunrise);
          setWeatherImg(response.data.weather[0].icon); */
        }
      }
    } catch (event) {
      if (!weather) {
        console.log(event);
      }
    }
  };

  const getWeatherForecast = async () => {
    try {
      if (longitude && latitude && weather) {
        const res = await axios.get(API_URL);
        setWeatherForecast([res.data]);
        setDaily(res.data.daily);
        console.log(res.data.daily);
        setDate(res.data.list[0].dt);
        console.log();

        /*         console.log(response.data);
         */ if (res.data) {
          /*   setTemperature(Math.round(response.data.main.temp));
          setHumidity(response.data.main.humidity);
          setWindSpeed(response.data.wind.speed.toFixed(1));
          setSunset(response.data.sys.sunset);
          setSunrise(response.data.sys.sunrise);
          setWeatherImg(response.data.weather[0].icon); */
        }
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
/*   console.log(daily[0].temp.day);
 */
  const sliceDaily = daily.slice(0, 5);

  return (
    <div className="app">
      <div className="flex-container">
        <div className="header"></div>
        <div className="button">
          <button onClick={changeUnit}>{buttonText}</button>
        </div>
        <section className="today">
          <div>
            <h1>{location}</h1>
          </div>
          <div className="today-img">
            <img src={API_img} alt="weather icon" />
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
              <p>Wind:</p>
              <p>
                {" "}
                {windSpeed} {toggleWind}
              </p>
            </div>
            <div className="today-humidity">
              <p>Humidity:</p>
              <p>{humidity}%</p>
            </div>
            <div className="today-sunrise">
              <p>Sunrise:</p>
              <p>{sunrise}</p>
            </div>
            <div className="today-sunset">
              <p>Sunset:</p>
              <p>{sunset}</p>
            </div>
          </section>
        </section>

        <section className="daily">
          {sliceDaily.map((data) => {  
            return (
              <section key={data.dt}>
               
                <h3>{data.dt}</h3>
                <p>{data.temp.day}</p>
                <p>{data.humidty}</p>
                <p>{data.wind_speed}</p>
              </section>
            );
          })}
        </section>

        <section className="fivedays">{/* {<ForecastFiveDays />} */}</section>
      </div>
    </div>
  );
};

export default App;
