import React from 'react';
import ReactDOM from 'react-dom'
import { Button } from 'semantic-ui-react';
import history from '../history'

const Modal = (props) => {

    // if the user clicks somewhere inside the modal, we don't want the action to bubble up 
    // and be caught by the parent div (which will cause the modal to dissappear due to the 
    // () => history.push() onClick function in the parent div.  We use e.stopPropagation() to
    // preven this
    return ReactDOM.createPortal(
        <div
            onClick={() => history.push('/')}
            className='ui dimmer modals visible active'
        >
            <div
                onClick={props.onDismiss}
                className='ui standard modal visible active'
            >
                <div className='header'>{props.title}</div>
                <div className='content'>{props.content}</div>
                <div className='actions'>{props.actions}</div>
            </div>

        </div>,
        document.querySelector('#modal')
    );
}

export default Modal;