import React from 'react';
import ListaAmigos from '@/components/listaAmigos';



const ChatModal: React.FC = () => {

  return (


    <div className='chat-modal'>



                <div className="col-4 coluna-morta-modal">
                </div>



                <div className="col-4 coluna-morta-modal">
                </div>


                <div className="col-4 coluna-modal">

                  <div className='closeButton-chat-modal-wrapper'>
                    <button className='closeIcon'><i className='fas fa-close'></i></button>
                  </div>

                  <ListaAmigos/>

                </div>



    </div>



  );


};

export default ChatModal;