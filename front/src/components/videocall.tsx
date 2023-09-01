import React from 'react';
import VideoCanva2 from '@/components/videoCanva2';
import VideoCallMenu from '@/components/videoMenu';







const VideoCall: React.FC = () => {



  return (


    <div>

      <div>
        <VideoCanva2 />
      </div>


      <div>
        <VideoCallMenu />
      </div>

    </div>
    


  );
};

export default VideoCall;