import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useLocalStorage } from '../LocalStorage/useLocalStorage'

export const ProtectedRoute = ({ component: Component, permission,  ...rest }) =>{
  const [user] = useLocalStorage("supabase.auth.token")

  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          console.log(props, rest)
          return <Component {...props}  />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
