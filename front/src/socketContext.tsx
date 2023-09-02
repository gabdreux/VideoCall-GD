import React, { createContext, useState, useRef, useEffect, ReactNode, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer from 'simple-peer';
import axios from 'axios';
import { AuthContext } from "@/authContext";



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
  pushMe: (me: string) => void

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


  const authContext = useContext(AuthContext);




    useEffect(() => {

        const newSocket = io('http://localhost:5000/');
  
        setSocket(newSocket);
          
  
        newSocket.on('me', () => {
          console.log('Connected to server:', newSocket.id);
          setMe(newSocket.id);
          pushMe(newSocket.id);
          
  
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





    const pushMe = (me:string) => {


        async function saveMe() {
          

                const token = localStorage.getItem('token');
                const headers = {
                  Authorization: `${token}`,
                };

                const data = {
                  me: me,
                };
            
                try {
                  const response = await axios.post('http://localhost:5000/saveme', data, {
                    withCredentials: true,
                    headers: headers,
                  });

                  if (response.status === 200) {
                    console.log(response.data.message); // Exibe a mensagem de sucesso do servidor
                  } else {
                    console.error('Erro ao salvar a string "me":', response.statusText);
                  }


                } catch (error) {
                  console.error('Erro ao salvar a string "me":', error);
                }

          
        }

        
        
        saveMe();
    

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

    setCallAccepted(true);

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


    peer.on('desligar', (data) => {
      socket.emit('leaveCall', { userToCall: id, signalData: data, from: me, name });
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


    socket.on('callEnded', (signal: any) => {
      setCallEnded(true);

    });


    connectionRef.current = peer;
    console.log("userVideo:", userVideo);


  };







  const leaveCall = () => {

    const peer = connectionRef.current;

    if (!peer) {
      return;
    }


    if (!socket) {
      return;
    }


    socket.emit("leaveCall", { to: call.from, signal: peer.signal });


    // socket.disconnect();



    peer.on('signal', (data) => {
      socket.emit('leaveCall', { signal: data, to: call.from });
      // setCallEnded(true);
    });


      // Parar a exibição de vídeo e áudio
    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }

    if (socket && call.from) {
      socket.emit("leaveCall", { to: call.from });
    }

    peer.destroy();

    console.log("leaveCall called CHAMADA!");

    setCallEnded(true);
    setStream(undefined);

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
    pushMe,

  };

  


  

  return (

    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>


  );


};




export { ContextProvider, SocketContext };