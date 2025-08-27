import { useContext, createContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import Login from './Login.jsx'
import Instructor from './Instructor.jsx'
import Attendance from './Attendance.jsx'
import Classes from './Classes.jsx'
import ClassCreate from './ClassCreate.jsx'
import ClassInfo from './ClassInfo.jsx'

export const AppContext = createContext(null);

function App() {
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  return (
    <>
      <AppContext value={{ username, setUsername, isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/attendance/:id" element={<Attendance />} />
        </Routes>
      </AppContext>
    </>
  )
}


export default App