import React, { createContext, useState, useRef, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer from 'simple-peer';



interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
}

interface ContextProps {
  call: Call;
  callAccepted: boolean;
  myVideo: React.RefObject<HTMLVideoElement>;
  userVideo: React.RefObject<HTMLVideoElement>;
  stream: MediaStream | undefined;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  callEnded: boolean;
  me: any;
  setMe: React.Dispatch<React.SetStateAction<any>>;
  callUser: (id: string) => void;
  leaveCall: () => void;
  answerCall: () => void;
  idTocall: string;


}


// const socket: Socket = socketConnection;
const socket: Socket = io('http://localhost:5000/');





const SocketContext = createContext<ContextProps | null>(null);







const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [name, setName] = useState('');
  const [call, setCall] = useState<Call>({ isReceivingCall: false, from: '', name: '', signal: null });
  const [me, setMe] = useState('');
  

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  const idTocall = '';

  const [socket2, setSocket2] = useState<Socket | null>(null);


    useEffect(() => {

    const socket2 = io('http://localhost:5000');

    socket2.on('me', () => {
      console.log('Connected to server');
      setMe(socket.id);
      console.log(me);
      console.log(socket2.id);
    });

    socket2.on('disconnect', () => {
      console.log('Disconnected from server');
    });


    
    socket.on('callUser', ({ from, name: callerName, signal }: Call) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });

    });


    return () => {
      socket2.disconnect();
    };
  }, []);













  const askPermission = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      setStream(currentStream);

      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }

    });

  };



  

  const answerCall = () => {

    askPermission();

    if (!socket) {
      console.log("Socket não está inicializado.");
      return;
  };

    console.log("Before setting callAccepted:", callAccepted);
    setCallAccepted(true);
    console.log("After setting callAccepted:", callAccepted);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream; //Other person stream
      }
    });

    peer.signal(call.signal);

    connectionRef.current = peer;

  };



  

  const callUser = (id: string) => {

    if (!socket) {
      console.log("Socket não está inicializado.");
      return;
  };

    const peer = new Peer({ initiator: true, trickle: false, stream });

    console.log("peer:", peer);

    console.log("CHAMOU LIGAÇÃO!");

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    console.log("DATA:" , "userToCallID:", id, "ME:", me, "NAME:", name);


    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }

    });

    socket.on('callAccepted', (signal: any) => {
      console.log("Inside callAccepted socket event:", callAccepted);
      setCallAccepted(true);
      console.log("After setting callAccepted:", callAccepted);
      peer.signal(signal);

    });

    connectionRef.current = peer;
    console.log("userVideo:", userVideo);

  };







  const leaveCall = () => {
    setCallEnded(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    window.location.reload();
  };




  // const setMyUserId = (userId: string) => {
  //   setMe(userId);
  // };






  const contextValue: ContextProps = {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    setMe,
    callUser,
    leaveCall,
    answerCall,
    idTocall,

  };

  


  

  return (

    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>


  );


};




export { ContextProvider, SocketContext };