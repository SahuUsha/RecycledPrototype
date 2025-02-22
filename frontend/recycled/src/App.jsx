// import {  BrowserRouter as useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Event from './pages/Event'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dasboard'
import AddEvent from './components/AddEvent'
import Rewards from './components/Reward'
import Learn from './components/Learn'
import Contact from './components/contact'
import AfterLogin from './pages/afterloginHome'




function App() {
  

  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/event" element={<Event />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addMission" element={<AddEvent/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path='/reward' element={<Rewards/>} />
        <Route  path='/learn' element={<Learn/>}/>
        <Route path='/contact' element={<Contact/>} />
        <Route path='/ecorewards' element={<AfterLogin/>} />
    </Routes>
    {/* <Navbar /> */}
  </>
  )
}

export default App
