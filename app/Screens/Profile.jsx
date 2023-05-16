import React, { useContext } from 'react';
import { ProfileContext } from '../ContextApi/ProfileContext';
import { View, Text, TouchableOpacity, Button, Image, ImageBackground, ScrollView } from 'react-native'
function Profile() {
    const [profile, setProfile] = useContext(ProfileContext);

    const handleUpdateProfile = () => {
        setProfile({ name: 'John', email: 'john@example.com', bio: 'A software developer' });
    };

    return (
        <View>
            <Text>{profile.name}</Text>
            <Text>{profile.number}</Text>
            <Text>{profile.bio}</Text>
            <Button title="Update Profile" onPress={handleUpdateProfile} />
        </View>
    );
}

export default Profile;
