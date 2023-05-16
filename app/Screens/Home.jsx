import React, { useState, useContext } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
// import { EvilIcons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
const Doctors = [

    { id: '3', Drname: 'Dr Laiba', Location: 'Sheikh Zahid Hospital', rating: '4.8', pic: require("../assets/anampic.png"), experience: '7 Years', price: 4000, timeStart: '4 pm', timeEnd: '9 pm' },

    { id: '2', Drname: 'Dr Oreed', Location: 'Doctor Hospital', rating: '4.8', pic: require('../assets/maledoc.png'), experience: '4 Years', price: 5000, timeStart: '4 pm', timeEnd: '9 pm' },




];




export default function Home({ navigation }) {
    const navigations = useNavigation();
    const handleMenuPress = () => {
        navigations.openDrawer();
    };

    const userData = useSelector(state => state.user.userData);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('Doctor', { item });
            }} >
                <View style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
                    marginTop: 20, borderRadius: 16, width: 165, height: 188, marginHorizontal: 15
                }}>
                    <Image style={{ width: 80, height: 80, borderRadius: 50 }} source={item.pic}></Image>

                    <Text style={styles.cardname}>
                        {item.Drname}
                    </Text>

                    <Text style={styles.small}>
                        psycologist
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 4 }}>
                        {/* <AntDesign name="staro" size={12} color="black" style={{ marginTop: 4, marginRight: 3 }} /> */}
                        {/* rating fetch and display */}
                        <Text style={{ fontSize: 11, }}>
                            {item.rating}
                        </Text>
                        <Text style={{ fontSize: 11, marginLeft: 4 }}>120+ reviews</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    return (

        <View style={{
            backgroundColor: '#F8F9FA', height: '100%'
        }}>
            <Image source={require("../assets/LoginShape.png")} style={{ position: 'absolute', left: 150, zIndex: -1, height: 300 }}></Image>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity style={styles.hammenu} onPress={handleMenuPress} >
                    <Image source={require("../assets/menu.png")} >

                    </Image>
                </TouchableOpacity>
                <View style={styles.piccontain}>
                    <Image source={require("../assets/blankPic.png")} style={styles.profile}></Image>
                    <Text>
                        {userData?.name}
                    </Text>

                </View>
            </View>
            <View style={{ display: 'flex', alignItems: 'center', marginTop: 60, marginLeft: -50, flexDirection: 'row', justifyContent: "center" }}>
                {/* <EvilIcons name="search" size={24} color="black" style={{ paddingRight: 20 }} /> */}
                <TextInput placeholder='Search for doctors' style={styles.search}></TextInput>
            </View>
            <Text style={styles.text20}>
                Booked Appointments
            </Text>
            <View style={{ marginTop: 50, marginLeft: 20, backgroundColor: '#418CFD', borderRadius: 16, padding: 20, width: "90%" }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image style={styles.pic} source={require("../assets/doc.png")}>

                    </Image>
                    <Text style={styles.docname}>
                        Dr Mubashir
                    </Text>
                    <TouchableOpacity style={{ marginLeft: 50, marginTop: 45, width: 20 }}>
                        <Image source={require("../assets/Vector.png")} style={{ width: 12 }}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', top: 75, left: 130 }}>
                    <Text style={{ fontSize: 14, color: '#F3F5FA', opacity: 0.7 }}>
                        Allied Hospital  {/* location */}
                    </Text>
                </View>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40, width: "100%" }}>
                <Text style={{ fontSize: 20, marginLeft: 20 }}>
                    Popular doctors
                </Text>
                <TouchableOpacity style={{ marginLeft: 140, marginTop: 10 }}>
                    <Text style={{ color: 'royalblue' }}>see all</Text>
                </TouchableOpacity>

            </View>
            <FlatList
                data={Doctors}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

            />


        </View>

    )
}

const styles = StyleSheet.create({
    navbar: {
        display: 'flex', flexDirection: 'row',
        marginTop: 50,
        backgroundColor: 'white'
    },
    small: {
        fontSize: 14,
        color: 'gray'
    },
    cardname: {
        fontSize: 20,
        marginTop: 10
    },
    docname: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 20,
        color: 'white'
    },
    pic: {
        height: 100,
        width: 90,
        borderRadius: 50
    },
    search: {
        backgroundColor: '#FFFFFF', color: 'grey',
        padding: 15,

        borderRadius: 50,
        borderColor: '#FFFFFF'
    },
    text20: {
        fontSize: 20,
        marginTop: 50,
        marginLeft: 20
    },
    piccontain: {
        width: 50,
        height: 50,
        alignSelf: 'flex-end',
        marginLeft: 270,

    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 100
    },


    hammenu: {
        marginTop: 60,
        marginLeft: 10,

    },
    search: {

    }


})