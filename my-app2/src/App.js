import logo from './logo.svg';
import './App.css';
import './nav.css';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import img from './assets/images/Heraldic_Sun.png';
import { width } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


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
    
    <><div className="nav">
   {/* <a className="nav_text" href="/">WEATHER</a> 
   <a className="nav_text" href="/">
      <div className="logo-image">
            <img src={'Heraldic_Sun.png'}className="lilLogo"></img>
      </div>
</a> */}
<h1 className="nav_text">WEATHER APP</h1>
<img className="lilLogo" src={`${process.env.PUBLIC_URL}/assets/images/Heraldic_Sun.png`} 
     alt="logo"/>
    </div>
    <div className="App">
  
        <div className="wrapper">
          <div className="Search">
            <TextField required id="outlined-required" Label="Required " value={locations} onChange={(e) => setLocations(e.target.value)} placeholder="Enter Location" />
            <div className="Search_button"> <Button variant="contained" color="success" onClick={submit}>Search</Button></div>
          </div>
          <div className="app_data">
            <p className="temp"> Current Temp: {weather?.main?.temp}</p>
            <p className="feels_like">Feels Like :{weather?.main?.feels_like}</p>
          </div>

          <img className="app_image" src={photos} alt="" />

        </div>
      </div></>
    
  )
}

export default App;
