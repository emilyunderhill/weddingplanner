import React from 'react'
import './App.scss'
import LandingPage from './pages/Home/LandingPage'
import Navbar from './components/Navbar'
import { ROUTE_CHECKLIST, ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_REGISTER } from './library/routes'
import PlanningDashboard from './pages/PlanningDashboard.tsx'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Home/Login'
import Register from './pages/Home/Register'
import Checklist from './pages/Checklist'

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path={ROUTE_DASHBOARD} Component={PlanningDashboard} />
          <Route path={ROUTE_LOGIN} Component={Login} />
          <Route path={ROUTE_REGISTER} Component={Register} />
          <Route path={ROUTE_CHECKLIST} Component={Checklist} />
          <Route path="/" Component={LandingPage} />
        </Routes>
    </>
  );
}

export default App;
