const INITIAL_STATE = {
    Notification: null
};

const NotificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_Notification':
            return {
                ...state,
                Notification: action.payload
            };
        default:
            return state;
    }
};

export default NotificationReducer;