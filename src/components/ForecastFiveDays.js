import React from "react";
import axios from "axios";
import { mergeMap } from "rxjs";


const ForecastFiveDays = (latitude, longitude, API_key, unit, setWeatherForecast) => {

 /*  let API_URL_5 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=${unit}`; */
/* 
  const days = [
    {
      id: 1, 
      day:"Sunday"
    },
    {
      id: 2, 
      day:"Monday"
    },
    {
      id: 3, 
      day:"Tuesday"
    },
    {
      id: 4, 
      day:"Wednesday"
    },
    {
      id: 5, 
      day:"Thursday",
    },
    {
      id: 6, 
      day:"Friday",
    },
    {
      id: 1, 
      day:"Saturday",
    }
  ];
 */
  
  //Get today's day
/*    Date.prototype.getDayName = function () {
    let today = days[this.getDay()];
  };
  var now = new Date();
  var day = now.getDayName(); 
 */
 /*  const getWeatherForecast = async () => {
    try {
    if (longitude && latitude && API_key && unit) {
    const response = await axios.get(API_URL_5);
    setWeatherForecast([response.data]);

    console.log(response.data);
    if (response.data) {
   
    }
  }
  } catch (err) {
      alert(err.message);
  }
 
  } */
  /* getWeatherForecast(); */
  return (
    <div>
     
    </div>
  );

}



export default ForecastFiveDays;
