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

  

  const { leaveCall, answerCall, call, callAccepted } = context;



  return (


    <>

   
      { call.isReceivingCall && !callAccepted && (


        <>

          <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" role="dialog" id="modalChoice">
          <div className="modal-dialog" role="document">
            <div className="modal-content rounded-3 shadow">


              <div className="modal-body p-4 text-center">
                <h5>{call.name} is calling:</h5>
              </div>


              <div className="modal-footer flex-nowrap p-0">

                <button onClick={answerCall} type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"><strong>ATENDER</strong></button>
                <button onClick={leaveCall} type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0" data-bs-dismiss="modal">DESLIGAR</button>

              </div>




            </div>
          </div>
          </div>


        </>



      )}


    </>



  );
};

export default Notifications;