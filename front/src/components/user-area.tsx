import React, { useState, useContext, useEffect } from 'react';
import ListaAmigos from '@/components/listaAmigos';
import { ContextProvider } from '@/socketContext';
import VideoCall from '@/components/videocall';
import Notifications from '@/components/notifications';
import { SocketContext } from '@/socketContext';




const UserAera = () => {
  const context = useContext(SocketContext);

  if (!context) return;

  const { callAccepted, callEnded, stream } = context;



  const handleChamadaClick = () => {
    window.location.href = '/videocall';

  };

  


  return (

    
    <div>
      

          <Notifications />



        {callAccepted && !callEnded ? (

          <VideoCall />

        ) : (


          <div>
            <div className="container text-center">
              <div className="row align-items-start containerDiv">




                <ListaAmigos></ListaAmigos>



                <div className="col-sm-12 col-md-6 col-lg-6">
                    
                  < div className="containerDiv">
                    <form className="loginForm" data-bitwarden-watching="1">

                        

                        <div className='containerDiv'>
                          <a href="/" className="navbar-brand">
                            <img className='userAvatar' src='imgs/userAvatar.png'/>
                          </a>
                        </div>


                        <div className='containerDiv'>
                          <h1 className="h3 mb-3 fw-normal">BEM-VINDO!</h1>
                        </div>


                        <div className="form-floating userData">
                          <input type="email" className="form-control " id="floatingPassword" placeholder="Nome completo..." />
                          <label htmlFor="floatingPassword">NOME COMPLETO</label>
                        </div>

                        <div className="form-floating userData">
                          <input type="email" className="form-control" id="floatingPassword" placeholder="E-mail..." />
                          <label htmlFor="floatingPassword">EMAIL</label>
                        </div>
                        

                        <div className="form-floating userData">
                          <input type="text" className="form-control" id="floatingPassword" placeholder="Endereço..." />
                          <label htmlFor="floatingPassword">ENDEREÇO</label>
                        </div>


                        <div className='containerDiv'>
                          <p>Status: Aprovado.</p>
                        </div>


                        <button className="btn btn-primary w-100 py-2" type="button" onClick={handleChamadaClick}>INICIAR CHAMADA ALEATÓRIA</button>


                    </form>
                  </div>

                </div>




                <div className="no-mobile no-tablet col-lg-3">
                  One of three columns
                </div>

                


              </div>
            </div>
          </div>


        )}

      
        
    
    </div>


    
  );
};

export default UserAera;