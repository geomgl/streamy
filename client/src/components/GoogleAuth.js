import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'


class GoogleAuth extends React.Component {
    // we need to load the auth2 library from the google browser api the first time
    // appears on the screen. The 'window' tells react that the variable gapi is on 
    // window scope. 
    componentDidMount() {
        // we pass a callback as a second param to be completed once the lib is loaded. 
        // The scope is for the parts of the user's account that we want to access. 
        // Ex) 'This website wants to access your *email, *profile picture, etc.
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '859470240615-95gqlh2nkdviturnn74jtimjqhp0rffm.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // after async init function resolves, get reference to init object
                this.auth = window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get());

                // this function listens to any changes in sign-in status
                // callback is invoked when status changes
                this.auth.isSignedIn.listen(this.onAuthChange);

            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = (userId) => {
        this.auth.currentUser.get().getId();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <Button onClick={() => this.auth.signOut()} color='red' icon labelPosition='left'>
                    <Icon name='sign out' />
                    Sign Out
                </Button> 
            )
        } else {
            return (
                <Button onClick={() => this.auth.signIn()} color='red' icon labelPosition='left'>
                    <Icon name='google' />
                    Sign In With Google
              </Button>
            )
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

// makes auth prop and sets to === state.auth
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

// signIn and signOut action creators added to props
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);