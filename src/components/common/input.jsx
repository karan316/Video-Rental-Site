import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor="username">{label}</label>
            <input
                // value={value} //this should not be null or undefined
                // onChange={onChange}
                // type={type}
                // autoFocus focuses the input field
                // ref={this.username}
                {...rest} //rest automatically sets any other attribute to props object which has the same name
                name={name}
                id={name}
                className="form-control"
            />
            {/* if error is truthie div will be rendered else ignored */}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
