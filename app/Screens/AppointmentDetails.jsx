import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { formatDate } from '../Hooks/formatDate';
import { formatTime } from '../Hooks/formatTime';
import appointmentService from '../services/AppointmentService';
import ProfileHeader from '../Components/ProfileHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from '../Components/StarRating';
import reviewService from '../services/ReviewService';



const AppointmentDetails = ({ route, navigation }) => {
    const userData = useSelector(state => state.user.userData);
    const Details = route.params.item;
    console.log(Details)

    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const handleAddReview = () => {
        setReviewModal(true);
    }

    const handleRating = (newRating) => {
        setRating(newRating);
    };

    const handleComment = (text) => {
        setComment(text);
    };

    const handleReview = () => {
        reviewService.addReview(Details._id, {
            rating: rating,
            comment: comment
        }).then(response => {
            console.log("response of review" + JSON.stringify(response));

            setRating(0);
            setComment('');
            setReviewModal(false);
        }).catch(err => console.log(err))


    };
    const onClose = () => {
        setReviewModal(false);

    }


    const handleMenuPress = () => {
        setVisible(true);
    };
    const cancelButton = () => {
        appointmentService.updateAppointment(Details._id, {
            status: 'cancel'
        })
            .then((data) => {
                console.log(data);
                setModalVisible(false);

            })
            .catch((err) => {
                console.log(err);

            });


    };



    // Clever Programmer Uber eats
    const checkoutModalContent = () => {
        return (
            <>

                <View style={styles.modalContainer}>
                    <View style={styles.modalCheckoutContainer}>
                        <Text style={styles.CancelAppointment}>Cancel Appointment</Text>

                        <View style={styles.subtotalContainer}>
                            <Text style={styles.subtotalText}>Are  you sure to cancel this appointment</Text>

                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 50 }}>
                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    backgroundColor: "rgba(65, 140, 253, 0.05)",
                                    alignItems: "center",
                                    padding: 13,
                                    borderRadius: 30,
                                    marginHorizontal: 10,

                                    position: "relative",
                                    width: '40%'
                                }}
                                onPress={() => {

                                    setModalVisible(false);
                                }}
                            >
                                <Text style={{ color: "#418CFD", fontSize: 16 }}>Back</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    backgroundColor: "rgba(65, 140, 253, 1)",
                                    alignItems: "center",
                                    padding: 13,
                                    borderRadius: 30,
                                    marginHorizontal: 10,

                                    position: "relative",
                                    width: '40%'
                                }}
                                onPress={cancelButton}
                            >
                                <Text style={{ color: "white", fontSize: 16 }}>Yes Cancel</Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

            </>
        );
    };
    const ReviewModal = () => {

        return (
            <Modal visible={reviewModal} animationType="slide" transparent={true}>
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
                            <TouchableOpacity style={styles.addButton} onPress={onClose}>
                                <Text style={{ color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addButton} onPress={handleReview}>
                                <Text style={styles.buttonText}>Add Review</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };



    return (
        <View style={{ marginTop: 70, marginHorizontal: 6, height: '100%', flexDirection: 'column' }}>

            <View style={Details.status != 'completed' ? styles.appointmentText : styles.appointmentCompleted}>
                <TouchableOpacity style={{ marginTop: -5 }} onPress={() => {
                    navigation.goBack()
                }}>
                    <Image style={{}} source={require('../assets/Back.png')}></Image>
                </TouchableOpacity>
                <Text style={Details.status != 'completed' ? styles.appointment : styles.appCompleted}>My Appointment</Text>

                {Details.status != 'completed' && <TouchableOpacity onPress={handleMenuPress}>
                    <Entypo name="dots-three-vertical" size={24} color="black" />
                </TouchableOpacity>}
                <Modal transparent visible={visible} >
                    <View >
                        <View style={styles.popup}>
                            <TouchableOpacity
                                style={styles.option}
                                onPress={() => {
                                    setModalVisible(true)
                                    setVisible(false)
                                }}
                            >
                                <Text>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.option} onPress={() => {
                                navigation.navigate("Rescheduled", { Details })
                                setModalVisible(false)
                            }}>
                                <Text>
                                    ReScheduled
                                </Text>


                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>


            </View>

            <ProfileHeader pic={Details.pic} name={Details.psychologist_id.user_id.name}></ProfileHeader>
            <ScrollView>

                <View style={{ marginHorizontal: 14 }}>

                    <Text style={{ marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>
                        Appointment Details
                    </Text>

                    <View style={{ marginVertical: 15, marginHorizontal: 10, paddingBottom: 100 }}>


                        <Text style={styles.heading}>
                            Patient Name
                        </Text>
                        <Text style={styles.textStyle}>
                            {userData.name}
                        </Text>
                        <Text style={styles.heading}>
                            Date
                        </Text>
                        <Text style={styles.textStyle}>
                            {formatDate(Details.datetime.date)}
                        </Text>
                        <Text style={styles.heading}>
                            Timing
                        </Text>
                        <Text style={styles.textStyle}>
                            {formatTime(Details.datetime.time)}
                        </Text>

                        <Text style={styles.heading}>
                            Appointment Detail
                        </Text>
                        <Text style={styles.textStyle}>
                            {Details.appointmenttype == 'online' ? "online" : ` ${Details.location}`}
                        </Text>
                        <Text style={styles.heading}>
                            Status
                        </Text>
                        <Text>
                            {Details.status}
                        </Text>


                        <Text style={styles.heading}>
                            Fees
                        </Text>
                        <Text style={styles.textStyle}>
                            PKR  {Details.fee}
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("Records", { Details })

                            }}
                                style={{ marginTop: 10, backgroundColor: ' rgba(65, 140, 253, 0.05)', marginHorizontal: 5, padding: 25, borderRadius: 15 }}
                            >
                                <Image source={require('../assets/medical-report.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }}></Image>
                                <Text>
                                    Report
                                </Text>
                            </TouchableOpacity>

                            {Details.reviewed == false && <TouchableOpacity
                                style={styles.addButton}
                                onPress={handleAddReview}
                            >
                                <Text style={styles.buttonText1}>Add Review</Text>
                                <MaterialIcons name="add-circle-outline" size={24} color="white" />
                            </TouchableOpacity>}




                        </View>


                    </View>



                    {ReviewModal()}


                </View>
            </ScrollView>


            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                {checkoutModalContent()}
            </Modal>



        </View>
    )
}
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 14,
        marginVertical: 8
    },
    appointmentText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    appointmentCompleted: {
        flexDirection: 'row',

    },
    appointment: {
        fontSize: 16, fontWeight: '600'
    },
    appCompleted: {
        fontSize: 16, fontWeight: '600',
        marginLeft: 50
    },
    button: {
        backgroundColor: 'rgba(65, 140, 253, 1)',
        borderRadius: 20,
        marginTop: 7,
        padding: 10,
        width: '35%',
        flexDirection: 'row',

    },
    icon: {
        marginLeft: 6
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10
    },
    heading: {
        fontSize: 16,
        fontWeight: '600'
    },
    popup: {
        borderRadius: 8,
        borderColor: '#333',
        borderWidth: 1,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 70,
        right: 10

    },
    option: {
        paddingVertical: 7,
        borderBottomColor: '#ccc'

    },

    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.7)",
        flexDirection: 'column'

    },

    modalCheckoutContainer: {
        backgroundColor: "white",
        padding: 16,
        height: 400,
        borderWidth: 1,
        borderRadius: 20,

    },

    CancelAppointment: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 20,
        marginBottom: 10,
        color: 'red',
        marginTop: 20
    },

    subtotalContainer: {

        marginTop: 35,
        alignContent: 'center',
        alignItems: 'center'
    },

    subtotalText: {

        fontWeight: "600",
        fontSize: 17,
        marginBottom: 10,

    }, container: {
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
    addButton: {
        backgroundColor: '#418CFD',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 3,

        marginTop: 20,
    },
    buttonText1: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 10,
    },

})
export default AppointmentDetails