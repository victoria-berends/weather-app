import logo from './logo.svg';
import './App.css';
import React, {useEffect,useState} from 'react';
import Button from "@mui/material/Button";
function App(){
  const[weather,setWeather]=useState({});
  const[locations, setLocations]=useState("london");
  const[photos, setPhotos]=useState([]);

  const API_KEYWEATHER="09a0c811458292a411dd122e78fecbeb";
  const API_KEYUNSPLASH="qqUMPNEsqdVDg1ObC4wyIDZvZWR6NUZfP2KxW3-xfQ4";

  useEffect(() => {
    submit();
  },[])
  function submit(){
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${locations}appid=${API_KEYWEATHER}&units=metric`
)
.then((res) => {
  if (res.ok){
    console.log(res.status);
    return res.json();
  }
  else{if(res.staus===404){
    return alert("Oops there is an error, wrong location!");

  }
alert("Oops there seems to be an error!");
throw new Error("You have an error!");
}
})
.then((object)=>{
  setWeather(object);
  console.log(object);
  })
  .catch((error) => console.log(error));

  fetch (
    `https://api.unsplash.com/search/photos?query=${locations}&client_id=${API_KEYUNSPLASH}`
  )
  .then((res)=>{
    if (res.ok){
      return res.json();
    }else{
      throw new Error("You made a mistake!"); 
    }
  })
.then((data) => {
  console.log(data);
  setPhotos(data?.results[0]?.urls?.raw);
})
.catch ((error)=> console.log(error));
}

  return(
  <div className="App">
    <div className="wrapper">
      <div className="Search">
        <input type="text" value={locations}onChange={(e)=> setLocations(e.target.value)} placeholder="Enter Location" className="location_input"/>
        <Button onClick={submit}>Search</Button>
        </div>
        <div className="app_data">
<p className="temp"> Current Temp: {weather?.main?.temp}</p>
        </div>
        <img className="app_image"src={photos} alt=""/>
      </div>
    </div>
)}
  
  export default App;
