import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { FontAwesome, AntDesign, EvilIcons } from '@expo/vector-icons';
// import { Fontisto } from '@expo/vector-icons';
import Home from '../Screens/Home';

import AppointmentScreen from '../Screens/AppointmentScreen';
import Search from '../Screens/Search';
import { View, Text, ImageBackground, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
// import { Ionicons } from '@expo/vector-icons';
import NotificationList from '../Screens/NotificationList';
import { useSelector, useDispatch } from 'react-redux';
import userService from '../services/UserService';


const Tab = createBottomTabNavigator();


const Bottomtab = () => {
    const userData = useSelector(state => state.user.userData);
    const dispatch = useDispatch();

    return (
        <Tab.Navigator
            screenOptions={({ route, headerShown }) => ({
                headerShown: false,
                // tabBarIcon: ({ focused, color, size }) => {
                //     let iconName;

                //     if (route.name === 'Home') {
                //         iconName = focused ? 'home' : 'home'; // Set the icon for the Home screen
                //     } else if (route.name === 'Login') {
                //         iconName = focused ? 'user' : 'user'; // Set the icon for the Settings screen
                //     }
                //     else if (route.name === 'AppointmentScreen') {
                //         iconName = focused ? 'calendar' : 'calendar'
                //     }
                //     else if (route.name == 'Search') {
                //         iconName = focused ? 'search' : 'search'
                //     }



                //     {
                //         if (route.name === 'Home')
                //             return <FontAwesome name={iconName} size={size} color={color} />;
                //         else if (route.name == 'Notification')
                //             return <Ionicons name="md-notifications-outline" size={24} color="black" />

                //         else if (route.name === 'AppointmentScreen')
                //             return <EvilIcons name={iconName} size={size} color={color} />
                //         else if (route.name == 'Search')
                //             return <Fontisto name={iconName} size={size} color={color} />
                //     }



                // },
                tabBarButton: props => (
                    <TouchableOpacity
                        {...props}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {props.children}
                    </TouchableOpacity>
                ),
                tabBarActiveTintColor: 'blue', // Set the active tab color
                tabBarInactiveTintColor: 'gray', // Set the inactive tab color
            })}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: '',
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: '', // Set the label for the Settings screen
                }}
            />

            <Tab.Screen
                name="AppointmentScreen"
                component={AppointmentScreen}
                options={{
                    tabBarLabel: '',
                }}
            />

            <Tab.Screen
                name="Notification"
                component={NotificationList}
                options={{
                    tabBarLabel: '', // Set the label for the Settings screen
                }}
            />

        </Tab.Navigator>
    );
};

export default Bottomtab;

