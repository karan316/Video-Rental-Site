import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
class RegisterForm extends Form {
    state = {
        data: {
            username: "",
            password: "",
            name: ""
        },

        errors: {}
    };

    schema = {
        username: Joi.string()
            .required()
            .email()
            .label("Username"),
        password: Joi.string()
            .required()
            .min(5)
            .label("Password"),
        name: Joi.string()
            .required()
            .label("Name")
    };

    doSubmit = async () => {
        //2. call the register function when submit is clicked and pass the state data
        //3. to handle errors from the server encapsulate the register function call in try catch
        try {
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers["x-auth-token"]); //store the custom header in local storage which you get when you click register
            // this.props.history.push("/"); //redirect to home after registering
            window.location = "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                // if the user is already registered the status error is 400
                const errors = { ...this.state.errors };
                errors.username = ex.response.data; // data contains the error message if its a bad request
                this.setState({ errors });
            }
        }
    };
    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
