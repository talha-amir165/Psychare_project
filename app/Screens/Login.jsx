import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'

import { useSelector, useDispatch } from 'react-redux';
import userService from '../services/UserService';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../Hooks/socket';


export default function Login({ navigation }) {

  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [email, setEmail] = useState('');
  const [user, setuser] = useState(null);
  const [bigloading, setbigloading] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };
  const userData = useSelector(state => state.user.userData);
  const dispatch = useDispatch();

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);


  const validateEmail = (text) => {
    // Email validation logic
    // You can use a regex pattern or a library like 'validator.js' to validate the email
    const emailPattern = /^\S+@\S+\.\S+$/;
    const isValid = emailPattern.test(text);
    setValidEmail(isValid);
    setEmail(text);
  };

  const validatePassword = (text) => {
    // Password validation logic
    const isValid = text.length >= 5;
    setValidPassword(isValid);
    setPassword(text);
  };
  const loginPress = async () => {
    try {
      setLoading(true);
      const data = await userService.login(email, password);
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Decode the token to get user data
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)

        dispatch({
          type: 'SET_USER_DATA',
          payload: {
            userid: decodedToken._id,
            name: decodedToken.name,
            email: decodedToken.email,
            id: decodedToken.patient_id,
            role: decodedToken.role
          },
        });
        socket.emit("addUser", decodedToken._id);
        setLoading(false);

        navigation.navigate('DrawerScreen');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      // Handle error here, e.g. show error message to user
    }
  };




  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {

        // Decode the token to get user data
        const decodedToken = jwtDecode(token);
        console.log(decodedToken + 'token')

        console.log(JSON.stringify(decodedToken))
        dispatch({
          type: 'SET_USER_DATA',
          payload: {
            userid: decodedToken._id,
            name: decodedToken.name,
            email: decodedToken.email,
            id: decodedToken.patient_id,
            role: decodedToken.role
          },
        });

        socket.emit("addUser", decodedToken._id);

        navigation.navigate('DrawerScreen');

        navigation.reset({
          index: 0,
          routes: [{ name: 'DrawerScreen' }],
        });
      }
      else {
        setbigloading(false);
      }
    };

    checkIfLoggedIn();
  }, []);



  return (



    <View style={{ backgroundColor: '#F8F9FA', height: '100%' }}  >



      {bigloading ?
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 300 }}>
          <ActivityIndicator size="large" />
        </View>
        : <View>
          <View style={styles.container}>
            <Text style={styles.textgray}>
              Welcome To Psychare

            </Text>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '70%' }}>
              <Text style={styles.textgray}>
                Login to get Started !
              </Text>


            </View>
          </View>

          <View style={styles.Email}>
            <Text style={[styles.text20, styles.blackText]}>
              Email
            </Text>
            <View style={{ display: 'flex' }}>
              <TextInput autoCapitalize='none' style={[styles.nameInput, styles.blackText]} placeholder=' Enter Email' value={email}
                onChangeText={setEmail} keyboardType="email-address" />
            </View>


          </View>
          <View style={styles.password}>
            <Text style={[styles.text20, styles.blackText]}>
              Password
            </Text>
            <View style={styles.passicon}>
              <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <TextInput
                  placeholder=" Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={hidePassword}
                  style={[styles.passinput, styles.blackText]}

                />
              </View>


              <TouchableOpacity onPress={handleTogglePasswordVisibility} style={{ width: 50, height: 50 }}>

              </TouchableOpacity>

            </View>
            <TouchableOpacity>
              <Text style={{ color: 'blue' }}>
                Forgot
              </Text>
            </TouchableOpacity>
            <View style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <TouchableOpacity style={{ width: '80%' }}
                onPress={loginPress}
              >
                <View style={styles.button}>
                  {loading ? (
                    <ActivityIndicator size="small" color="white" /> // Show the loader while loading
                  ) : (
                    <Text style={styles.buttontext}>Sign In</Text> // Show the button text
                  )}

                </View>
              </TouchableOpacity>

            </View>
            {/* <TouchableOpacity>

        <View style={styles.Googlebutton}>
        <Image style={styles.google} source={require("../assets/google.png")}>

        </Image>
        <Text style={styles.googletext}>
        Sign in  With Google
        </Text>
        </View>
      </TouchableOpacity> */}
            <View style={{ display: 'flex', alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
              <Text style={{ color: '#707B81', marginLeft: 50 }}>
                Don't Have An Account?

              </Text>
              <TouchableHighlight style={{ color: '#1A2530', marginLeft: 3 }}
                onPress={() => {
                  navigation.navigate('SignUp')
                }}
              >
                <View >
                  <Text style={{ color: '#418CFD' }}>Sign Up For Free</Text>
                </View>
              </TouchableHighlight>
            </View>

          </View>
        </View>}



    </View>



  )
}
const styles = StyleSheet.create({
  backgroundpic: {
    position: 'absolute',
    left: 166,


  },
  smalltext: {
    color: '#707B81',
    fontSize: 16

  },
  blackText: {
    color: 'black'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150


  },
  text: {
    fontSize: 31,
  },
  textgray: {
    fontSize: 20,
    color: '#707B81',
    marginTop: 5
  },
  Username: {

    marginTop: 70,
    marginLeft: 15
  },
  text20: {
    fontSize: 20,
    marginLeft: 15


  },

  nameInput: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    paddingLeft: 20,
    alignSelf: 'center',

    width: '80%'


  },
  password: {
    marginTop: 20

  },
  passinput: {
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 20,

    width: '80%'


  },
  passicon: {
    display: 'flex',
    flexDirection: 'row'
  },
  icon: {
    marginTop: 20,
    marginLeft: -70



  },
  Email: {
    marginTop: 30

  },
  button: {
    backgroundColor: '#418CFD',
    padding: 12,
    borderRadius: 50,
    marginTop: 40,
    width: '100%'
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  Googlebutton: {
    display: 'flex',
    backgroundColor: '#F8F8FF',
    padding: 10,
    borderRadius: 30,
    marginTop: 25,
    width: '80%',
    marginLeft: 15,
    flexDirection: 'row'

  },
  google: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  googletext: {
    fontSize: 20,
    marginLeft: 5
  }




})
