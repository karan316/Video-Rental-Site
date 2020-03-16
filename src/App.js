import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import MovieForm from "./components/movieform";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
    state = {};

    componentDidMount() {
        //this code extracts the user details from the jwt
        //edit 1 moved to authService.js
        const user = auth.getCurrentUser();
        this.setState({ user });
    }
    render() {
        const { user } = this.state;
        return (
            <React.Fragment>
                <ToastContainer />
                <NavBar user={user} />
                <main className="container">
                    <Switch>
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/register" component={RegisterForm} />
                        {/* if user is not logged in and tries to open movie form he will be redirected to login page*/}

                        <ProtectedRoute
                            path="/movies/:id"
                            component={MovieForm}
                        />
                        <Route
                            path="/movies"
                            render={props => <Movies {...props} user={user} />} //we use render instead of component to pass in props
                        />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/not-found" component={NotFound} />
                        <Route path="/movies/new" component={MovieForm} />
                        <Redirect from="/" to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
