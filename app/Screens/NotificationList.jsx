import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([
        { id: '1', text: 'Upcoming Appointment on 4:00 pm with Dr Talha Amir', read: true, img: require('../assets/doc11.png') },

        { id: '3', text: 'Upcoming Appointment on 4:00 pm with Dr Oreed', read: true, img: require('../assets/doc13.png') },

    ]);

    const handleNotificationPress = (notificationId) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === notificationId
                    ? { ...notification, read: true }
                    : notification,
            ),
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.notificationContainer,
                item.read && styles.readNotificationContainer,
            ]}
        >
            <View style={{ flexDirection: 'row' }}>
                {item.img &&
                    <Image source={item?.img} style={{ width: 50, height: 80, resizeMode: 'contain' }}></Image>}

                <View style={{ width: '63%', padding: 10, marginLeft: 5 }}>
                    <Text style={[styles.notificationText, item.read && styles.readNotificationText]}>
                        {item.text}
                    </Text>
                </View>
                <Text>
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

                <Text style={{ fontSize: 16, fontWeight: '600' }}>Notifications</Text>


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

    },
    readNotificationText: {

        fontWeight: 'bold',
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
