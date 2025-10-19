import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Authentication from './pages/Authentication.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth' element={<Authentication />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App