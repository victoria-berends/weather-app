
import './App.css';
import './nav.css';
import Nav from './Nav.js';
import React, { useEffect, useState } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from "@mui/material/Button";

import TextField from '@mui/material/TextField';
import img from './Heraldic_Sun.png';


function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  const [photos, setPhotos] = useState([]);

  const API_KEYWEATHER = "09a0c811458292a411dd122e78fecbeb";
  const API_KEYUNSPLASH = "qqUMPNEsqdVDg1ObC4wyIDZvZWR6NUZfP2KxW3-xfQ4";

  useEffect(() => {
    submit();
  }, [])
  function submit() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locations}&appid=${API_KEYWEATHER}&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        }
        else {
          if (res.staus === 404) {
            return alert("Oops there is an error, wrong location!");

          }
          alert(JSON.stringify(res));
          alert("Oops there seems to be an error!");
          throw new Error("You have an error!");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(object);
      })
      .catch((error) => console.log(error));

    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=${API_KEYUNSPLASH}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake!");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0,1,2,3]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }

  return (
    
  <div>
    <Nav/>
    <div className="App">
  
        <div className="wrapper">
          <div className="Search">
            <TextField required id="outlined-required" Label="Required " value={locations} onChange={(e) => setLocations(e.target.value)} placeholder="Enter Location" />
            <div className="Search_button"> <Button variant="contained" color="success" onClick={submit}>Search</Button></div>
          </div>
          <div className="app_data">
            <p className="temp"> <h1 >Current Temp: {weather?.main?.temp}</h1></p>
            <p className="feels_like"><h1>Feels Like :{weather?.main?.feels_like}</h1></p>
          </div>

          <img className="app_image" src={photos} alt="" />

        </div>
      </div></div>
    
  )
}

export default App;
