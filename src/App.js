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

    const API_key = `8f04b34cdf5219c2aeb1f106bfcd6583`;
    let API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`;

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
        console.log(response.data);
         if (weather) {
        setTemperature(weather[0].main.temp);
        setHumidity(weather[0].main.humidity)
        setWindSpeed(weather[0].wind.speed);
        setSunset(weather[0].sys.sunset);
        setSunrise(weather[0].sys.sunrise);
          
         }
       
        }
        }
       catch (event) {
         if (!weather) {
        console.log(event);      
         }  
      }
    } 

    console.log(sunrise, sunset);
    useEffect(() => { 

        getCity();
        getWeather();
         
     },[latitude, longitude ])
    

    //Toggle units
       const changeUnit = (event) => {
        event.preventDefault();
        setUnit(event.target.value);
        }; 

  return (
    <div className="app">
      <div className="container">

        <div className="header">
        <div>
        <div>
            <button value="metric" onClick={changeUnit}>C</button>
        </div>
        <div>
            <button value="imperial" onClick={changeUnit}>F</button>
        </div>
    </div>
        <h1>{location}</h1>
        </div>

        <h2>{temperature}°C</h2>
        <h2>Wind: {windSpeed}</h2>
        <h2>Humidity: {humidity}</h2>
       
 
        <div className="today">
        <ForecastToday />
        </div>

        <div className="sevendays">
        <ForecastSevenDays />
        </div>
      </div>
    </div>
  
  );

}

export default App; 