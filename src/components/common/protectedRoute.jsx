import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!auth.getCurrentUser())
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location } //from is a location object
                            }}
                        />
                    );
                return Component ? <Component {...props} /> : render(props); //passing the props is necessary if we use render
            }}
        />
    );
};

export default ProtectedRoute;
