/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

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


import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './app/Screens/SignUp';
import { Provider } from 'react-redux';
import store from './app/store'
import Login from './app/Screens/Login';
import Bottomtab from './app/navigation/Bottomtab';



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

  return (
    <Provider store={store}>
      <NavigationContainer >

        <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' }, }}>


          <Stack.Screen name="Login" component={Login} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  )

}
