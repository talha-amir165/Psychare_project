import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from './StarRating';



const Reviews = ({ reviews }) => {
    const renderReview = (review) => {
        return (
            <View key={review._id} style={styles.review}>

                <View style={styles.commentContainer}>
                    <Text style={styles.user}>Patient</Text>
                    <View style={styles.ratingContainer}>
                        <StarRating defaultRating={review.rating} size={16} disabled={true} />
                    </View>
                    <Text style={styles.comment}>{review.comment}</Text>
                </View>

            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Reviews</Text>
            {reviews.slice(0, 3).map(renderReview)}
            <Text style={styles.seeAll}>See All Reviews</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 6,

        borderRadius: 10,

    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    review: {

        marginVertical: 5,
    },
    ratingContainer: {
        marginRight: 10,
    },
    commentContainer: {
        flex: 1,
    },
    user: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    comment: {
        color: '#666',
    },
    seeAll: {
        color: '#007AFF',
        alignSelf: 'flex-end',
        marginTop: 10,
    },
});

export default Reviews;
