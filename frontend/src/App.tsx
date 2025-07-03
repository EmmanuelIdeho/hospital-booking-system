import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import './App.css';
import React, { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const Main = React.lazy(() => import('./pages/Main'));
  const BookingForm = React.lazy(() => import('./pages/BookingForm'));
  const AppointmentList = React.lazy(() => import('./pages/AppointmentList'));
  const ModifyForm = React.lazy(() => import('./pages/ModifyForm'));
  const NotFound = React.lazy(() => import('./pages/NotFound'));


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
        <Route path="/modify" element={<ModifyForm />} />
        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
       </Suspense>
    </Router>
    </>
    
  )
}

export default App
