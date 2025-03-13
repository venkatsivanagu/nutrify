import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate=useNavigate()
    const loggedData=useContext(UserContext);
    function logout(){
        localStorage.removeItem("nutrify-user")
        loggedData.setLoggedUser(null);
        navigate('/login')
    }
  return (
    <div className='header'>
      <ul>
        <img src="https://primary.jwwb.nl/public/q/h/z/temp-yhwinfnjzqdeejivqptr/wfnb9x/Nutrify_Logo_CMYKHD5.jpg?enable-io=true&enable=upscale&fit=bounds&width=1200" style={{borderRadius:"10px"}} width={"205px"} height={"50px"} />
        <Link to='/home'> <li>Home</li></Link>
        <Link to='/diet'> <li>My Track</li></Link>
        <Link to='/track'><li>Search</li></Link>
        <Link to='/add'><li>Add New</li></Link>
      </ul>
      <button onClick={logout} className='button'>Logout</button>
    </div>
  )
}

export default Header
