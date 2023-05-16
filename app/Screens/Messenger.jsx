
import Conversation from "../Components/Conversation";
import Message from "../Components/Message";
import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import chatService from "../services/ChatService";
import messageService from "../services/MessageService";
import socket from '../Hooks/socket'
import userService from "../services/UserService";
import { useSelector } from 'react-redux';



export default function Messenger({ navigation }) {
    const userData = useSelector(state => state.user.userData);

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socketRef = useRef();
    const scrollRef = useRef();



    // useEffect(() => {

    //     socketRef.current.on("getMessage", (data) => {
    //         setArrivalMessage({
    //             sender: data.senderId,
    //             text: data.text,
    //             createdAt: Date.now(),
    //         });
    //     });
    // }, []);

    // useEffect(() => {
    //     arrivalMessage &&
    //         currentChat?.members.includes(arrivalMessage.sender) &&
    //         setMessages((prev) => [...prev, arrivalMessage]);
    // }, [arrivalMessage, currentChat]);



    useEffect(() => {
        const getConversations = async () => {
            console.log(userData.userid);
            chatService
                .getchatbysingleid(userData.userid)
                .then((data) => {
                    setConversations(data);
                    console.log("Messanger " + data)

                })
                .catch((err) => {
                    console.log(err);
                });

        };
        getConversations();
    }, [userData]);





    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
                <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20 }}>
                    <View >
                        <View style={{ marginTop: 40 }}>
                            <Text>
                                Messages
                            </Text>

                        </View>

                        <ScrollView>
                            <View style={{ marginTop: 40 }}>

                                {conversations.map((c) => (


                                    <Conversation conversation={c} navigation={navigation} key={c._id} />



                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </>
    );
}