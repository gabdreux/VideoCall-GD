import React, { useEffect, useContext } from 'react';
import { SocketContext } from '@/socketContext';


const VideoCanva: React.FC = () => {
    

    const context = useContext(SocketContext);


    

    
    
    return (

    <div className="grid text-center videoCanva2" style={{ '--bs-columns': 'col' } as React.CSSProperties }>


          {/* <div className='video1v1'>

            { 2 === 2 && (
                <div className='party2-video-wrapper'>
                  <video className='party2-video' playsInline  autoPlay />
                </div>

            ) }

              

            { 1 === 1 && (

                <div className="grid meuVideo">
                    <video className='part1-video' playsInline muted  autoPlay />
                </div>

            ) } 


          </div> */}



          <div className='video1v2'>

            { 2 === 2 && (
              
                <div className='video1v2-wrapper'>

                  <div className='party3-video-wrapper col-6'>
                    <video className='party2-video party3' playsInline  autoPlay />
                  </div>

                  <div className='party3-video-wrapper col-6'>
                    <video className='party2-video party3' playsInline  autoPlay />
                  </div>

                </div>



            ) }

              

            { 1 === 1 && (

                <div className="grid meuvideo-party3-wrapper">
                    <video className='meuvideo-party3' playsInline muted  autoPlay />
                </div>

            ) } 


          </div>






    </div>    


    );

};



export default VideoCanva;