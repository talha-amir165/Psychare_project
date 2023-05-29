import { View, Text, TouchableOpacity, Button, Image, ImageBackground, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
// import { AntDesign } from '@expo/vector-icons';
import ProfileHeader from '../Components/ProfileHeader';
import Reviews from '../Components/Reviews';
import StarRating from '../Components/StarRating';
import reviewService from '../services/ReviewService';


const Doctor = ({ route, navigation }) => {
    const [reviewArray, setreviewArray] = useState([]);
    doc = route.params.item;
    console.log(doc);
    useEffect(() => {
        reviewService.getpsychologistreviews(doc._id).then(response => {
            setreviewArray(response);
            console.log(response);

        })
    }, [])



    function removeDrPrefix(name) {
        if (name.startsWith('Dr ')) {
            return name.substring(3).toUpperCase();
        } else if (name.startsWith('Dr. ')) {
            return name.substring(4).toUpperCase();
        } else {
            return name.toUpperCase();
        }
    }
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(prev => !prev);
    }



    return (


        <View style={{
            backgroundColor: '#F8F9FA', height: '100%'
        }}>
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 70 }}>
                    <Text style={{ fontSize: 16 }}>Profile</Text>

                </View>
                <View style={{ paddingBottom: 20, justifyContent: 'center' }}>

                    <ProfileHeader name={doc.user_id.name} pic={doc.pic}></ProfileHeader>
                </View>
                <View style={{ backgroundColor: 'white', borderRadius: 30 }}>
                    <View style={{ marginHorizontal: 25 }}>
                        <Text style={{ fontSize: 24, fontWeight: '500', marginTop: 20 }}>
                            {doc.user_id.name}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'rgba(61, 65, 70, 0.7)', fontSize: 13, marginTop: 5 }}>
                                Psycologist
                            </Text>
                            <Text style={{ marginTop: 5, color: 'rgba(65, 140, 253, 1)', fontSize: 14, fontWeight: '500' }}>
                                {doc.onsiteAppointment.practicelocation}
                            </Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 6 }}>
                            {/* <AntDesign name="staro" size={14} color="black" style={{ marginRight: 5 }} /> */}

                            {/* rating fetch and display */}
                            <Text style={{ fontSize: 11, fontWeight: '600' }}>
                                {doc.rating}
                            </Text>

                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'rgba(65, 140, 253, 1)' }}>
                                90% Good Reviews
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'rgba(65, 140, 253, 1)', marginTop: 4 }}>
                                {doc.experience} Experience
                            </Text>
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'rgba(65, 140, 253, 1)', marginTop: 4 }}>
                            Specialization {doc.specialization}
                        </Text>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                About
                            </Text>
                            <Text style={{ color: 'rgba(61, 65, 70, 0.7)', fontSize: 14, fontWeight: '300' }}>
                                {doc.user_id.name} is an excellent doctor who is well-regarded by her patients. Her expertise, compassion, and dedication to her profession make her a trusted healthcare provider.
                            </Text>

                        </View>
                        <Reviews reviews={reviewArray} />





                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <TouchableOpacity style={{ backgroundColor: ' rgba(65, 140, 253, 0.05)', marginHorizontal: 5, padding: 20, borderRadius: 32 }} onPress={() => navigation.navigate('BookAppointment', { doc, type: 'online' })}>
                                <Text style={{ color: 'black' }}>
                                    Online Consulation
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#418CFD', marginHorizontal: 5, padding: 20, borderRadius: 32 }} onPress={() => navigation.navigate('BookAppointment', { doc })}>
                                <Text style={{ color: 'white' }}>
                                    Book Appointment
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </ScrollView>
        </View>


    )
}
// Doctor.navigationOptions = {
//     headerTitle: 'Doctor',
//     headerLeft: () => null,
// };

export default Doctor