import streams from '../apis/streams'
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from './types';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}


// syntax for a function, that returns a function.  The function it returns is an async function 
// that that take in dispatch as a parameter.  We make a POST request to the json-server mocked 
// API at the /streams endpoint.  We insert the formVals objec that we get when the user
// submits the form
export const createStream = formVals => async (dispatch, getState) => {
    // we also want to attach the id of userd that create streams
    const  userId  = getState().auth.userId;
    const response = await streams.post('/streams', { ...formVals, userId });


    dispatch({ type: CREATE_STREAM, payload: response.data })

    // once we get a successful response, we can dispatch the action and naviagate
    // the user back to the streamList component
    history.push('/');

}

// fetch a particular stream
export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
}

// fetch all streams
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('./streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data })
}

export const editStream = (id, formVals) => async dispatch => {
    const response = await streams.patch(`./streams/${id}`, formVals);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
}

export const deleteStream = id => async dispatch => {
    await streams.delete(`./streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });

    // navigate back to streams page upon deletion of a stream
    history.push('/');
}

