import React from 'react';

const VideoCall: React.FC = () => {
  return (
    <div>
      <h1>Video Call</h1>
      <iframe
        src="http://localhost:5000/873c3e9e-b860-4783-9150-42194d37a366"  // Substitua pela URL correta da sua aplicação de videochamada
        width="100%"
        height="600"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default VideoCall;
