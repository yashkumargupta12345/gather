import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
