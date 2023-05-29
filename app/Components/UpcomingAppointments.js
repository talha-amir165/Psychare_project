import { Text, View, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

import { formatDate } from '../Hooks/formatDate';



export default function UpcomingAppointments({ navigation, route, appointments }) {



    return (
        <ScrollView>
            <View style={{ marginVertical: 20 }}>

                <Text style={{ marginBottom: 10, fontSize: 18, marginHorizontal: 15, fontWeight: '500', color: 'black' }}>
                    Upcoming Appointments
                </Text>


                {/* {
                    AppointmentWeek.map((item, index) => (


                        <View key={item.id}
                            style={styles.weekAppointment}
                        >
                            <Image source={item.pic}
                                style={styles.pic}
                            />
                            <View style={{ flexDirection: 'column', marginLeft: 5 }}>
                                <Text style={styles.nextLocation}>
                                    {item.Location}
                                </Text>
                                <Text style={{ fontSize: 20, color: '#FAFAFA', marginTop: 5, marginBottom: 5 }}>
                                    {item.Drname}
                                </Text>
                                <Text style={{ fontSize: 10, fontWeight: '500', color: 'rgba(250, 250, 250, 0.6)' }}>
                                    Friday,Saturday :04:00 PM to  9:00 PM
                                </Text>

                            </View>



                        </View>



                    ))
                } */}

                {appointments &&
                    appointments.map((item) => (
                        <TouchableOpacity key={item._id} onPress={() => { navigation.navigate('AppointmentDetails', { item }) }}>
                            <View style={[styles.nextweek]}>
                                {item.pic &&
                                    <Image source={item.pic} style={styles.pic} />}
                                <View style={{ flexDirection: 'column', marginLeft: 5 }}>
                                    {item.location &&

                                        <Text style={styles.location}>
                                            {item.Location}
                                        </Text>}
                                    <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 5, color: 'black' }}>
                                        {item.psychologist_id.user_id.name}
                                    </Text>
                                    <Text style={{ fontSize: 12, fontWeight: '600', color: 'rgba(61, 65, 70, 0.6)' }}>
                                        date:  {formatDate(item.datetime.date)}  time : {item.datetime.time}

                                    </Text>
                                    <Text style={{ color: 'rgba(65, 140, 253, 1)', marginTop: 6 }}>
                                        {item.status}
                                    </Text>

                                </View>



                            </View>
                        </TouchableOpacity>

                    ))
                }






            </View>




        </ScrollView >


    )
}
const styles = StyleSheet.create({
    lastitem: {
        marginBottom: 70
    },
    weekAppointment: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%', height: 120, borderRadius: 16, marginHorizontal: 15, marginVertical: 7,
        backgroundColor: 'rgb(0, 128, 255)'
    },
    pic: {
        height: 94,
        width: 94,
        borderRadius: 50,
        marginRight: 15,
        marginLeft: 10

    },
    nextLocation: {
        color: 'rgba(250, 250, 250, 0.4)',
        fontSize: 14,
        fontWeight: '400'
    },
    location: {
        color: ' rgba(91, 158, 225, 1)',
        fontSize: 14,
        fontWeight: '600'
    },
    nextweek: {
        flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 1)', width: '90%', marginVertical: 7,
        borderRadius: 16, marginHorizontal: 15, height: 150, alignItems: 'center'
    }
})


