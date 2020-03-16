import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
    state = {
        data: {
            username: "", //do not use null instead of empty string. will give error!
            password: ""
        },

        errors: {}
    };
    schema = {
        username: Joi.string()
            .required()
            .label("Username"),
        password: Joi.string()
            .required()
            .label("Password")
    };

    // username = React.createRef();

    //validate the entire form

    doSubmit = async () => {
        try {
            const { data } = this.state;
            await auth.login(data.username, data.password);
            // this.props.history.push("/"); //direct the user to the home page after logging in
            //do a full reload when the user logs in
            const { state } = this.props.location;
            //if there was an existing state go to that state's path else go to home
            window.location = state ? state.from.pathname : "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data; //get the error message from the server
                this.setState({ errors });
            }
        }
    };

    render() {
        //if there is an existing user then go to /movies instead of /login
        if (auth.getCurrentUser()) return <Redirect to="/" />;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
