// App.js
import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Button, Image, ImageBackground, ScrollView, StyleSheet } from 'react-native'

import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import { useSelector } from 'react-redux';

export default function VideoConferencePage(props) {
    const Details = props.route.params.Details;
    const userData = useSelector(state => state.user.userData);
    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={54696579}
                appSign={'675022b10f6fba5e57d3b4aeca4ee23fb5e08d817a2d1c81d10b40850a791013'}
                userID={userData.id} // userID can be something like a phone number or the user id on your own user system. 
                userName={userData.name}
                callID={Details._id} // callID can be any unique string. 

                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { props.navigation.navigate('Home') },
                    onHangUp: () => { props.navigation.navigate('Home') },
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})