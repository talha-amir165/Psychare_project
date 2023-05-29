const INITIAL_STATE = {
    Loading: null,
    Search: null,
    Appoint: null
};

const LoadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                Loading: action.payload
            };
        default:
            return state;
    }
};

export default LoadingReducer;