import React from 'react'
import {Route, Routes} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Customize from './pages/Customize'

function App() {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/customize' element={<Customize/>} />
    </Routes>
  )
}

export default App
