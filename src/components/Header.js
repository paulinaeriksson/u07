import React, { useState} from 'react';

const Header = () => {

    return (
    <div>
        <div>
            <input type="radio"/>
            <label for="celsius">C</label>
        </div>
        <div>
            <input type="radio"/>
            <label for="farenheit">F</label>
        </div>
    </div>
      );
    }
  
  export default Header;