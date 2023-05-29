import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import socket from '../Hooks/socket';
import { useSelector, useDispatch } from 'react-redux';
import PushNotification from "react-native-push-notification";

const NotificationList = () => {
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([
        { id: '1', text: 'Upcoming Appointment on 4:00 pm with Dr Talha Amir', read: true, img: require('../assets/doc11.png') },

        { id: '3', text: 'Upcoming Appointment on 4:00 pm with Dr Oreed', read: true, img: require('../assets/doc13.png') },

    ]);
    const not = useSelector(state => state.notification);
    console.log(not);
    const channel = () => {
        PushNotification.createChannel({
            channelId: "test-channel",
            channelName: "Test channel"
        })
    }



    const handleNotificationPress = () => {
        PushNotification.localNotification({
            channelId: "test-channel",
            title: "hello",
            message: "congrats"
        })

    };
    useEffect(() => {
        console.log('user changes')
        // Event handler for appointmentNotification
        socket.on("appointmentNotification", (notification) => {
            // Add the new notification to the existing list
            console.log("Appointment received" + JSON.stringify(notification));
            dispatch({
                type: 'SET_Notification',
                payload: notification
            });
        });
        channel();

    }, []);








    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.notificationContainer,
                item.read && styles.readNotificationContainer,
            ]}
            onPress={handleNotificationPress}
        >
            <View style={{ flexDirection: 'row' }}>
                {item.img &&
                    <Image source={item?.img} style={{ width: 50, height: 80, resizeMode: 'contain' }}></Image>}

                <View style={{ width: '63%', padding: 10, marginLeft: 5 }}>
                    <Text style={[styles.notificationText, item.read && styles.readNotificationText, styles.blackText]}>
                        {item.text}
                    </Text>
                </View>
                <Text style={styles.blackText}>
                    6 mins ago
                </Text>
                {item.read && <View style={styles.dot} />}
            </View>

        </TouchableOpacity>
    );

    const renderSeparator = () => <View style={styles.separator} />;

    return (
        <View style={{
            backgroundColor: '#F8F9FA', height: '100%', marginBottom: 20
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 70 }}>

                <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>Notifications</Text>


            </View>
            <FlatList
                data={notifications}
                renderItem={renderItem}

                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    notificationContainer: {
        backgroundColor: 'white',
        padding: 15,
        marginTop: 8
    },
    readNotificationContainer: {
    },
    notificationText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black'

    },
    blackText: {
        color: 'black'
    },
    readNotificationText: {

        fontWeight: 'bold',
        color: 'black'
    },
    separator: {
        height: 7,
        backgroundColor: '#F8F9FA',

    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#418CFD',
        marginTop: 30,
        marginHorizontal: -20

    },
});

export default NotificationList;
