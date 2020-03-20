import React from 'react';
import Modal from '../Modal';
import { Button } from 'semantic-ui-react'
import history from '../../history'
import { connect } from 'react-redux'
import { fetchStream, deleteStream } from '../../actions'
import { Link } from 'react-router-dom'

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <Button onClick={() => this.props.deleteStream(id)} color='red'>Delete</Button>
                <Link to='/' className='ui button'>Cancel</Link>
            </React.Fragment>
        )
    };

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        } else {
            return `Are you sure you want to delete the stream, "${this.props.stream.title}"?`
        }
    }

    render() {
        return (
            <div>
                Stream Delete
            <Modal
                    title='Delete Stream'
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={(e) => history.push('/')}
            />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);