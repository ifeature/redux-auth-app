import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actions from '../../actions';

const Input = ({ input, type }) => (
    <input {...input} type={type} className="form-control" />
);

const Error = ({ meta: { touched, error }}) => (
    <div className="error">{touched && error}</div>
);

class Signup extends Component {
    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
              <div className="alert alert-danger">
                  <strong>Oops!</strong> {this.props.errorMessage}
              </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field name="email" component={Input} />
                    <Field name="email" component={Error} />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field name="password" component={Input} type="password" />
                    <Field name="password" component={Error} />
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <Field name="passwordConfirm" component={Input} type="password" />
                    <Field name="passwordConfirm" component={Error} />
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign up!</button>
                {this.renderAlert()}
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match!';
    }

    return errors;
}

export default compose(
    connect(({ auth: { error }}) => ({ errorMessage: error }), actions),
    reduxForm({
        form: 'signup',
        validate,
    }),
)(Signup);
