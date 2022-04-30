import React from 'react';

const ForecastFiveDays = () => {

  const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];


      return (
      <div>
        <div className="fiveDayHeader">
         <h2>5 Days' Forecast</h2>
        </div>

      <div >
        <table>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Monday</th>
              <th scope="col">Tuesday</th>
              <th scope="col">Wednesday</th>
              <th scope="col">Thursday</th>
              <th scope="col">Friday</th>
            </tr>
          </thead>
          <tbody>
        <tr>
          <th scope="row">Temp.</th>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          </tr>

          <tr>
          <th scope="row">Wind</th>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          </tr>

          <tr>
          <th scope="row">Humidity</th>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          </tr>

          <tr>
          <th scope="row">Sunset</th>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          </tr>

          <tr>
          <th scope="row">Sunrise</th>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
      );
    }
  

  export default ForecastFiveDays;