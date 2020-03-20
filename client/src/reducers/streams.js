import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_STREAM:
            // make a new object and update the value of the action.payload.id key
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_STREAMS:
            // we want to make a new object and put all the current state in it
            // we then want to add the key-value pairs from mapKeys to this object
            // for each object in the payload, mapKeys makes a key-value pair
            // with the key being id found withing the object and the value being the object itself 
            return { ...state, ..._.mapKeys(action.payload, 'id')}
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_STREAM:
            return _.omit(state, action.payload)
        default:
            return state;
    }
}