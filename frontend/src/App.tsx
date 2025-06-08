//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar'
import './App.css'
import React, { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

//import { Typography } from '@mui/material';
//import axios from 'axios'


function App() {
  const Main = React.lazy(() => import('./components/Main'));
  const BookingForm = React.lazy(() => import('./components/BookingForm'));
  const AppointmentList = React.lazy(() => import('./components/AppointmentList'));
  const NotFound = React.lazy(() => import('./components/NotFound'));


  return (

    <>
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/appointments" element={<AppointmentList />} />
        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
       </Suspense>
    </Router>

    
    </>
    
  )
}

export default App
