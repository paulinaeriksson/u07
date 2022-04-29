import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';

//component imports
import ForecastSevenDays from './components/ForecastSevenDays';
import ForecastToday from './components/ForecastToday';

const App = () => {

/*     const [data, setData] = useState({}); 
 */ const [latitude, setLatitude] = useState('');
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


    const API_key = `edafe1824926c93ae5f3dc0f0cb8f71c`;
    let API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${unit}`;

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
          
         }
       
        }
        }
       catch (event) {
         if (!weather) {
        console.log(event);      
         }  
      }
    } 

    useEffect(() => { 

        getCity();
        getWeather();
         
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
        <div>
        <div>
            <button onClick={changeUnit}>{buttonText}</button>
     
    </div>
        <h1>{location}</h1>
        </div>
      
        <h2>{temperature}°{toggleTemp}</h2>
        <h2>Wind: {windSpeed} {toggleWind}</h2>
        <h2>Humidity: {humidity}%</h2>
        <h2>Sunrise: {sunrise}</h2>
        <h2>Sunset: {sunset}</h2>
       
 
        <div className="today">
       {/*  <ForecastToday /> */}
        </div>

        <div className="sevendays">
       {/*  <ForecastSevenDays /> */}
        </div>
      </div>
    </div>
    </div>
  
  );

}

export default App; 