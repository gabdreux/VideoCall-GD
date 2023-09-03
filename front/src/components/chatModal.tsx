import React from 'react';
import ListaAmigos from '@/components/listaAmigos';

import { useModal } from '@/useModal';


const ChatModal: React.FC = () => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) {
    return null;
  }

  


  return (

    <>

      {isOpen && (

        <div className='chat-modal'>


              <div className="col-4 coluna-morta-modal">
              </div>



              <div className="col-4 coluna-morta-modal">
              </div>


              <div className="col-4 coluna-modal">

                <div className='closeButton-chat-modal-wrapper'>
                  <button className='closeIcon' onClick={closeModal}><i className='fas fa-close'></i></button>
                </div>

                <ListaAmigos/>

              </div>


        </div>


      )}

    </>



  );


  
};



export default ChatModal;