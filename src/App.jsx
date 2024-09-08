import React from 'react'
import CitiesTable from "./components/CitiesTable.jsx"
import Weather from "./components/Weather.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<CitiesTable />} /> 
            <Route path="/weather/:cityname" element={<Weather />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
