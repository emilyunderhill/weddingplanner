import React from 'react';
import './App.scss';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import { ROUTE_DASHBOARD } from './library/routes';
import PlanningDashboard from './pages/PlanningDashboard.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path={ROUTE_DASHBOARD} Component={PlanningDashboard}>
          </Route>
          <Route path="/" Component={LandingPage}>
          </Route>
        </Routes>
    </>
  );
}

export default App;
