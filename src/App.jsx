import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import './App.css'
import SetupProfile from './pages/SetupPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setup" element={<SetupProfile />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}

export default App