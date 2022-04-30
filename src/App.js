import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';


//component imports
import ForecastFiveDays from './components/ForecastFiveDays';
import ForecastToday from './components/ForecastToday';

const App = () => {


    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState({});
    const [unit, setUnit] = useState('metric');  
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [windSpeed, setWindSpeed] = useState([]);
    const [sunset, setSunset] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [toggleTemp, setToggleTemp] = useState('C');
    const [toggleWind, setToggleWind] = useState('m/s');
    const [buttonText, setButtonText] = useState('°F');
    const [weatherForecast, setWeatherForecast] = useState({});
    const [weatherImg, setWeatherImg] = useState([{}])


    const API_key = process.env.REACT_APP_API_KEY;
    let API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${unit}`;
    let API_URL_5 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${unit}`;
    let API_img = `http://openweathermap.org/img/wn/${weatherImg}@2x.png`;

    const getCity = () => {
      navigator.geolocation.getCurrentPosition((position) => {
       
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    
        })
          if (longitude && latitude) {

          axios.get(API_URL).then((response) => {
          setLocation(response.data.name);
          
        },) }
    }

    const getWeather = async () => { 
      try {

        if (longitude && latitude && weather) { 
        const response = await axios.get(API_URL);
        setWeather([response.data]);
         if (response.data) {
        setTemperature(Math.round(response.data.main.temp));
        setHumidity(response.data.main.humidity)
        setWindSpeed(response.data.wind.speed.toFixed(1));
        setSunset(response.data.sys.sunset);
        setSunrise(response.data.sys.sunrise);
        setWeatherImg(response.data.weather[0].icon);
        
    
         }
        }
        }
       catch (event) {
         if (!weather) {
        console.log(event);      
         }  
      }
    } 

    const getWeaterForecast = async () => {
      try {
      if (longitude && latitude) {
      const response = await axios.get(API_URL_5);
      setWeatherForecast([response.data]);

      if (response.data) {
      console.log(response.data)
      }
    }
    } catch (err) {
        alert(err.message);
    }
    }


    useEffect(() => { 

        getCity();
        getWeather();
        getWeaterForecast();
       
        
         
     },[latitude, longitude, unit])
    

    //Toggle units
       const changeUnit = () => {

        if (unit === "metric") {
          setToggleTemp('F');
          setToggleWind('mph');
          setButtonText('°C');
          setUnit('imperial');
        }
   
        if (unit === "imperial") {
          setToggleTemp('C');
          setToggleWind('m/s');
          setButtonText('°F');
          setUnit('metric');
        }
        }; 

    
        
  return (
    
    <div className="app">
      <div className="flex-container">

        <div className="header">
        </div>
        <div className='button'>
            <button onClick={changeUnit}>{buttonText}</button>
     
    </div>
      <section className="today">
      <div>
        <h1>{location}</h1>
      </div>
      <div className="today-img">
      <img src={API_img} />
      </div>
      <div className="today-header">
        <h2>{temperature}°{toggleTemp}</h2>
      </div>
      </section>
      <section className='now-container'>
      <div className="now">
        <h2>Weather right now in {location}</h2>
      </div>
      <section className="today-section">
      <div className="today-wind">
        <p>Wind:</p>
        <p> {windSpeed} {toggleWind}</p>
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
    
       
 
        <div className="hourly">
       {  <ForecastToday />}
        </div>

        <div className="fivedays">
       {<ForecastFiveDays />}
        </div>
      
    </div>
  </div>
  );

}

export default App; 