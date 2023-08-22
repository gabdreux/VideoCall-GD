import React, { useState, useContext, ReactNode } from 'react';
import { SocketContext } from '@/socketContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface AlertProps {
  children: ReactNode;
}

const Alerta: React.FC<AlertProps> = ({ children }) => {


  const context = useContext(SocketContext);

  if (!context) {
    return null;
  }


  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = context;
  const [idToCall, setIdToCall] = useState('');

  return (
    <div>
      <div>
        <div>
          <div>
            <p>Account Info</p>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <CopyToClipboard text={me}>
              <button>
                Copy Your ID
              </button>
            </CopyToClipboard>
          </div>
          <div>
            <p>Make a call</p>
            <input value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
            {callAccepted && !callEnded ? (
              <button onClick={leaveCall}>
                Hang Up
              </button>
            ) : (
              <button onClick={() => callUser(idToCall)}>
                Call
              </button>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Alerta;