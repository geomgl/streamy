const INITIAL_STATE = {
    signedIn: null
}

export default (state = {}, action) =>  {
    // don't alter the current state object, create a new one
    switch(action.type) {
        case 'SIGNED_IN':
            return { ...state, signedIn: true }
        case 'SIGN_OUT':
            return { ...state, signedIn: false }
        default:
            return state;
    }
}
