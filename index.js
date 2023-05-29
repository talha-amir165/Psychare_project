/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store'

import { name as appName } from './app.json';
import PushNotification from "react-native-push-notification";
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

});

const AppWithRedux = () => ( <
    Provider store = { store } >
    <
    App / >
    <
    /Provider>
);

AppRegistry.registerComponent(appName, () => AppWithRedux);