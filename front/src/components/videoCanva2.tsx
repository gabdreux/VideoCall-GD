import React, { useEffect, useContext } from 'react';
import { SocketContext } from '@/socketContext';


const VideoCanva2: React.FC = () => {
    

    const context = useContext(SocketContext);


    

    useEffect(() => {
        if (!context) return;

        const { me, callAccepted, callEnded, stream } = context;

        console.log('callAccepted-VC2:', callAccepted);
        console.log('callEnded-VC2:', callEnded);
        console.log('STREAM-VC2:', stream);
        console.log("ME-VC2:", me);

        // Capture the stream and set it to video elements
        if (stream) {


            if (myVideo.current) {
                myVideo.current.srcObject = stream;
            }

            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }

            if (context.user2Video.current) {
                context.user2Video.current.srcObject = stream;
              }


        }

        
    }, [context]);




    if (!context) {
        return null;
    }

    
 
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, user2Video } =  context;
    


    
    return (


        <div className="grid text-center videoCanva2" style={{ '--bs-columns': 'col' } as React.CSSProperties }>


              { 2 === 2 && (

                  <div className='video1v1'>
                      

                          { callAccepted && !callEnded && (

                                <div className='party2-video-wrapper'>
                                <video className='party2-video' playsInline ref={userVideo} autoPlay />
                                </div>

                          ) }

                            

                          {  stream && (

                              <div className="grid meuVideo">
                                  <video className='part1-video' playsInline muted ref={myVideo} autoPlay />
                              </div>

                          ) } 

                  </div>            

              )}





              { 3 != 3 && (

                  <div className='video1v2'>

                            { callAccepted && !callEnded && (
                              
                                <div className='video1v2-wrapper'>


                                  <div className='party3-video-wrapper col-6'>
                                    <video className='party2-video party3' playsInline ref={userVideo} autoPlay />
                                  </div>


                                  <div className='party3-video-wrapper col-6'>
                                    <video className='party2-video party3' playsInline  ref={user2Video} autoPlay />
                                  </div>


                                </div>

                            ) }

                              

                            { stream && (

                                <div className="grid meuvideo-party3-wrapper">
                                    <video className='meuvideo-party3' playsInline muted ref={myVideo} autoPlay />
                                </div>

                            ) } 

                  </div>            


              )}                



        </div>    



    );


};



export default VideoCanva2;