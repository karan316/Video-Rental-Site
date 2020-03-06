import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const options = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, options); //validate returns an
        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors; //map an array into an object
    };

    //validate each input
    validateProperty = ({ name, value }) => {
        // console.log(`validated${name}: ${value}`);
        const obj = { [name]: value }; //whatever name is at runtime that will be set to value
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema); //we need this to abort early. pick the error property of the return value

        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault(); //does not reload the form
        const errors = this.validate();
        this.setState({ errors: errors || {} }); //if errors exists then errors else empty object. Do not keep it null. will give error
        if (errors) return;
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        //input is e.currentTarget
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = { ...this.state.data };
        data[input.name] = input.value; //gets the current value in the input field (gets the value dynamically for username and password using name property)
        this.setState({ data, errors });
    };

    renderButton(label) {
        return (
            <button
                disabled={this.validate()} //this.validate() = null (false) if no input else true
                className="btn btn-primary"
            >
                {label}
            </button>
        );
    }

    renderInput(name, label, type = 'text') {
        /* created Input component because we had repeating codes for username field and password field with minor change */

        const { data, errors } = this.state;
        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }
}

export default Form;
