import React, { useContext } from 'react';
import { SocketContext } from '@/socketContext';

interface Call {
  isReceivingCall: boolean;
  name: string;
}


const Notifications: React.FC = () => {

  const context = useContext(SocketContext);

  if (!context) {
    return null;
  }


  const { answerCall, call, callAccepted } = context;



  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <button onClick={answerCall}>
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notifications;
