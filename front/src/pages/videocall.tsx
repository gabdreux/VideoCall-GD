import React from 'react';
import { ContextProvider } from '@/socketContext';
import VideoCanva2 from '@/components/videoCanva2';
import VideoCallMenu from '@/components/videoCallMenu';
import Alerta from '@/components/alerta';
import Notifications from '@/components/notifications';



const VideoCall: React.FC = () => {




  return (


  <ContextProvider>
    <div>

      <Alerta><Notifications/></Alerta>

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
