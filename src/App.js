import React from 'react';
import NavBar from './components/navBar';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import { Route, Redirect, Switch } from 'react-router-dom';
import NotFound from './components/notfound';
import MovieForm from './components/movieform';
import './App.css';

function App() {
    return (
        <React.Fragment>
            <NavBar />
            <main className="container">
                <Switch>
                    <Route path="/movies/:id" component={MovieForm} />
                    <Route path="/movies" component={Movies} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/rentals" component={Rentals} />
                    <Route path="/not-found" component={NotFound} />

                    <Redirect from="/" to="/movies" />
                    <Redirect to="/not-found" />
                </Switch>
            </main>
        </React.Fragment>
    );
}

export default App;
