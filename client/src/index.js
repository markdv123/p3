import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import Map from './components/Map'
import Nav from './components/Nav'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Map /> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)