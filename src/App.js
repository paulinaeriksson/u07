import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';

//component imports
import Header from './components/Header';
import ForecastSevenDays from './components/ForecastSevenDays';
import ForecastToday from './components/ForecastToday';



const App = () => {

  /*   const [data, setData] = useState({}); */
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [location, setLocation] = useState('');
    /* const [unit, setUnit] = useState('metric'); */

  


    useEffect(() => { 
      navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
      })
      const API_key = `8f04b34cdf5219c2aeb1f106bfcd6583`;
      let API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`;
      axios.get(API_URL).then((response) => {
        setLocation(response.data.name);
      })
    
    })
   
    

  return (
    <div className="app">
      <div className="container">
        <div className="header">
        <h1>{location}</h1>
      <Header />
      </div>
      <h1>Weather</h1>
      <div className="today"></div>
      <ForecastToday />
      </div>
      <div className="sevendays">
      <ForecastSevenDays />
      </div>
    </div>
  );
}



export default App; 