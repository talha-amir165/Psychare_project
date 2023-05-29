import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import UpcomingAppointments from '../Components/UpcomingAppointments';
import CompletedAppointments from '../Components/CompletedAppointments';
import { ScrollView, Image } from 'react-native';
import CanceledAppointments from '../Components/CanceledAppointments';
import appointmentService from '../services/AppointmentService';
import useFetch from '../Hooks/useFetch';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';



export default function AppointmentScreen({ navigation }) {
    const navigations = useNavigation();
    const handleMenuPress = () => {
        navigations.openDrawer();
    };
    const userData = useSelector(state => state.user.userData);

    const { data, loading, error, reFetch } = useFetch('https://backend-ir87-mdebvdafa-uzairghaffar1144.vercel.app/api/appointments/patient/' + userData?.id);

    const [activetab, setactivetab] = useState('Upcoming');
    const [fetchCount, setFetchCount] = useState(0);

    const [Appointment, setAppointment] = useState([]);

    useEffect(() => {

        if (data && !loading) {
            console.log(data);

            setAppointment(data);
        }

    }, [data, loading]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            reFetch();
        });

        return unsubscribe;
    }, [navigation, reFetch]);



    return (
        <View style={{ backgroundColor: '#F8F9FA', height: '100%' }}>
            <View style={{ marginTop: 50, flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 10, alignSelf: 'center' }} onPress={handleMenuPress} >
                    <Image source={require('../assets/menu.png')} />
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', marginLeft: 90, fontSize: 17 }}>
                    Appointments
                </Text>


            </View>

            <View style={{ marginTop: 40, flexDirection: 'row', marginBottom: 10 }}>
                <HeaderButton name='Upcoming' activeTab={activetab} setActiveTab={setactivetab} />
                <HeaderButton name='Completed' activeTab={activetab} setActiveTab={setactivetab} />
                <HeaderButton name='Canceled' activeTab={activetab} setActiveTab={setactivetab} />
            </View>
            <ScrollView>
                {loading ? <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 50 }}><ActivityIndicator size="large" color="skyblue" /></View> :
                    <View>
                        {activetab === 'Upcoming' && <UpcomingAppointments navigation={navigation} appointments={Appointment.filter(a => a.status === 'upcoming' || a.status === 'reschedule')} />}
                        {activetab === 'Completed' && <CompletedAppointments appointments={Appointment.filter(a => a.status === 'completed')} navigation={navigation} />}
                        {activetab === 'Canceled' && <CanceledAppointments appointments={Appointment.filter(a => a.status === 'canceled')} />}
                    </View>}
            </ScrollView>

        </View>


    )
}
const HeaderButton = (props) => {
    return (
        <TouchableOpacity style={{

            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 30,


            backgroundColor: 'white',
            marginLeft: 20
        }}
            onPress={() => {
                props.setActiveTab(props.name)

            }}
        >
            <Text style={{ color: props.activeTab == props.name ? "#418CFD" : "#CCCCCC", fontWeight: '600' }}>
                {props.name}
            </Text>
        </TouchableOpacity>
    )


}


