import React from 'react'
import  Cookie from 'js-cookie';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
      let isLogin = Cookie.get('token')
  return !!isLogin === true? children : <Navigate to='/dashboard-login'/>
  
}

export default PrivateRoute;