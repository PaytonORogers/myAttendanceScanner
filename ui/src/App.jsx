import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import Login from './Login.jsx'
import Instructor from './Instructor.jsx'
import Attendance from './Attendance.jsx'
import Classes from './Classes.jsx'
import ClassCreate from './ClassCreate.jsx'
import ClassInfo from './ClassInfo.jsx'




function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<ClassCreate />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/:id" element={<ClassInfo />} />


      </Routes>
    </>
  )
}


export default App
