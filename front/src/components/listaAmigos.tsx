import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from '@/socketContext';
import axios from "axios";
import { AuthContext } from "@/authContext";







type User = {
  id: number;
  name: string;
  email: string;
  // outros campos...
};





const ListaAmigos: React.FC = () => {

  const authContext = useContext(AuthContext);

  const [friends, setFriends] = useState<User[]>([]);


  useEffect(() => {
    async function fetchFriends() {

      if (authContext?.authenticated) { // Verifique se o usuário está autenticado
        console.log("AUTENDICADO");
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `${token}`
        };

        try {
          const response = await axios.get<User[]>('http://localhost:5000/api/friends', {
            withCredentials: true,
            headers: headers
          });
          setFriends(response.data);
        } catch (error) {
          console.error('Erro ao buscar amigos:', error);
        }
      }
      else {
        console.log("SEM AUTENTICAÇÃO");
      }
    }
  
    fetchFriends();
  }, [authContext]);
  


  

  const context = useContext(SocketContext);

  if (!context) {
    return null;
  }

  const { me, setMe, name, setName, callUser, initializeSockets } = context;
  const [idToCall, setIdToCall] = useState('');


  
  const callHandler = () => {
    
    const idToCall = context.me;
    setIdToCall(idToCall);


    const name = "gabriel";
    setName(name);


    callUser(idToCall);



    // console.log('Valor de me2:', context.me);
    
  }

  


  return (


    <div className="col-sm-12 col-md-5 col-lg-3">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style={{ width: '100%' }}>



        <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
          <svg className="bi pe-none me-2" width="30" height="24"><use href="#bootstrap"></use></svg>
          <h4>Amigos:</h4>
        </a>

    

        <div className="container text-center">
          {friends.map((friend) => (
            <div key={friend.id} className="row align-items-start cards">
              <div className="col-3">
                <div className='containerDiv card'>
                  <a href="/" className="navbar-brand">
                    <img className='userAvatarCard' src='imgs/userAvatar.png'/>
                  </a>
                </div>
              </div>
              <div className="col-9">
                <div className='cardInfos'>
                  <p>{friend.name}</p>
                  <p>{friend.email}</p>
                  <div className="container text-center card">
                    <div className="row align-items-start">
                      <div className="col">
                        <i className='fas fa-phone' onClick={callHandler}><use href="#"></use></i>
                      </div>
                      <div className="col">
                        <i className='fas fa-trash-alt'><use href="#"></use></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>





        <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
          <svg className="bi pe-none me-2" width="30" height="24"><use href="#bootstrap"></use></svg>
          <h4>Pedidos pendentes:</h4>
        </a>

        {/* Adicione aqui o código para listar os pedidos pendentes */}
        
      </div>
    </div>
  );
};

export default ListaAmigos;