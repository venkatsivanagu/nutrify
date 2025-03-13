
import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Navigate } from 'react-router-dom';

const Private = (props) => {
    const loggedData=useContext(UserContext);
  return (
    loggedData.LoggedUser!==null?
    <props.component/>:<Navigate to='/login'/>
  )
}

export default Private
