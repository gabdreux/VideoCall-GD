import { io, Socket } from 'socket.io-client';

const socketConnection: Socket = io('http://localhost:5000/');

export default socketConnection;