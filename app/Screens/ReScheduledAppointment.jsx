import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Image, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { RadioButton } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import appointmentService from '../services/AppointmentService';
import useFetch from '../Hooks/useFetch';
import { formatTimes } from '../Hooks/formatTime';
const ReScheduledAppointment = ({ navigation, route }) => {
    const [slotsArray, setslotArray] = useState([])
    const AppointmentDetails = route.params.Details;
    const { data, loading, error } = useFetch('http://13.53.188.158:4000/api/users/psychologists/' + AppointmentDetails.psychologist_id._id);
    console.log(AppointmentDetails);
    const [appointmentType, setappointmentType] = useState(AppointmentDetails.appointmenttype);



    const [SelectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState(AppointmentDetails.datetime.date);

    const [reason, setreason] = useState('');
    const currentDate = moment().format("YYYY-MM-DD");
    const maxDate = moment(currentDate).add(7, 'days').format('YYYY-MM-DD');
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [dayname, setDayname] = useState(null);
    const [doc, setDoc] = useState(null);

    const handleButtonPress = () => {
        appointmentService.updateAppointment(AppointmentDetails._id, {
            datetime: {
                time: SelectedSlot.start,
                day: dayname,
                date: selectedDate
            },
            reschedule_reason: reason,
            status: 'reschedule'
        }).then((data) => {
            console.log(data)
            setModalVisible(true);
        })
            .catch((err) => {
                console.log(err);
            })
    };
    const onDateSelect = (date) => {
        setSelectedDate(date.dateString);

        setDayname(moment(date.dateString).format('dddd'));

    };
    function getSlotsByDay(dayName) {
        if (appointmentType == 'onsite') {
            if (dayName != null) {
                const scheduleDay = doc.onsiteAppointment.schedule.find(day => day.day.toLowerCase().includes(dayName.toLowerCase()));
                return scheduleDay ? scheduleDay.slots : [];
            }
        }
        else {
            if (dayName != null) {
                const scheduleDay = doc.onlineAppointment.schedule.find(day => day.day.toLowerCase().includes(dayName.toLowerCase()));
                return scheduleDay ? scheduleDay.slots : [];
            }

        }
    }
    // appointment type
    const HeaderButton = (props) => {
        return (
            <TouchableOpacity style={{

                paddingVertical: 8,

                borderRadius: 30,


                backgroundColor: 'rgba(248, 249, 250, 1)',
                justifyContent: 'center',
                width: '25%',
                alignItems: 'center'
            }}
                onPress={() => {
                    props.setActiveTab(props.name)

                }}
            >
                <Text style={{ color: props.activeTab == props.name ? "#418CFD" : "#CCCCCC", fontWeight: '600', fontSize: 18, }}>
                    {props.name}
                </Text>
            </TouchableOpacity>
        )


    }
    var formattedTime;
    var day;
    const renderSlot = ({ item }) => {
        if (!item.available) {
            return null; // skip rendering this item
        }
        if (dayname == day) {
            if (compareTwoTime(item.start, formattedTime) === -1) {

                return null;
            }
        }

        return (
            <TouchableOpacity
                SelectedSlot={SelectedSlot}
                style={{
                    backgroundColor: SelectedSlot === item ? 'rgba(65, 140, 253, 1)' : 'rgba(248, 249, 250, 1)',
                    borderRadius: 30,
                    padding: 10,
                    marginHorizontal: 8,
                }}
                onPress={() => {
                    setSelectedSlot(item);
                    // if (selectedDate != null) {
                    //     setdisabled(false);
                    //     console.log('disabled in slot' + disabled);
                    // } else {
                    //     setdisabled(true);
                    //     console.log('disabled in slot' + disabled);
                    // }
                }}>
                <Text style={{ color: SelectedSlot === item ? 'white' : 'rgba(112, 123, 129, 1)', fontWeight: '600', fontSize: 16 }}>
                    {item.start}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderArrow = (direction) => {
        const arrowColor = direction === "left" ? "#418CFD" : "#418CFD"; // Specify the color for the arrows
        return (
            <Text
                style={{ color: arrowColor }}
            >
                {direction === "left" ? "<" : ">"}
            </Text>
        );
    };



    useEffect(() => {

        if (data && !loading) {


            setDoc(data);

        }
        console.log(selectedDate)


    }, [data, loading]);
    function compareTwoTime(time1, time2) {
        const [hours1, minutes1] = time1.split(':');
        const [hours2, minutes2] = time2.split(':');

        if (parseInt(hours1) < parseInt(hours2)) {
            return -1;
        } else if (parseInt(hours1) > parseInt(hours2)) {
            return 1;
        } else if (parseInt(minutes1) < parseInt(minutes2)) {
            return -1;
        } else if (parseInt(minutes1) > parseInt(minutes2)) {
            return 1;
        } else {
            return -1; // equal to time also returns -1
        }
    }

    useEffect(() => {

        if (dayname != null) {

            setslotArray(getSlotsByDay(dayname));
            setSelectedSlot(null);

        }


    }, [appointmentType, selectedDate]);
    useEffect(() => {
        const date = new Date(); // current date and time
        const hours = date.getHours();
        const minutes = date.getMinutes();
        formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        day = date.getDay();
        console.log(day);
    }, [])




    return (


        <View style={styles.calendarContainer}>

            <View style={{ marginHorizontal: 10, marginVertical: 50 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginTop: -5 }} onPress={() => {
                        navigation.goBack()
                    }}>
                        <Image style={{}} source={require('../assets/Back.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 50, fontWeight: 'bold', color: 'black' }}>ReScheduledAppointment</Text>
                </View>

                <ScrollView>
                    {loading ? <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 50 }}><ActivityIndicator size="large" color="skyblue" /></View> : <View style={{ marginHorizontal: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 7, color: 'black' }}>
                            Appointment Type
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <HeaderButton name='onsite' activeTab={appointmentType} setActiveTab={setappointmentType} />
                            <HeaderButton name='online' activeTab={appointmentType} setActiveTab={setappointmentType} />
                        </View>

                        <Text style={{ fontWeight: '600', fontSize: 18, marginTop: 10, color: 'black' }}>
                            Select Date
                        </Text>

                        <Calendar
                            onDayPress={onDateSelect} // Callback function for handling date selection
                            markedDates={{ [selectedDate]: { selected: true, selectedColor: '#418CFD' } }}
                            minDate={currentDate}
                            maxDate={maxDate}
                            renderArrow={renderArrow}


                            theme={{
                                calendarBackground: '#F8F9FA',


                            }}
                            style={{ marginTop: 20 }}


                        />

                        <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 8, color: 'black' }}>
                            Time Slot
                        </Text>
                        <FlatList
                            data={slotsArray}
                            renderItem={renderSlot}

                            horizontal={true}
                            showsHorizontalScrollIndicator={false}



                        />
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                                Reason for Schedule Change
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="Clash"
                                    status={reason === 'Clash' ? 'checked' : 'unchecked'}
                                    onPress={() => setreason('Clash')}
                                    color='#418CFD'
                                />
                                <Text style={styles.reasonText}>i have schedule clash</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="not available"
                                    status={reason === 'not available' ? 'checked' : 'unchecked'}
                                    onPress={() => setreason('not available')}
                                    color='#418CFD'
                                />
                                <Text style={styles.reasonText}>i am not available </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="can't tell"
                                    status={reason === "can't tell" ? 'checked' : 'unchecked'}
                                    onPress={() => setreason("can't tell")}
                                    color='#418CFD'
                                />
                                <Text style={styles.reasonText}>i am don't want to tell</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="Other reason"
                                status={reason === "Other reason" ? 'checked' : 'unchecked'}
                                onPress={() => setreason("Other reason")}
                                color='#418CFD'
                            />
                            <Text style={styles.reasonText}>Other Reason</Text>
                        </View>

                        {reason === "Other reason" && <TextInput
                            value={text}
                            onChangeText={(value) => setText(value)}
                            style={{ backgroundColor: 'white', borderRadius: 10, marginVertical: 5 }}
                            multiline={true}
                            numberOfLines={5}
                            placeholder="Enter your reason here"
                        />}
                        <View style={{ marginTop: 15, alignItems: 'center', marginBottom: 70 }}>
                            <TouchableOpacity style={{ backgroundColor: 'rgba(65, 140, 253, 1)', width: '90%', alignItems: 'center', borderRadius: 30, padding: 10 }} onPress={handleButtonPress}>
                                <Text style={{ color: 'white', fontSize: 18 }} >
                                    Confirm
                                </Text>

                            </TouchableOpacity>
                            <Modal visible={modalVisible} transparent={true} animationType="fade" >

                                <View style={styles.modalContainer}>

                                    <View style={styles.modal}>
                                        <EvilIcons name="close-o" size={28} color="black" style={{ marginLeft: 210 }} />
                                        <Image source={require('../assets/re.png')}></Image>
                                        <View style={{ width: '70%', flexDirection: 'column', alignItems: 'center', marginVertical: 10 }}>
                                            <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}> Appointment  </Text>
                                            <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}> Rescheduled </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalVisible(false)
                                                    navigation.navigate("AppointmentScreen")
                                                }}
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
                    </View>}
                </ScrollView>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    calendarContainer: {


        backgroundColor: '#F8F9FA'
        // Set the background color of the calendar container
    },
    calendar: {
        // Set the background color of the calendar component
    },
    reasonText: {
        fontSize: 13,
        fontWeight: 500,
        color: 'black'
    }, modalContainer: {
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

export default ReScheduledAppointment