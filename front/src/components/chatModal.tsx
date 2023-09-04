import React from 'react';
import ListaAmigos from '@/components/listaAmigos';

import { useModal } from '@/useModal';
import Gpt from '@/components/gpt';



const ChatModal: React.FC = () => {
  const { isOpen, closeModal, isGptOpen, openGpt, closeGpt } = useModal();


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

                  <div className='toggleTabs-chat-modal-wrapper'>
                    <button className='toggleTabs' onClick={closeGpt}>Amigos</button>
                    <button className='toggleTabs' onClick={openGpt}>Chat-GPT</button>
                  </div>


                  { !isGptOpen ? (
                    <ListaAmigos/>

                  ):(
                    <Gpt/>
                  )}




                  {/* <ListaAmigos/> */}
{/* 
                  <Gpt/> */}


              </div>




        </div>


      )}

    </>



  );


  
};



export default ChatModal;