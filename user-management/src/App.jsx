import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'
import AdminLogin from './pages/adminLogin'
import AdminDashboard from './pages/adminDashboard'

function App() {
  return (
    <BrowserRouter>

    <Header/>
      <Routes>

        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>

      </Routes>
    
    </BrowserRouter>
  )
}

export default App