//import { useState } from 'react'
import BookingForm from './components/BookingForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar'
import AppointmentList from './components/AppointmentList';
import './App.css'
import Main from './components/Main';
import NotFound from './components/NotFound';
//import { Typography } from '@mui/material';
//import axios from 'axios'


function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/appointments" element={<AppointmentList />} />
        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

    
    </>
    
  )
}

export default App
