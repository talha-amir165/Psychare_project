import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import userService from "../services/UserService";
import { useSelector } from 'react-redux';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
} from '../Styles/MessageStyles';


const Conversation = ({ conversation, navigation }) => {
    const [user, setUser] = useState(null);
    const userData = useSelector(state => state.user.userData);


    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== userData.userid);

        const getUser = async () => {
            try {
                const data = await userService.getUser(friendId);
                setUser(data);
            } catch (err) {
                console.log(err);
            }
        };

        getUser();
    }, [userData, conversation]);

    return (


        <Container>

            <Card onPress={() => {
                navigation.navigate('chat', { conversation })
            }}>
                <UserInfo>
                    {/* <UserImgWrapper>
                        <UserImg source={require('../assets/anampic.png')} />
                    </UserImgWrapper> */}
                    <TextSection>
                        <UserInfoText>
                            <UserName>{user?.name}</UserName>

                        </UserInfoText>
                        {/* <MessageText>hello</MessageText> */}
                    </TextSection>
                </UserInfo>
            </Card>


        </Container>


    );
};

export default Conversation;
const styles = StyleSheet.create({
    conversation: {
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        cursor: 'pointer',

    },
    conversationHover: {
        backgroundColor: 'rgb(245, 243, 243)',
    },
    conversationImg: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 20,
        resizeMode: 'cover',
    },
    conversationName: {
        fontWeight: '500',
    },
    conversationNameSmall: {
        display: 'none',
    },
    '@media (max-width: 768px)': {
        conversationName: {
            ...this.conversationNameSmall,
        },
    },
});
