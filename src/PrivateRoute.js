import React from 'react';
import { Route, Redirect,useHistory } from 'react-router-dom';
import Dashboard from '../src/views/Home/home'

const PrivateRoute = ({component: Component, ...rest}) => {
    const history = useHistory();
    console.log(window.location.pathname);
    const authGuard = (Component) => () => {
      return localStorage.getItem("token") ? (
        <Component />
      ) : (
        history.push(`/admin/login`)
      );
    };
      const token = localStorage.getItem("Brilliance");
      console.log(token)
    return (

        
         
        <Route path="/admin" render={authGuard(Dashboard)} />
    );
};

export default PrivateRoute;