import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
// import { MaterialIcons } from '@expo/vector-icons';
// import { Octicons } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../Hooks/formatDate';
import { formatTimes } from '../Hooks/formatTime';
import appointmentService from '../services/AppointmentService';
import ProfileHeader from '../Components/ProfileHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from '../Components/StarRating';
import reviewService from '../services/ReviewService';
import Icon1 from 'react-native-vector-icons/Entypo';
import VideoConferencePage from './VideoConferencePage';



const AppointmentDetails = ({ route, navigation }) => {
    const userData = useSelector(state => state.user.userData);
    const Details = route.params.item;


    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [review, setreview] = useState(true);
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
            comment: comment,
            patientname: userData.name
        }).then(response => {
            console.log("response of review" + JSON.stringify(response));

            setRating(0);
            setComment('');
            setReviewModal(false);
            setreview(false);
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
            status: 'canceled'
        })
            .then((data) => {
                console.log(data);
                setModalVisible(false);
                navigation.navigate('AppointmentScreen')

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
                            <Text style={[styles.subtotalText, styles.BlackText]}>Are  you sure to cancel this appointment</Text>

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
                            <Text style={[styles.label, styles.BlackText]}>Rating:</Text>
                            <StarRating defaultRating={rating} size={30} onRated={handleRating} />
                        </View>
                        <View style={styles.comment}>
                            <Text style={[styles.label, styles.BlackText]}>Comment:</Text>
                            <TextInput
                                style={[styles.commentInput, styles.BlackText]}
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
    const getCurrentDateTime = () => {
        const currentDateTime = new Date();
        const currentDate = currentDateTime.toISOString().split('T')[0];
        const currentTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return { currentDate, currentTime };
    };
    const [isEnabled, setEnabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const [dayName, setDayName] = useState(null);
    useEffect(() => {
        const { currentDate, currentTime } = getCurrentDateTime();
        const appointmentDateTime = `${Details.datetime.date} ${Details.datetime.time}`;
        const currentDateTime = `${currentDate} ${currentTime}`;

        if (currentDateTime >= appointmentDateTime) {
            setEnabled(true);
        } else {
            const remainingTime = calculateRemainingTime(currentDateTime, appointmentDateTime);

            setRemainingTime(remainingTime);
            setDayName(Details.datetime.day);
            setTimeout(() => {
                setEnabled(true);
            }, remainingTime);
        }
    }, []);
    const calculateRemainingTime = (currentDateTime, appointmentDateTime) => {
        const currentTimestamp = new Date(currentDateTime).getTime();
        const appointmentTimestamp = new Date(appointmentDateTime).getTime();
        const remainingTime = appointmentTimestamp - currentTimestamp;
        return remainingTime;
    };
    const formatTime = (milliseconds) => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
    };

    const handleVideoCall = () => {
        if (isEnabled) {
            // Handle video call functionality
            navigation.navigate('Call', { Details })
        } else if (remainingTime) {
            const formattedTime = formatTime(remainingTime);
            Alert.alert('Video Call Disabled', `You can join the video call in ${formattedTime}`);
        } else if (dayName) {
            Alert.alert('Video Call Disabled', `The video call is scheduled for ${dayName}`);
        }
    };




    return (
        <View style={{ flexDirection: 'column', backgroundColor: '#F8F9FA', height: '100%', }}>

            <View style={[Details.status != 'completed' ? styles.appointmentText : styles.appointmentCompleted, { marginTop: 50, marginHorizontal: 6, }]}>
                <TouchableOpacity style={{ marginTop: -5 }} onPress={() => {
                    navigation.goBack()
                }}>
                    <Image style={{}} source={require('../assets/Back.png')}></Image>
                </TouchableOpacity>
                <Text style={[Details.status != 'completed' ? styles.appointment : styles.appCompleted, styles.BlackText]}>My Appointment</Text>

                {Details.status != 'completed' && <TouchableOpacity onPress={handleMenuPress}>
                    <Icon1 name="dots-three-vertical" size={24} color="black" />
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
                                <Text style={styles.BlackText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.option} onPress={() => {
                                navigation.navigate("Rescheduled", { Details })
                                setModalVisible(false)
                            }}>
                                <Text style={styles.BlackText}>
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

                    <Text style={{ marginTop: 15, fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                        Appointment Details
                    </Text>

                    <View style={{ marginVertical: 15, marginHorizontal: 10, paddingBottom: 100 }}>


                        <Text style={[styles.heading, styles.BlackText]}>
                            Patient Name
                        </Text>
                        <Text style={[styles.textStyle, styles.BlackText]}>
                            {userData.name}
                        </Text>
                        <Text style={[styles.heading, styles.BlackText]}>
                            Date
                        </Text>
                        <Text style={[styles.textStyle, styles.BlackText]}>
                            {formatDate(Details.datetime.date)}
                        </Text>
                        <Text style={[styles.heading, styles.BlackText]}>
                            Timing
                        </Text>
                        <Text style={[styles.textStyle, styles.BlackText]}>
                            {formatTimes(Details.datetime.time)}
                        </Text>

                        <Text style={[styles.heading, styles.BlackText]}>
                            Appointment Type
                        </Text>
                        <Text style={[styles.textStyle, styles.BlackText]}>
                            {Details.appointmenttype == 'online' ? "Online Appointment" : "OnSite Appointment"}
                        </Text>
                        <Text style={[styles.heading, styles.BlackText]}>
                            Status
                        </Text>
                        <Text style={styles.BlackText}>
                            {Details.status}
                        </Text>


                        <Text style={[styles.heading, styles.BlackText]}>
                            Fees
                        </Text>
                        <Text style={[styles.textStyle, styles.BlackText]}>
                            PKR  {Details.fee}
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("Records", { Details })

                            }}
                                style={{ marginTop: 10, backgroundColor: ' rgba(65, 140, 253, 0.05)', marginHorizontal: 5, padding: 25, borderRadius: 15 }}
                            >
                                <Image source={require('../assets/medical-report.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }}></Image>
                                <Text style={styles.BlackText}>
                                    Report
                                </Text>
                            </TouchableOpacity>

                            {Details.status == 'completed' && Details.reviewed == false && <TouchableOpacity
                                style={styles.addButton}
                                onPress={handleAddReview}
                            >
                                <Text style={styles.buttonText1}>Add Review</Text>
                                {/* <MaterialIcons name="add-circle-outline" size={24} color="white" /> */}
                            </TouchableOpacity>}

                            {Details.status == 'upcoming' && review && <TouchableOpacity
                                style={{ marginTop: 40, marginLeft: 50, }}
                                onPress={handleVideoCall}>
                                <Icon name="video-camera" size={30} color="skyblue" />
                                <Text style={{ color: 'skyblue' }}>
                                    Video Call
                                </Text>
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
    BlackText: {
        color: 'black'
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