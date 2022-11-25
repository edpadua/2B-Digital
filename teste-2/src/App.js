import logo from './logo.svg';
import { useState, useEffect } from 'react';
import countries from 'i18n-iso-countries';
import './App.css';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState();
  const [state, setState] = useState();

  const hoje = new Date();

  const meses = ["Janeiro", "Fevereiro", "Março", "Abriu", "Maio", "Junho", "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  const diasSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}&lang=pt`;

  // Side effect
useEffect(() => {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => setApiData(data));
}, [apiUrl]);


const inputHandler = (event) => {
  setGetState(event.target.value);
};

const submitHandler = () => {
  setState(getState);
};

const kelvinToCelsius = (k) => {
  return (k - 273.15).toFixed(2);
};

return (
  <div className="App">
   
    <div className="container">
      <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
        
        <div class="col-auto">
          <input
            type="text"
            id="location-name"
            class="form-control"
            placeholder="Buscar por cidade"
            onChange={inputHandler}
            value={getState}
          />
        </div>
        <button className="btn btn-primary mt-2" onClick={submitHandler}>
          Procurar
        </button>
      </div>

      <div className="mt-3 mx-auto" >
        {apiData.main ? (
          <div class="card-body text-center">
            
            

            <p className="h5">
              <i className="fas fa-map-marker-alt"></i>{' '}
              <strong>{apiData.name}</strong>
            </p>
            <h6>{diasSemana[hoje.getDay()]}, {hoje.getDate()} de {meses[(hoje.getMonth())]} de {hoje.getFullYear()}</h6>


            <div className="row mt-4">
              <div className="col-md-4">
                <h4>Mínima</h4>
                <p>

                  <i class="fas fa-temperature-low "></i>{' '}
                  <strong>
                    {Math.floor(kelvinToCelsius(apiData.main.temp_min))}&deg; C
                  </strong>
                </p>
                
              </div>
              <div className="col-md-4">

              
            <img
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />

            <p className="h2">
              {Math.floor(kelvinToCelsius(apiData.main.temp))}&deg; C
            </p>

                <p>
                  {' '}
                  <strong>{apiData.weather[0].description}</strong>
                </p>


                

                
              </div>
              <div className="col-md-4">
              <h4>Máxima</h4>
                <p>
                  <i className="fas fa-temperature-high"></i>{' '}
                  <strong>
                    {Math.floor(kelvinToCelsius(apiData.main.temp_max))}&deg; C
                  </strong>
                </p>
              </div>
            </div>
            <div className="row mt-4">
            <h4>Umidade {apiData.main.humidity}%</h4>
                
                
                <h4>Nascer do Sol  {new Date(apiData.sys.sunrise * 1000).toLocaleTimeString("pt-BR", {
    timeStyle: "short",         
    hour12: false,            
    numberingSystem: "latn"   
  })}</h4>
                

                <h4>Por do Sol  {new Date(apiData.sys.sunset * 1000).toLocaleTimeString("pt-BR", {
    timeStyle: "short",         
    hour12: false,            
    numberingSystem: "latn"   
  })}</h4>
                
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
    
  </div>
);
}

export default App;
