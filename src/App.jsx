import React, { useEffect, useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from './componets/Register'
import './App.css'
import Login from './componets/Login'
import Notfound from './componets/Notfound'
import Track from './componets/Track'
import { UserContext } from './contexts/UserContext'
import Private from './componets/Private'
import Diet from './componets/Diet'
import Addfood from './componets/Addfood'
import Home from './componets/Home'

const App = () => {
  
  const [LoggedUser,setLoggedUser]=useState(JSON.parse(localStorage.getItem("nutrify-user")))
  

  
  return (
    <>
    <UserContext.Provider value={{LoggedUser,setLoggedUser}}>
    
    <Routes>
    <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      
      //private routing
      <Route path='/home' element={<Private component={Home}/>}/>
      <Route path='/track' element={<Private component={Track}/>}/>
      <Route path='/diet' element={<Private component={Diet}/>}/>
      <Route path='/add' element={<Addfood/>}/>


      <Route path='*' element={<Notfound/>}/>

    </Routes>

  </UserContext.Provider>
    </>
  )
}

export default App
