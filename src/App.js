import './App.css';
import Weather from './components/weather';
import ReactLoader from './components/Loader';
import React, { useEffect, useState } from 'react';

function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     setLat(position.coords.latitude);
    //     setLong(position.coords.longitude);
    //   });

    //   await fetch(`${process.env.REACT_APP_API_URL}?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`)
    //     .then(response => response.json())
    //     .then(result => {
    //       setData(result)
    //       console.log(result);
    //     });
    // }
    // fetchData();
    // console.log("type : ", typeof(data.main));

    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("Long : " + long + " lat : " + lat);
    });

    getWeather(lat, long)
      .then(weather => {
        setData(weather);
        setError(null);
        console.log(weather);
      }).catch(err => {
        setError(err.message);
      })

  }, [lat, long, error])

  function getWeather(lat, long) {
    return fetch(`${process.env.REACT_APP_API_URL}?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => handleResponse(res))
      .then(weather => {
        return weather;
      })
  }

  function mapDataToWeatherInterface(data) {
    const mapped = {
      date: data.dt * 1000, // convert from seconds to milliseconds
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
    };
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }
    return mapped;
  }

  function handleResponse(response) {
    if (response.ok)
      return response.json();
    else
      throw new Error("Please Enable your locationn in browser!");
  }
  return (
    <div className="App">
      {(typeof data.main != 'undefined')
        ? (
          <div>
            <Weather weatherData={data} />
          </div>
        ) : (
          <ReactLoader />
        )}
    </div>
  );
}

export default App;
