import React from 'react';
import { fetchStreams } from '../../actions';
import { connect } from 'react-redux';
import { List, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    // conditionally render edit and delete buttons for current user's streams
    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <List.Content floated='right'>
                    <Link
                        to={`/streams/edit/${stream.id}`}
                        className='ui button primary'>Edit
                    </Link>
                    <Link
                        to={`/streams/delete/${stream.id}`}
                        className='ui button negative'>Delete
                    </Link>
                </List.Content>
            )
        }
    }

    // render 'create stream' button when user is signed in
    renderCreate() {
        return (
            <div style={{ textAlign: 'right' }}>
                <Link to='/streams/new' className='ui button primary'>
                    Create Stream
                </Link>
            </div>
        )
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <List.Item>
                    {this.renderAdmin(stream)}

                    <List.Icon name='video' size='large' verticalAlign='middle' />
                    <List.Content>
                        <Link to={`/streams/show/${stream.id}`} className='header'>
                            {stream.title}
                        </Link>
                        <List.Description as='a'>{stream.description}</List.Description>
                    </List.Content>
                </List.Item>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <List divided relaxed>
                    {this.renderList()}
                </List>
                <div text-align='right'>
                    {this.renderCreate()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // state.streams is an object that with stream ids as keys and stream objects as values
    // Object.values() will make an array of all the object's values (streams object in our case)
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);