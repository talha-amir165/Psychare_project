import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import StarRating from './StarRating';

const ReviewModal = ({ visible, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRating = (newRating) => {
        setRating(newRating);
    };

    const handleComment = (text) => {
        setComment(text);
    };

    const handleSubmit = () => {
        onSubmit && onSubmit({ rating, comment });
        setRating(0);
        setComment('');
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.rating}>
                        <Text style={styles.label}>Rating:</Text>
                        <StarRating defaultRating={rating} size={30} onRated={handleRating} />
                    </View>
                    <View style={styles.comment}>
                        <Text style={styles.label}>Comment:</Text>
                        <TextInput
                            style={styles.commentInput}
                            multiline={true}
                            placeholder="Add a comment..."
                            value={comment}
                            onChangeText={handleComment}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Add Review</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    comment: {
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 10,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 100,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cancelButton: {
        padding: 10,
        marginRight: 10,
    },
    addButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#418CFD',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ReviewModal;
