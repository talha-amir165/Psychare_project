import { View, Text, Image } from 'react-native'
import React from 'react'

const ProfileHeader = ({ pic, name }) => {
    function getFirstName(fullName) {
        // Split the full name into an array of individual words
        const nameArray = fullName.split(' ');

        // Return only the first word (i.e., the first name)
        return nameArray[0];
    }
    return (
        <View style={{ paddingBottom: 20, justifyContent: 'center', position: 'relative', marginTop: 5 }}>
            <View style={{ alignItems: 'center' }}>
                <Image style={{ width: 500, height: 300, resizeMode: 'contain' }} source={pic} />
            </View>
            <Image style={{ position: 'absolute', top: 70, left: 2 }} source={require('../assets/docCylinder.png')} />
            <Image style={{ position: 'absolute', zIndex: -1, top: 125 }} source={require('../assets/doctorRectangle.png')} />

            <Image style={{ position: 'absolute', top: 230, left: 340 }} source={require('../assets/docCircle.png')} />
            <Text style={{
                color: 'white', fontWeight: '900', fontSize: 96, zIndex: -1, position: 'absolute', textShadowColor: 'rgba(65, 140, 253, 0.05)'

            }}> {getFirstName(name)}</Text>
        </View>
    )
}

export default ProfileHeader