import React from 'react';
import VideoCanva2 from '@/components/videoCanva2';
import VideoCallMenu from '@/components/videoCallMenu';
import { ContextProvider } from '@/socketContext';

const VideoCall: React.FC = () => {




  return (


  <ContextProvider>
    <div>

      <div>
        <VideoCanva2 />
      </div>


      <div>
        <VideoCallMenu />
      </div>

    </div>
    
  </ContextProvider>

  );
};

export default VideoCall;
