//import { useState } from 'react'
import BookingForm from './components/BookingForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar'
import AppointmentList from './components/AppointmentList';
import './App.css'
//import { Typography } from '@mui/material';
//import axios from 'axios'


function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/appointments" element={<AppointmentList />} />
      </Routes>
    </Router>

    
    </>
    
  )
}

export default App
