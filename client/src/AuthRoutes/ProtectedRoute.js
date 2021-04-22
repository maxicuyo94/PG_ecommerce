import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useLocalStorage } from '../LocalStorage/useLocalStorage'

export const ProtectedRoute = ({ component: Component, ...rest }) =>{
  const userLoged = useSelector(state =>  state.usersReducer.userLoged)

  return (
    <Route
      {...rest}
      render={props => {
        if (userLoged.id) {
          if(props.location.pathname.toLocaleLowerCase() === "/access"){
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location.pathname
                  }
                }}
              />
            );
          }
          return <Component {...props}/>;
        } else {
          if(props.location.pathname.toLocaleLowerCase() === "/access"){
            return <Component {...props}/>;
          }
          return (
            <Redirect
              to={{
                pathname: "/access",
                state: {
                  from: props.location.pathname
                }
              }}
            />
          );
        }
      }}
    />
  );
};
