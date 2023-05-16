import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({ stars = 5, defaultRating = 0, size = 30, disabled = false, onRated }) => {
    const [rating, setRating] = useState(defaultRating);

    const handlePress = (newRating) => {
        if (!disabled) {
            setRating(newRating);
            onRated && onRated(newRating);
        }
    };

    const starIcons = [];
    for (let i = 1; i <= stars; i++) {
        starIcons.push(
            <TouchableOpacity key={i} onPress={() => handlePress(i)}>
                <FontAwesome
                    name={i <= rating ? 'star' : 'star-o'}
                    size={size}
                    color="#FFD700"
                    style={styles.star}
                />
            </TouchableOpacity>
        );
    }

    return <View style={styles.container}>{starIcons}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    star: {
        marginRight: 5,
    },
});

export default StarRating;
