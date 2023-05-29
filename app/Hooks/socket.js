import { io } from "socket.io-client";

const socket = io("ws://13.53.188.158:4000/");
socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});

export default socket;