
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
           localStorage.getItem("user") ?
                <Component {...props} />
            : 
                   <Redirect to="/" />
        
            
        )} />
    );
};

export default PrivateRoute;