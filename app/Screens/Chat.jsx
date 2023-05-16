
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { View, ScrollView, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import socket from '../Hooks/socket';
import chatService from "../services/ChatService";
import messageService from '../services/MessageService';
import { useSelector } from 'react-redux';
import Message from '../Components/Message';
import { io } from "socket.io-client";


const Chat = ({ route }) => {

    const conversation = route.params.conversation;
    const userData = useSelector(state => state.user.userData);


    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socketRef = useRef(socket);
    const scrollRef = useRef();


    useEffect(() => {


        socketRef.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);
    useEffect(() => {
        arrivalMessage &&
            conversation?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, conversation]);

    useEffect(() => {
        const getMessages = async () => {
            if (conversation._id != null) {
                console.log(conversation._id)
            }
            messageService
                .getbychatid(conversation?._id)
                .then((data) => {
                    setMessages(data);
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });

        };
        getMessages();
    }, []);

    const handleSubmit = async (e) => {

        const message = {
            chatId: conversation._id,
            sender: userData.userid,
            text: newMessage,
            conversationId: conversation._id,
        };

        const receiverId = conversation.members.find(
            (member) => member !== userData.userid
        );

        socketRef.current.emit("sendMessage", {
            chatId: conversation._id,
            senderId: userData.userid,
            receiverId,
            text: newMessage,
            createdAt: Date.now(),
        });
        messageService
            .addmessage(message)
            .then((data) => {
                setMessages([...messages, data]);
                setNewMessage("");

            })
            .catch((err) => {
                console.log(err);
            });

    };

    useEffect(() => {
        // Scroll to the end of the chat whenever the messages state is updated
        scrollRef.current?.scrollToEnd({ animated: true });
    }, [messages, scrollRef]);


    return (


        <View style={{ flex: 1, marginTop: 100 }}>

            <ScrollView ref={scrollRef}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>

                <View style={{ flexDirection: 'column' }}>
                    {messages && messages.map((m) => (

                        <Message key={m._id} message={m} own={m.sender === userData.userid} />
                    ))

                    }
                </View>

                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <TextInput
                        style={{ flex: 1, padding: 10, borderRadius: 10, borderWidth: 0.2, marginHorizontal: 10 }}
                        placeholder="Write something..."
                        value={newMessage}
                        onChangeText={setNewMessage}

                    />
                    <TouchableOpacity style={{ width: 70, height: 40, borderRadius: 5, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }} onPress={handleSubmit}>
                        <Text style={{ color: 'white' }}>Send</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>

    )
}

export default Chat
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});