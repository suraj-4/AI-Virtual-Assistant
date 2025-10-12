import React, { useContext } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Customize from './pages/Customize'
import { userDataContext } from './context/UserContext'
import CustomizeStep2 from './pages/CustomizeStep2'

function App() {
  const {userData, setUserData} = useContext(userDataContext)
  return (
    <Routes>
      <Route path='/' element={
        (userData?.assistantImage && userData?.assistantName)? 
        <Home/> : <Navigate to={"/customize"}/>}/>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
      <Route path='/login' element={!userData?<Login/>:<Navigate to={"/"}/>}/>
      <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/login"}/>} />
      <Route path='/customize-step-2' element={userData?<CustomizeStep2/>:<Navigate to={"/login"}/>} />
    </Routes>
  )
}

export default App
