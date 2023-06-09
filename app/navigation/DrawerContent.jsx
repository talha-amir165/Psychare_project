import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function DrawerContent(props) {
    const drawerRef = useRef(null);
    const userData = useSelector(state => state.user.userData);
    const dispatch = useDispatch();
    const signout = () => {

        AsyncStorage.removeItem('token');
        dispatch({
            type: 'SET_USER_DATA',
            payload: null
        });
        props.navigation.closeDrawer();
        props.navigation.navigate('Login');


    }






    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} ref={drawerRef}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{userData?.name}</Title>
                                <Caption style={styles.caption}>{userData?.email}</Caption>
                            </View>
                        </View>


                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            // icon={({ color, size }) => (
                            //     <Icon
                            //         name="home-outline"
                            //         color={color}
                            //         size={size}
                            //     />
                            // )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            // icon={({ color, size }) => (
                            //     <Icon
                            //         name="account-outline"
                            //         color={color}
                            //         size={size}
                            //     />
                            // )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            // icon={({ color, size }) => (
                            //     <Icon
                            //         name="message-outline"
                            //         color={color}
                            //         size={size}
                            //     />
                            // )}
                            label="Messages"
                            onPress={() => { props.navigation.navigate('Messanger') }}
                        />

                        <DrawerItem
                            // icon={({ color, size }) => (
                            //     <Icon
                            //         name="account-check-outline"
                            //         color={color}
                            //         size={size}
                            //     />
                            // )}
                            label="Support"
                            onPress={() => { props.navigation.navigate('SupportScreen') }}
                        />
                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    // icon={({ color, size }) => (
                    //     <Icon
                    //         name="exit-to-app"
                    //         color={color}
                    //         size={size}
                    //     />
                    // )}
                    label="Sign Out"
                    onPress={signout}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});