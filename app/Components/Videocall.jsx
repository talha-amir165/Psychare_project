import React, { useState, useCallback } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Videocall = ({ route, navigation }) => {
    const [value, setValue] = useState('');

    const onChangeText = (newText) => {
        setValue(newText);
    }

    return (
        <View>

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder="Enter text here"
            />
            <Button title="Join" onPress={() => {
                navigation.navigate('VoiceCallPage', { value })
            }} />
        </View>
    );
};

export default Videocall;
