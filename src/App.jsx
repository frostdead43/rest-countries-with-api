import './App.css'
import "./reset.css"
import React from 'react';
import data from './assets/data.js'
import { useState } from 'react';
console.log(data);


function Header() {
  return (
  <div className='header'>
    <h5>Where in the world?</h5>
    <div className='flex'>
      <img src="src/assets/images/dark-mode-icon.svg"/>
      <button onClick={switchTheme}>Dark Mode</button>
    </div>
  </div>
  )
}

function App() {
const [selectedRegion, setSelectedRegion] = useState('');
const [search, setSearch] = useState('');
const filteredData = data.filter(x => {
  const matchesRegion = selectedRegion ? x.region === selectedRegion : true;
  const matchesSearch = x.name.common.toLowerCase().includes(search.toLowerCase());
  return matchesRegion && matchesSearch; 
});

function handleChange(e) {
  setSearch(e.target.value);
}

function handleSelectChange(e) {
  setSelectedRegion(e.target.value);
}


// filteredData.filter(x => x.name.common.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className='container'>
      <Header />
      <div className='form-area'>
      <input onChange={handleChange} type="text" placeholder='Search for a country'/>
      <select onChange = {handleSelectChange}>
        <option value="">Filter By Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      </div>
      <div className='card-area'>
        {filteredData.map(x => <Card name={x.name.common} population={x.population} region={x.region} capital={x.capital} flag={x.flags.svg} />)}
      </div>
    </div>
  )
}



function Card({name, population, region, capital, flag}) {
  return(
  <div className='card'>
    <img src={flag}/>
    <h3>{name}</h3>
    <h4>Population: <strong>{population}</strong></h4>
    <h4>Region: <strong>{region}</strong></h4>
    <h4>Capital: <strong>{capital}</strong></h4>
  </div>
  )
}


function switchTheme() {
  const isDark = document.querySelector("body").classList.toggle("dark-mode");
}



export default App
