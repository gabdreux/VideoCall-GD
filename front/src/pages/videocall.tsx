import React from 'react';

const VideoCall: React.FC = () => {
  return (


<div>


  <div className='videoCanva'>

  </div>





  <div className="videocallMenu">

    <div className="container text-center">
        <div className="row">


          <div className="col-sm-12 col-md-12 col-lg-4">
            Column 1
          </div>



          <div className="col-sm-12 col-md-12 col-lg-4 callButtonsDiv">
            <button><i className='far fa-comment'></i></button>
            <button className='powerOff'><i className='fas fa-power-off'></i></button>
            <button className='banAlert'><i className='fas fa-exclamation-circle'></i></button>
            <button className='bolinMenu'><i className='fas fa-ellipsis-v'></i></button>
          </div>



          <div className="col-sm-12 col-md-12 col-lg-4">
            Column 3
          </div>


        </div>
    </div>


  </div>



</div>

  );
};

export default VideoCall;
