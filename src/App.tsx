import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home_Page from './pages/Home_Page'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Create_Team from './pages/Create_Team_Page'
import Create_Player from './pages/Create_Player_Page'
import './App.css'
import Player_Page from './pages/Player_Page'
import Team_Page from './pages/Team_Page'


function App() {
 

  return (
    <>
  

  <Router>
    <Routes>
    <Route path="/" element={<Home_Page/>} />
    <Route path="/create-team" element={<Create_Team/>} />
    <Route path="/create-player" element={<Create_Player/>} />
    <Route path="/player" element={<Player_Page/>} />
    <Route path="/team/:teamId" element={<Team_Page/>} />
    </Routes>
  </Router>
  </>
  )
}

export default App
