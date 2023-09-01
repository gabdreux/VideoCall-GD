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
        }
    }, [context]);

    if (!context) {
        return null;
    }


    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =  context;
    
    
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






        {/* { 2 != 2 && (

        <div>
          <video playsInline ref={userVideo} autoPlay />
          <p>{call.name} || '2party name'</p>
        </div>

        ) }




        { 3 === 3 && (

        <div className=''>
        <div className='row'> 

          <div className='col-sm-6 col-md-6 col-lg-6'>
            <video playsInline ref={userVideo} autoPlay />
            <p>{call.name} || '2party name'</p>
          </div>  

          <div className='col-sm-6 col-md-6 col-lg-6'>
            <video playsInline ref={userVideo} autoPlay />
            <p>{call.name} || '3party name'</p>
          </div>

        </div>
        </div> 

        ) }




        {  1 === 1 && (

        <div className="grid meuVideo">
          <div className="col-2 meuVideo">
            <video playsInline muted ref={myVideo} autoPlay />
          </div>
        </div>

        ) }  */}





      </div>
    </div>    


    );

};



export default VideoCanva2;