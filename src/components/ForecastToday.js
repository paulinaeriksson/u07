import React from 'react';

const ForecastToday = () => {

      return (
        <div>
          <div>
         <h2>Today's Forecast</h2>
         </div>
          <div className='temperature'>
            <p>Temperature</p>
          </div>
          <div className='wind'>
            <p>Wind</p>
          </div>
          <div className='humidity'>
            <p>Humidity</p>
          </div>
          <div className='sunrise'>
            <p>Sunrise</p>
          </div>
          <div className='sunset'>
            <p>Sunset</p>
          </div>
        </div>
      );
    }
  
  export default ForecastToday;