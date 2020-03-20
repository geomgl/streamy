import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions/index';
import StreamForm from './StreamForm';

// redux form automates the processes of getting data from a form into the redux store
// and getting that data back into the component

class StreamCreate extends React.Component {
    onSubmit = (formVals) => {
        // Note on submitting form: we usually we use e.preventDefault() as first line 
        // to prevent the browser from refreshing the page when the user submits the form.  
        // With redux form we don't do this. Also, we usually pass this.onSubmit function to the
        // as the onSubmit prop of the form, which is called upon submission.  Redux-form provides
        // the callback this.form.handleSubmit() which we call with our onSubmit callback.  The 
        // preventDefault is handled my redux-form and onSumbit is called with all of the values
        // of the form
        this.props.createStream(formVals);
    }

    render() {
        // the name attribute denotes the data that we want the redux form to handle
        // Fields don't know what to render by themselves.  So we must tell it a component
        // that we want to visually see (checkbox, textbox, some created component, etc.).
        // Any other props get passed on to the renderInput function
        return (
            <div>
                <h2>Create a Stream</h2>
                <StreamForm onSubmit={this.onSubmit} />
            </div> 
        )
    }
}


// we pass the wrapped component to the connect function
export default connect(null, { createStream })(StreamCreate)