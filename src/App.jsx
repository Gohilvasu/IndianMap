import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map from './page/Map';
import Form from './page/Form';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';


function App() {
  

  return (
    <>
    <Router>
      <Routes>
     
      <Route path="/" element={<Form/>}/>
      <Route path="/map" element={<Map/>}/>
      </Routes>
      
      </Router>

     
    </>
  )
}

export default App
