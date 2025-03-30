import { useState,useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY



const Countrysearch=(props)=> {

  return(
          <div key="1">
          Country: <input value={props.country} onChange={props.handleOnChange}/>
          </div>
  )
}

const Names=({ name,handleonclick})=>{
  
  return(
    
    
      <div key={name}> 
        {name} <button onClick={handleonclick}>show</button>

      </div>
      
    
    
  )
}

const Createweather=({selected_country,setWeatherdata,weatherdata})=>{

  console.log("noni")

  useEffect(() => {
    const dt = Math.floor(Date.now() / 1000);
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${selected_country[0].latlng[0]}&lon=${selected_country[0].latlng[1]}&dt=${dt}&appid=${api_key}`
      )
      .then((response) => {
        console.log(response);
        setWeatherdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });

      


  },selected_country)

  if(!weatherdata){
    return null
  }
       
  
  return(
 
    <div>
      <p>Temperature {(weatherdata.data[0].temp- 273.15).toFixed(1)} Celsius</p>

      <Weathericon data={weatherdata.data[0].weather[0].icon} />

      <p>Wind {weatherdata.data[0].wind_speed} m/s</p> 
    </div>
 
  )

}
const Weathericon=({data})=>{
    const img=`https://openweathermap.org/img/wn/${data}@2x.png`
 
    return (
      <img src={img}></img>
      )
  }

  


const Createcountry=({selected_country, setWeatherdata,weatherdata})=>{
  console.log("hello")
  return( <div>
    <h1>{selected_country[0].name.common}</h1>
    <p>Capital {selected_country[0].capital[0]}</p>
    <p>Area {selected_country[0].area}</p>
    <h2>Languages</h2>
    <ul>
        {Object.values(selected_country[0].languages).map(language => 
            <li key={language}>{language}</li>
        )}
    </ul>
    <img 
        src={selected_country[0].flags.png} 
        alt={`Flag of ${selected_country[0].name.common}`}
        style={{ width: '200px' }}
    />
      <h2>Weather in {selected_country[0].name.common}</h2>

      <Createweather selected_country={selected_country} setWeatherdata={setWeatherdata} weatherdata={weatherdata}/>

    </div>

)
}

const Countrylist=(props)=>{
  
  const selected_country=props.countries.filter(maa=>maa.name.common.toLowerCase().startsWith(props.country.toLowerCase()))
  if (selected_country.length === 0) {
    return null
  }

  if(selected_country.length>10){
    return(<div>
      Too many countries, specify another filter
    </div>)
  }
  else if(selected_country.length<=10 &&selected_country.length>1 ){
    
    return(selected_country.map(maa=><Names key={maa.name.common} name={maa.name.common} handleonclick={()=>props.setCountry(maa.name.common)}/>))
  }
  else if(selected_country.length=1){
    
    return( <Createcountry selected_country={selected_country} setWeatherdata={props.setWeatherdata} weatherdata={props.weatherdata}/>)
  }
  
    

}

function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState(null) 
  const [weatherdata, setWeatherdata]= useState(null)

  useEffect(() => {
      console.log('effect')
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          
          setCountries(response.data)
          
        })
    }, [])
    if(!countries){
      return null
    }

  const handleOnChange=(event)=>{
    
    setCountry(event.target.value)
  }

  return (
    <>
    
    <Countrysearch handleOnChange={handleOnChange} country={country}/>

    <Countrylist countries={countries} country={country} setCountry={setCountry} setWeatherdata={setWeatherdata} weatherdata={weatherdata}/>   
    </>
  )
}

export default App
