import './App.css';
import Weather from './components/weather'
import React, { useEffect, useState } from 'react';

function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const API = process.env.REACT_APP_API_URL;
  const KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${API}/onecall?lat=${lat}&lon=${long}&APPID=${KEY}`)
      .then(response => response.json() )
      .then(result => {
        setData(result)
      });
    }
    fetchData();
  }, [lat,long])


  return (
    <div className="App">
      {(typeof data.main != 'undefined')
      ? <Weather data={data}/>
      : <div>Application under maintaince.</div>
    }
    </div>
  );
}

export default App;
