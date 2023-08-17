import React, { useEffect, useContext, useState } from 'react';
import { SocketContext } from '@/socketContext';


const VideoCanva2: React.FC = () => {
    

    const context = useContext(SocketContext);

    

      useEffect(() => {       

        if (!context) return;


        // const storedIdToCall = sessionStorage.getItem("idToCall");
        // const storedName = sessionStorage.getItem("name");
        // const storedMe = sessionStorage.getItem("me");

        // console.log("Stored ID-TO-CALL:", storedIdToCall);
        // console.log("Stored NAME:", storedName);
        // console.log("Stored ME:", storedMe);



        const { callUser, callAccepted, callEnded, stream } = context;
        // const me = storedMe;


        // if (storedIdToCall && storedMe) {
        //   callUser(storedIdToCall);

        // }

        // console.log('callAccepted-VC2:', callAccepted);
        // console.log('callEnded-VC2:', callEnded);
        // console.log('STREAM-VC2:', stream);
        // console.log("ME-VC2:", me);

        // Capture the stream and set it to video elements
        if (stream) {
            if (myVideo.current) {
                myVideo.current.srcObject = stream;
            }

            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        }
    }, [context]);






    if (!context) {
        return null;
    }


    const {  callAccepted, name, setName, callEnded, leaveCall, callUser, stream, call,  myVideo, userVideo,  } =  context;
    const [idToCall, setIdToCall] = useState('');


    // const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = context;
    
    


    
    return (

    <div className="grid text-center videoCanva2" style={{ '--bs-columns': 'col' } as React.CSSProperties }>
      <div className='video1'>




        { callAccepted && !callEnded && (

            <div>
              <video playsInline ref={userVideo} autoPlay />
              <p>{call.name} || '2party name'</p>
            </div>

        ) }


           
        {  stream && (

            <div className="grid meuVideo">
              <div className="col-2 meuVideo">
                <video playsInline muted ref={myVideo} autoPlay />
              </div>
            </div>

        ) } 




      </div>
    </div>    


    );

};



export default VideoCanva2;