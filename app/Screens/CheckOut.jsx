import { View, Text, TouchableOpacity, Image, Button, Modal, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import AppointmentServices from '../services/AppointmentService'

import React, { useContext, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const CheckOut = ({ navigation, route }) => {
    const doc = route.params.doc;
    const Dateformat = route.params.Dateformat;
    const Type = route.params.Type;

    const SelectedDate = route.params.SelectedDate;
    const SelectedSlot = route.params.SelectedSlot;
    const PayemntMethod = route.params.isCardPayment;
    let maskedCardNumber;

    const cardNumber = route.params.cardNumber; // Example card number
    if (cardNumber != undefined) {
        maskedCardNumber = '************' + cardNumber.substring(12);
        console.log(maskedCardNumber);
    }

    // modal code 
    const [modalVisible, setModalVisible] = useState(false);
    const userData = useSelector(state => state.user.userData);

    const handleButtonPress = async () => {
        if (Type == 'onsite') {
            data = {
                patient_id: userData.id,
                psychologist_id: doc._id,
                datetime: {
                    time: SelectedSlot.start,
                    date: Dateformat,
                    day: SelectedDate.dayname
                },
                location: doc.onsiteAppointment.location,
                appointmenttype: Type,
                fee: doc.onsiteAppointment.fee

            }
        }
        else {
            data = {
                patient_id: userData.id,
                psychologist_id: doc._id,
                datetime: {
                    time: SelectedSlot.start,
                    date: Dateformat,
                    day: SelectedDate.dayname
                },
                appointmenttype: Type,
                fee: doc.onlineAppointment.fee

            }

        }
        console.log(data);
        AppointmentServices.addAppointment(data).then((data) => {
            console.log(data);


            setModalVisible(true);



        })
            .catch((err) => {
                console.log(err);
            });

    };

    const handleModalClose = () => {
        setModalVisible(false);
        navigation.navigate('AppointmentScreen');
    };



    return (
        <View>
            <View style={{ flexDirection: 'row', marginTop: 70 }}>
                <TouchableOpacity style={{ marginTop: -5, marginLeft: 5 }} onPress={() => {
                    navigation.goBack()
                }}>
                    <Image style={{}} source={require('../assets/Back.png')}></Image>
                </TouchableOpacity>
                <View style={{ marginLeft: 120 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', }}>CheckOut</Text>

                </View>

            </View>
            <View style={{ backgroundColor: 'white', borderRadius: 8, width: '90%', marginHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', marginHorizontal: 10 }}>Contact info</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>

                    <MaterialCommunityIcons name="email-outline" size={20} color="black" />


                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 10 }}>{userData.email}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>

                    <Feather name="phone" size={20} color="black" />

                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 7 }}>{userData.number ? userData.number : "not Added"}</Text>
                </View>
                <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: '500', fontSize: 16 }}>
                        Payment method
                    </Text>
                    {PayemntMethod == undefined &&
                        <View >
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Form', { checkoutScreen: true, SelectedDate, SelectedSlot, doc, Dateformat, Type })
                            }} style={{ marginVertical: 10, flexDirection: 'row' }}>
                                <Feather name="plus" size={25} color="royalblue" />
                                <Text style={{ marginHorizontal: 5 }}>Add a payement method</Text>
                            </TouchableOpacity>

                        </View>
                    }
                    {
                        PayemntMethod != undefined &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                {PayemntMethod == 'card' ?
                                    <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={require('../assets/card.png')}></Image> : null}
                                <Text style={{ alignSelf: 'center' }}>
                                    {PayemntMethod == 'card' ? 'Master Card' : 'Cash'}
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Form', { checkoutScreen: true, SelectedDate, SelectedSlot, doc, Dateformat, Type })
                            }}>
                                <AntDesign name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                    }
                    {
                        PayemntMethod == 'card' &&
                        <Text>
                            {maskedCardNumber}
                        </Text>
                    }

                </View>

            </View>
            <View style={{ backgroundColor: 'white', borderRadius: 8, width: '100%', marginVertical: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginLeft: 20, color: 'rgba(112, 123, 129, 1)', fontSize: 16, fontWeight: '600' }}>
                        Subtotal
                    </Text>
                    <Text style={{ marginRight: 20, fontSize: 16, fontWeight: '500' }}>
                        {/* PKR {doc.price} */} PKR {Type == 'onsite' ? doc.onsiteAppointment.fee : doc.onlineAppointment.fee}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                    <Text style={{ marginLeft: 20, color: 'rgba(112, 123, 129, 1)', fontSize: 16, fontWeight: '600' }}>
                        Extra charges
                    </Text>
                    <Text style={{ marginRight: 20, fontSize: 16, fontWeight: '500' }}>
                        PKR 0.00
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <Text style={{ marginLeft: 20, color: 'rgba(112, 123, 129, 1)', fontSize: 16, fontWeight: '600' }}>
                        Total cost
                    </Text>
                    <Text style={{ marginRight: 20, fontSize: 16, fontWeight: '500' }}>
                        PKR {Type == 'onsite' ? doc.onsiteAppointment.fee : doc.onlineAppointment.fee}
                    </Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: 'rgba(65, 140, 253, 1)', width: '70%', alignItems: 'center', borderRadius: 30, padding: 10 }} onPress={handleButtonPress}>
                        <Text style={{ color: 'white', fontSize: 18 }} >
                            Payement
                        </Text>

                    </TouchableOpacity>
                    <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={handleModalClose}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modal}>
                                <Image source={require('../assets/Modalpic.png')}></Image>
                                <View style={{ width: '70%', flexDirection: 'column', alignItems: 'center', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '500' }}> Appointment is </Text>
                                    <Text style={{ fontSize: 20, fontWeight: '500' }}> Booked </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={handleModalClose}
                                        style={{ width: '90%', backgroundColor: 'rgba(65, 140, 253, 1)', padding: 9, borderRadius: 25 }}
                                    >
                                        <Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }}>
                                            Back to Appointments
                                        </Text>


                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%'
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        width: '70%',
        justifyContent: 'center',
        flexDirection: 'column'
    },
});

export default CheckOut