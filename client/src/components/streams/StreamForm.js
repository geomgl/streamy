import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Input } from 'semantic-ui-react'


// redux form automates the processes of getting data from a form into the redux store
// and getting that data back into the component

class StreamForm extends React.Component {
    // render input gets called from another component, so the this.rendorError will cause an 
    // error b/c the context of 'this' is unknown.  Thus, renderInput needs to be an arrow function
    renderInput = ({ input, label, meta }) => {
        // formProps.input is an object w/ value porperty, onChange handler, etc.
        // we can destructure the input object  out of the formProps object
        // we can then add the input as props to input component as follows
        // we also destructure off the meta property b/c that is where the error messages
        // from the validate function can be found
        console.log(meta);
        return (
            <div className="field">
                <label>{label}</label>
                <Input {...input} autoComplete="off" />
                <div>{this.renderError(meta)}</div>
            </div>
        )
    }

    // touched is a boolean that is true if the user has selected and then deselected a field
    // ex) clicked an input box then clicked another one.  If we see a user touch an input box
    // and move on without entering some input, we should display a warning
    renderError({ error, touched }) {
        if (error && touched) {
            return <div style={{color: "red"}}> {error} </div>
        }
    }

    render() {
        // the name attribute denotes the data that we want the redux form to handle
        // Fields don't know what to render by themselves.  So we must tell it a component
        // that we want to visually see (checkbox, textbox, some created component, etc.).
        // Any other props get passed on to the renderInput function
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className='ui form'>
                <Field name="title" component={this.renderInput} label='Enter Title'/>
                <Field name="description" component={this.renderInput} label='Enter Description'/>
                <Button primary> Submit </Button>
            </form>
        )
    }
}

// redux-form uses this function for form validation.  If nothing is wrong, we return an empty
// object.  If something is wrong, we enter key-value pairs with the keys being the fields
// that have issues (field must have same name as property in object) and the values being
// the error messages.  If errors exists, redux form will re-render the fields and pass 
// the error messages to teh renderInput function.
const validate = (formVals) => {
    const errors = {}
    if (!formVals.title) {
        errors.title = 'You must enter a title before continuing.'
    }
    if (!formVals.description) {
        errors.description = 'You must enter a decription before continuing.'
    }

    return errors;
}

// this is a version of our component that's wrapped with reduxForm
export default reduxForm({
    form: 'StreamForm',
    validate
})(StreamForm);
