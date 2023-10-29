import React from 'react'
import {Route,Routes} from 'react-router-dom'

import UserPublicRoutes from './UserPublicRoutes'
import UserProtectedRoutes from './UserProtectedRoutes';
//import Home from '../pages/Home';
import LoginForm from '../pages/LoginForm';
import RegistrationForm from '../pages/RegistrationForm';
//import Dashboard from '../pages/Dashboard';
import Board from '../pages/Board';
const UserRoutes = () => {


 
  return (
    <>
    
      <Routes>
         
       
          <Route exact path="/" element={<UserPublicRoutes><LoginForm /></UserPublicRoutes>} />
          <Route exact path="/register" element={<UserPublicRoutes><RegistrationForm /></UserPublicRoutes>} />
        
          <Route path ='/home' element ={<UserProtectedRoutes><Board/></UserProtectedRoutes>}/>
          {/* <Route path ='/dashboard' element ={<UserProtectedRoutes><Dashboard/></UserProtectedRoutes>}/> */}
        
          <Route path="*" element={<Error/>} />

        </Routes>
    </>
  )
}

export default UserRoutes
