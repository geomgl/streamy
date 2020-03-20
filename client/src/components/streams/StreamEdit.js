import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash'


class StreamEdit extends React.Component {    
    componentDidMount() {
        console.log(this.props);
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formVals => {
        this.props.editStream(this.props.match.params.id, formVals);
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        } else {
            // redux-form will see that stream contains a 'title' and 'description' property 
            // and use those values to pre-populate the form fields
            // _.pick() makes an object with only the specified properties from given object
            return (
                <div>
                    <h2>Edit Stream</h2>
                    <StreamForm
                        initialValues={_.pick(this.props.stream, 'title', 'description')}
                        onSubmit={this.onSubmit}
                    />
                </div>
            )
        }
    }
}


// stream edit is rendered by a Route component and thus react-router-dom passes down some
// additional props.  The id of the stream that the user wants to edit will be a query param
// that we can access through props.match.params.id
// ownProps allows mapStateToProps to access the component's props
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);