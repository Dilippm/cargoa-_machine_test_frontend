import React from 'react'
import { Navigate } from 'react-router-dom';


function UserPublicRoutes(props) {
    if (localStorage.getItem('token')) {
      
        return <Navigate to="/home" />;
      }
     
      return props.children;
}

export default UserPublicRoutes