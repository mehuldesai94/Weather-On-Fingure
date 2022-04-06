import './App.css';
import Weather from './components/weather'
import React, { useEffect, useState } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${long}&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        .then(result => {
          setData(result)
          console.log(result);
        });
    }
    fetchData();
  }, [lat, long])


  return (
    <div className="App">
      {(typeof data.main !== 'undefined')
        ? <Weather weatherData={data} />
        : <div><Dimmer active>
          <Loader>Loading..</Loader>
        </Dimmer></div>
      }
    </div>
  );
}

export default App;
