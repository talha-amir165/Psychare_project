/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './app/navigation/DrawerContent';
import socket from './app/Hooks/socket';
import { useSelector, useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';



import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './app/Screens/SignUp';
import { Provider } from 'react-redux';
import store from './app/store'
import Login from './app/Screens/Login';
import Bottomtab from './app/navigation/Bottomtab';
import BookAppointment from './app/Screens/BookAppointment';
import CheckOut from './app/Screens/CheckOut';
import Doctor from './app/Screens/Doctor';
import PaymentForm from './app/Screens/PaymentForm';
import VideoConferencePage from './app/Screens/VideoConferencePage';
import Messenger from './app/Screens/Messenger';
import Chat from './app/Screens/Chat';
import AppointmentDetails from './app/Screens/AppointmentDetails';
import ReScheduledAppointment from './app/Screens/ReScheduledAppointment';
import Records from './app/Screens/Records'
// import ForgetPasswordCode from './app/Screens/ForgetPasswordCode';



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    color: 'black',
  },
};

export default function App() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const userData = useSelector(state => state.user.userData);

  const dispatch = useDispatch();

  const Devicetoken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
  }
  useEffect(() => {
    Devicetoken()
  }

    , [])
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground Notification:', remoteMessage.notification);
      // Handle the notification payload here
    });

    return unsubscribe;
  }, []);

  return (

    <NavigationContainer >

      <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' }, }}>



        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="DrawerScreen">
          {() => (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props}

            />}>
              <Drawer.Screen name="Start" component={Bottomtab}
                options={{ headerShown: false }}
              />
            </Drawer.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="Doctor" component={Doctor} />
        <Stack.Screen name="Form" component={PaymentForm} />

        <Stack.Screen name="Rescheduled" component={ReScheduledAppointment} />
        <Stack.Screen name="BookAppointment" component={BookAppointment} />
        <Stack.Screen name="Checkout" component={CheckOut} />
        <Stack.Screen name="Call" component={VideoConferencePage} />
        <Stack.Screen name="Messanger" component={Messenger} />

        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
        {/* <Stack.Screen name="ForgetPasswordCode" component={ForgetPasswordCode} /> */}


      </Stack.Navigator>
    </NavigationContainer>


  )

}
