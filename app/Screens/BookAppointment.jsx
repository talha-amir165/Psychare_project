import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

import ProfileHeader from '../Components/ProfileHeader';


const BookAppointment = ({ route, navigation }) => {


    function removeDrPrefix(name) {
        if (name.startsWith('Dr ')) {
            return name.substring(3).toUpperCase();
        } else if (name.startsWith('Dr. ')) {
            return name.substring(4).toUpperCase();
        } else {
            return name.toUpperCase();
        }
    }

    const [disabled, setdisabled] = useState(true);
    const isDisabled = SelectedDate == null || SelectedSlot == null;
    const doc = route.params.doc;
    console.log(doc);
    function getSlotsByDay(dayName) {
        if (Type == 'onsite') {
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



    const [SelectedDate, setSelectedDate] = useState(null);

    const [datesArray, setDatesArray] = useState([]);
    // Appointment type State
    const [Type, setType] = useState('onsite');


    //
    const [SelectedSlot, setSelectedSlot] = useState(null);
    // slot Array 
    const [slotsArray, setslotArray] = useState([])


    const [Dateformat, setDate] = useState('');
    // Dates Render Item
    const renderItem = ({ item }) => (
        <TouchableOpacity SelectedDate={SelectedDate} onPress={() => {

            setSelectedDate(item);

            if (SelectedSlot != null) {
                setdisabled(false);

            }
            else {
                setdisabled(true);
            }












        }}
            style={{ backgroundColor: SelectedDate === item ? 'rgba(65, 140, 253, 1)' : 'rgba(248, 249, 250, 1)', borderRadius: 16, padding: 10, marginHorizontal: 8 }}
        >
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: SelectedDate === item ? 'white' : 'rgba(112, 123, 129, 1)', fontWeight: '600', fontSize: 16 }}>{item.dayname}</Text>
                <Text style={{ color: SelectedDate === item ? 'white' : 'rgba(112, 123, 129, 1)', fontWeight: '600', fontSize: 16 }}>{item.day}</Text>
            </View>
        </TouchableOpacity>
    );
    // comparing time 
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


    // slots render item

    var formattedTime;
    var day;
    const renderSlot = ({ item }) => {
        if (!item.available) {
            return null; // skip rendering this item
        }
        if (SelectedDate.day == day) {
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
                    if (SelectedDate != null) {
                        setdisabled(false);
                        console.log('disabled in slot' + disabled);
                    } else {
                        setdisabled(true);
                        console.log('disabled in slot' + disabled);
                    }
                }}>
                <Text style={{ color: SelectedSlot === item ? 'white' : 'rgba(112, 123, 129, 1)', fontWeight: '600', fontSize: 16 }}>
                    {item.start}
                </Text>
            </TouchableOpacity>
        );
    };
    useEffect(() => {
        const getDatesArray = () => {

            const dates = [];

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const date = new Date();
            for (let i = 0; i < 7; i++) {
                const dayname = daysOfWeek[date.getDay()];
                if (dayname == 'Sunday') {

                    date.setDate(date.getDate() + 1);
                    continue;
                }
                const day = date.getDate();
                const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12
                const year = date.getFullYear();
                const index = i;
                dates.push({ dayname, day, month, year, index });
                date.setDate(date.getDate() + 1);
            }
            return dates;
        };
        const dates = getDatesArray();
        setDatesArray(dates);
        const date = new Date(); // current date and time
        const hours = date.getHours();
        const minutes = date.getMinutes();
        formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        day = date.getDay();
        console.log(day);
        if (route.params.type != null) {
            setType('online');
        }


    }, []);
    useEffect(() => {


        setslotArray(getSlotsByDay(SelectedDate?.dayname));
        setSelectedSlot(null);
        setdisabled(true);
        if (SelectedDate != null) {
            const dateformat = `${SelectedDate.year}-${SelectedDate.month.toString().padStart(2, '0')}-${SelectedDate.day.toString().padStart(2, '0')}`;

            setDate(dateformat);
            console.log(Dateformat);
        }
        console.log(SelectedDate)



    }, [SelectedDate, Dateformat, Type]);

    return (
        <ScrollView>
            <View style={{
                backgroundColor: '#F8F9FA', height: '100%', marginBottom: 20
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 70 }}>
                    <TouchableOpacity style={{ marginTop: -5 }} onPress={() => {
                        navigation.goBack()
                    }}>
                        <Image style={{}} source={require('../assets/Back.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Profile</Text>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => {
                        navigation.navigate('Start')
                    }}>
                        <Text style={{ color: '#5B9EE1' }}>Cancel</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ paddingBottom: 20, justifyContent: 'center', position: 'relative', marginTop: 5 }}>

                    <ProfileHeader pic={doc.pic} name={doc.user_id.name}></ProfileHeader>
                </View>
                <View style={{ backgroundColor: 'white', borderRadius: 30, height: '100%' }}>
                    <View style={{ marginHorizontal: 25 }}>
                        <Text style={{ fontSize: 24, fontWeight: '500', marginTop: 20, color: 'black' }}>
                            {doc.user_id.name}
                        </Text>
                        <Text style={{ fontSize: 13, color: 'rgba(61, 65, 70, 0.7)', marginTop: 4 }}>
                            Monday to Saturday
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 7, color: 'black' }}>
                            Appointment Type
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <HeaderButton name='onsite' activeTab={Type} setActiveTab={setType} />
                            <HeaderButton name='online' activeTab={Type} setActiveTab={setType} />
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 7, color: 'black' }}>
                            Date
                        </Text>
                        <FlatList
                            data={datesArray}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.index.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}



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
                        <Text style={{ color: 'rgba(112, 123, 129, 1)', fontSize: 16, marginVertical: 20, }}>
                            Price
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                PKR {Type == 'onsite' ? doc.onsiteAppointment.fee : doc.onlineAppointment.fee}

                            </Text>

                            <TouchableOpacity disabled={disabled} onPress={() => {
                                console.log('doc:', doc); // log the value of doc
                                console.log('SelectedDate:', SelectedDate); // log the value of SelectedDate
                                console.log('SelectedSlot:', SelectedSlot);
                                if (doc && SelectedDate && SelectedSlot) { // add a check to ensure that the objects are not null or undefined
                                    navigation.navigate('Checkout', { doc, SelectedDate, SelectedSlot, Dateformat, Type })
                                }
                            }}
                                styl style={{ backgroundColor: disabled ? 'rgb(113, 121, 126)' : 'rgba(65, 140, 253, 1)', borderRadius: 20, width: 120, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white' }}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default BookAppointment