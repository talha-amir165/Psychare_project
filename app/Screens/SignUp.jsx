import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native'

import UserService from '../services/UserService'


export default function SignUp({ navigation }) {
  const [service, setService] = useState("");

  const [password, setPassword] = useState('');
  const [role, setrole] = useState('patient');
  const [hidePassword, setHidePassword] = useState(true);
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const handleTogglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };
  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValid(validateEmail(text));
  };
  const validateEmail = (email) => {
    // Regex pattern to match email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };
  const [isValid, setIsValid] = useState(true);

  return (
    <>
      <View >
        <View>
          <Image style={styles.backgroundpic} source={require("../assets/LoginShape.png")}></Image>

        </View>
        <View style={styles.container}>
          <Text style={styles.text}>
            Create Account
          </Text>
          <Text style={styles.textgray}>
            Let's Create Account Together
          </Text>
        </View>
        <View style={styles.Username}>
          <Text style={styles.text20}>
            Username
          </Text>
          <TextInput autoCapitalize='none' style={[styles.nameInput, styles.blackText]} placeholder=' Enter name' value={name}
            onChangeText={setname} placeholderTextColor="black">

          </TextInput>
        </View>
        <View style={styles.Email}>
          <Text style={styles.text20}>
            Email
          </Text>
          <TextInput autoCapitalize='none' style={[styles.nameInput, styles.blackText]} placeholder=' Enter Email' value={email}
            onChangeText={handleEmailChange} keyboardType="email-address" placeholderTextColor="black" />
          {!isValid && <Text style={{ color: 'red' }}>Please enter a valid email address</Text>}


        </View>

        <Text style={styles.text20}>
          Password
        </Text>
        <View style={styles.passicon}>
          <View style={{ width: '100%' }} >
            <TextInput
              placeholder=" Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
              style={[styles.passinput, styles.blackText]}

            />
          </View>
          <TouchableOpacity onPress={handleTogglePasswordVisibility}>

          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={(e) => {


          UserService
            .register(name, email, password, role)
            .then(() => {

              navigation.navigate('Login');
            })
            .catch((err) => {
              console.log(err);
            });
        }}>
          <View style={styles.button}>
            <Text style={styles.buttontext}> Register Now </Text>
          </View>
        </TouchableOpacity>

        <View style={{ display: 'flex', alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
          <Text style={{ color: '#707B81', marginLeft: 50 }}>
            Already Have An Account?

          </Text>
          <TouchableHighlight style={{ color: 'black', marginLeft: 3 }} onPress={() => { navigation.navigate("Login") }}>
            <View >
              <Text style={{ color: 'black' }}>Sign In</Text>
            </View>
          </TouchableHighlight>
        </View>





      </View>

    </>

  )
}
const styles = StyleSheet.create({
  backgroundpic: {
    position: 'absolute',
    left: 166,


  },
  blackText: {
    color: 'black'
  },
  smalltext: {
    color: '#707B81',
    fontSize: 16

  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150


  },
  text: {
    fontSize: 31,
    color: 'black'
  },
  textgray: {
    fontSize: 20,
    color: '#707B81',
    marginTop: 5
  },
  Username: {

    marginTop: 70,
    marginLeft: 15,

  },
  text20: {
    fontSize: 20,
    color: 'black'


  },

  nameInput: {
    borderWidth: 1,
    borderColor: '#rgba(0,0,0,0.3)',
    borderRadius: 30,
    marginTop: 10,
    padding: 5,
    marginLeft: 10,
    paddingLeft: 20,

    width: '80%'


  },
  password: {
    marginTop: 20,
    marginLeft: 20
  },
  passinput: {
    borderColor: '#rgba(0,0,0,0.3)',
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 18,
    padding: 5,
    paddingLeft: 20,


    width: '75%'


  },
  passicon: {
    display: 'flex',
    flexDirection: 'row',

  },
  icon: {
    marginTop: 15,
    marginLeft: -30



  },
  Email: {
    marginTop: 20,
    marginLeft: 15
  },
  button: {
    backgroundColor: '#418CFD',
    padding: 10,
    borderRadius: 30,
    marginTop: 40,
    width: '80%',
    marginLeft: 15
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
