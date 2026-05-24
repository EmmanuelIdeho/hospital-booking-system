import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import './App.css';
import React, { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { AppointmentProvider } from './context/AppointmentContext';

const Main = React.lazy(() => import('./pages/Main'));
const BookingForm = React.lazy(() => import('./pages/BookingForm'));
const AppointmentList = React.lazy(() => import('./pages/AppointmentList'));
const ModifyForm = React.lazy(() => import('./pages/ModifyForm'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <AppointmentProvider>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<Main />} />
            <Route path="/book" element={<BookingForm />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/modify" element={<ModifyForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppointmentProvider>
    </Router>
  );
}

export default App;