import React, { createContext, useState, useRef, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer from 'simple-peer';



interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
}

export interface ContextProps {
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
  initializeSockets: () => void

}



// const socket: Socket = io('http://localhost:5000/');





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


  const [socket, setSocket] = useState<Socket | null>(null);




    useEffect(() => {

        const newSocket = io('http://localhost:5000/');
  
        setSocket(newSocket);
          
  
        newSocket.on('me', () => {
          console.log('Connected to server:', newSocket.id);
          setMe(newSocket.id);
  
        });
  
  
  
        newSocket.on('disconnect', () => {
          console.log('Disconnected from server');
        });
  
  
        
        newSocket.on('callUser', ({ from, name: callerName, signal }: Call) => {
          setCall({ isReceivingCall: true, from, name: callerName, signal });
  
        });
  
  
  
        return () => {
          newSocket.disconnect();
        };
  
      
    }, []);





    const initializeSockets = () => {


      const newSocket = io('http://localhost:5000/');

      setSocket(newSocket);
        

      newSocket.on('me', () => {
        console.log('Connected to server:', newSocket.id);
        setMe(newSocket.id);

      });



      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });


      
      newSocket.on('callUser', ({ from, name: callerName, signal }: Call) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });

      });



      return () => {
        newSocket.disconnect();
      };

    

  };








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

    askPermission();

    // inicilizeSockets();

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
      setCallAccepted(true);
      peer.signal(signal);

    });


    // socket.on('callEnded', (signal: any) => {
    //   setCallEnded(true);
    //   peer.signal(signal);

    // });


    connectionRef.current = peer;
    console.log("userVideo:", userVideo);


  };







  const leaveCall = () => {

    if (!connectionRef.current) {
      return;
    }

    if (socket) {
      socket.emit("leaveCall", { to: call.from, signal: connectionRef.current.signal }); // Enviar sinal de encerramento
    }


    setCallEnded(true);

    // if (connectionRef.current) {
    //   connectionRef.current.destroy();

    // }


    console.log("leaveCall called CHAMADA!");

    // window.location.reload();
  };









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
    initializeSockets,

  };

  


  

  return (

    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>


  );


};




export { ContextProvider, SocketContext };