import React from 'react';
import { fetchStream } from '../../actions'
import { connect } from 'react-redux'
import flv from 'flv.js';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }
    componentDidMount() {
        // destructuring. Same as this.props.match.params.id
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();

    }

    // when the fetching is complete, the redux store will update, causing our component to 
    // update, at which point we should build the video player if not already done
    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    // we only want to setup the video player after we know the stream has been fetched
    // if we already have a video player built, or if we still havn't successfully fetched
    // the stream, this function will return nothing
    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }

        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        console.log(this.player)
        console.log(this.videoRef)
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load(); 
    }

    // note that if we don't have a stream, we return 'Loading' and we won'thave the video 
    // element for the videoRef. 
    render() {
        if (!this.props.stream) {
            return 'Loading...';
        }
        return (
            <div>
                <video
                    ref={this.videoRef} style={{ width: '100%' }}
                    controls='true'>
                </video>
                <h1>{this.props.stream.title}</h1>
                <h5>{this.props.stream.description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchStream })(StreamShow);