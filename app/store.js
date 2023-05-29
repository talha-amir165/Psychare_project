import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import NotificationReducer from './reducers/NotificationReducer'
import LoadingReducer from './reducers/LoadingReducer';

const rootReducer = combineReducers({
    user: userReducer,
    notification: NotificationReducer,
    LoadingState: LoadingReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;