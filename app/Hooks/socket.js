import { io } from "socket.io-client";

const socket = io("ws://13.53.188.158:4000/");

export default socket;