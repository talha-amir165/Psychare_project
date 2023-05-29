
import React, { useState, useEffect } from 'react'
import { View, Text, Modal, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';




import useFetch from '../Hooks/useFetch';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const cities = [
    { id: '1', name: 'Lahore' },
    { id: '2', name: 'Karachi' },
    { id: '3', name: 'Chicago' },
    { id: '4', name: 'Houston' },
    { id: '5', name: 'Phoenix' },
    { id: '6', name: 'Philadelphia' },
    { id: '7', name: 'San Antonio' },
    { id: '8', name: 'San Diego' },
    { id: '9', name: 'Dallas' },
    { id: '10', name: 'San Jose' },
];

var filtered;

const Search = ({ route, navigation }) => {
    const navigations = useNavigation();
    const handleMenuPress = () => {
        navigations.openDrawer();
    };


    const [query, setQuery] = useState('');
    const [refresh, setrefresh] = useState(true);



    const handleSearch = text => {
        setQuery(text);
        console.log(query)



    };



    const [modalVisible, setModalVisible] = useState(false);
    const [Specialization, setSpecialization] = useState('Select')
    const [cityModalVisible, setCityModalVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [showOrder, setShowOrder] = useState(false);
    const [PriceOrder, setPriceOrder] = useState('Select');
    const [Ratinglist, setRatinglist] = useState(false);
    const [RatingOrder, setRatingOrder] = useState('Select');
    const { data, loading, error, reFetch } = useFetch('http://13.53.188.158:4000/api/users/psychologists/allpsychologists');
    // console.log(data);


    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedValue, setSelectedValue] = useState('Select');
    var uniqueSpecializations = [];


    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setCityModalVisible(false);

    };
    const handlePress = () => {
        setShowOrder(!showOrder);
    };
    const RatingPress = () => {
        setRatinglist(!Ratinglist);
    }




    const renderItemCity = ({ item }) => {
        return (
            <TouchableOpacity style={{ padding: 16 }} onPress={() => handleCitySelect(item)}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    };




    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('Doctor', { item });
            }} >
                <View style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
                    marginTop: 20, borderRadius: 16, width: 165, marginHorizontal: 15, marginBottom: 7
                }}>
                    {/* <Image style={{ width: 80, height: 80, borderRadius: 50, resizeMode: 'contain' }} source={item.pic}></Image> */}

                    <Text style={[styles.cardname, styles.BlackText]}>
                        {item.user_id && item.user_id.name}
                    </Text>

                    <Text style={styles.small}>
                        psycologist
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 4 }}>
                        <Icon name="staro" size={12} color="black" style={{ marginTop: 4, marginRight: 3 }} />
                        {/* rating fetch and display */}
                        <Text style={{ fontSize: 11, color: 'black' }}>
                            {item.rating}
                        </Text>

                    </View>
                    <Text style={styles.BlackText}>{item.onsiteAppointment && item.onsiteAppointment.city}</Text>
                    <Text style={styles.BlackText}>
                        Fees : {item.onsiteAppointment && item.onsiteAppointment.fee}
                    </Text>


                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        if (data && !loading) {
            setFilteredDoctors(data);

            // data.forEach((item) => {
            //     if (!uniqueSpecializations.includes(item.specialization)) {
            //         uniqueSpecializations.push(item.specialization);
            //     }
            // });



            // console.log(uniqueSpecializations)
            // Filter data based on searchName and searchCity
            let newData = data.filter(doctor => {
                if (query != '' && selectedCity && doctor.onsiteAppointment && doctor.onsiteAppointment?.city) {
                    var nameMatches = doctor.user_id.name.toLowerCase().includes(query.toLowerCase())
                        && doctor.onsiteAppointment.city.toLowerCase() === selectedCity.toLowerCase();
                    return nameMatches;

                }

                else if (query != '' && doctor.user_id && doctor.user_id.name) {
                    const nameMatches = doctor.user_id.name.toLowerCase().includes(query.toLowerCase());
                    return nameMatches
                }

                else if (selectedCity && doctor.onsiteAppointment && doctor.onsiteAppointment?.city) {
                    const cityMatches = doctor.onsiteAppointment.city.toLowerCase() === selectedCity.toLowerCase();
                    console.log(cityMatches);
                    return cityMatches;
                }


                else if (query == '' && selectedCity == null) {
                    return true;
                }
            });



            // else if (PriceOrder === 'highest') {
            //     newData = newData.sort((a, b) => b.onsiteAppointment.fee - a.onsiteAppointment.fee);
            // }
            // if (RatingOrder == 'lowest') {
            //     newData = newData = newData.sort((a, b) => a.rating - b.rating);
            // }
            // else if (RatingOrder == 'highest') {
            //     newData = newData.sort((a, b) => b.rating - a.rating);
            // }

            const filteredData = query || selectedCity ? newData : data;

            setFilteredDoctors(filteredData);



        }
    }, [query, data, loading, selectedCity/*PriceOrder, RatingOrder*/]);
    const Loadings = useSelector(state => state.LoadingState.Search);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {



            // if (Loadings) {
            reFetch();
            dispatch({
                type: 'SET_LOADING',
                payload: false
            });



        });

        return unsubscribe;
    }, [navigation, reFetch]);


    return (

        <View style={{ paddingTop: 20, backgroundColor: '#F8F9FA', height: '100%' }}>

            <TextInput
                placeholderTextColor={'black'}
                style={styles.BlackText}
                onChangeText={handleSearch}
                value={query}
                placeholder="Search doctors by name..."
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.BlackText}>Filter</Text>
            </TouchableOpacity>
            <Modal animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <Ionicons name="arrow-back-sharp" size={24} color="black" onPress={() => { setModalVisible(false) }} style={{ marginTop: 5, marginHorizontal: 10 }} />
                <View style={{ flex: 1, marginHorizontal: 15, marginVertical: 50 }}  >

                    <View style={{}}>
                        <Text style={[styles.filterhead, styles.BlackText]}>
                            City Filter
                        </Text>

                        <Picker
                            style={{ width: '50%', color: 'black' }}
                            selectedValue={selectedCity}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedCity(itemValue)

                            }>
                            <Picker.Item label="Select" value="" enabled={false} />
                            {cities.map(option => (
                                <Picker.Item key={option.id} label={option.name} value={option.name} />
                            ))}
                        </Picker>
                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 5 }}>


                        <Text style={[styles.filterhead, styles.BlackText]}>
                            Select Price Order
                        </Text>
                        <Picker
                            style={{ width: '50%', color: 'black' }}
                            selectedValue={PriceOrder}
                            onValueChange={(itemValue, itemIndex) =>
                                setPriceOrder(itemValue)
                            }>
                            <Picker.Item label="Select" value="" enabled={false} />

                            <Picker.Item label="Highest" value="Highest" />
                            <Picker.Item label="Lowest" value="Lowest" />

                        </Picker>




                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 5 }}>


                        <Text style={[styles.filterhead, styles.BlackText]}>
                            Ratings
                        </Text>
                        <Picker
                            style={{ width: '50%', color: 'black' }}
                            selectedValue={RatingOrder}
                            onValueChange={(itemValue, itemIndex) =>
                                setRatingOrder(itemValue)
                            }>
                            <Picker.Item label="Select" value="" enabled={false} />

                            <Picker.Item label="Highest" value="Highest" />
                            <Picker.Item label="Lowest" value="Lowest" />

                        </Picker>
                        <Text style={[styles.filterhead, styles.BlackText]}>
                            Select Specialization
                        </Text>
                        <Picker
                            style={{ width: '50%' }}
                            selectedValue={Specialization}
                            onValueChange={(itemValue, itemIndex) =>
                                setSpecialization(itemValue)
                            }>
                            <Picker.Item label="Select" value="" enabled={false} />
                            <Picker.Item label="Trauma" value="Trauma" />
                            <Picker.Item label="Depression" value="Depression" />
                            <Picker.Item label="Anxiety" value="Anxiety" />
                            <Picker.Item label="Language Therapy" value="Language Therapy" />





                        </Picker>



                        <TouchableOpacity style={{ backgroundColor: '#007FFF', alignItems: 'center', width: '30%', marginTop: 20, borderRadius: 15, padding: 7 }}
                            onPress={() => { setModalVisible(false) }}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </Modal>

            <View>

                {loading ? (<View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 50 }}><ActivityIndicator size="large" color="skyblue" /></View>) : (
                    <View style={{ marginBottom: 100 }}>

                        <FlatList
                            data={filteredDoctors}
                            keyExtractor={item => item._id}
                            renderItem={renderItem}


                            numColumns={2}
                            key={2}
                            horizontal={false}


                        />
                    </View>

                )}
            </View>


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
    BlackText: { color: 'black' },


    hammenu: {
        marginTop: 60,
        marginLeft: 10,

    },
    filterhead: {
        marginLeft: 8,
        fontSize: 16
    },
    filterIcon: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        alignSelf: 'flex-end',
        margin: 20,
    },
    filterText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333333',
    },



})

export default Search