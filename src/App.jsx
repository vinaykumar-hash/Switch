import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import './App.css'
import SetupProfile from './pages/SetupPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Lander from './pages/Lander.jsx'
import LanderAI from './pages/LanderAI.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfUsage from './pages/TermsOfUsage.jsx'
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setup" element={<SetupProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Lander />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-usage" element={<TermsOfUsage />} />
    </Routes>
  )
}

export default App