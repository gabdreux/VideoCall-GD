import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from '@/socketContext';
import axios from "axios";
import { id } from "date-fns/locale";


type User = {
  id: number;
  name: string;
  email: string;
  // outros campos...
};

const ListaAmigos: React.FC = () => {


  const [friends, setFriends] = useState<User[]>([]);


  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await axios.get('http://localhost:5000/api/friends');
        setFriends(response.data);
      } catch (error) {
        console.error('Erro ao buscar amigos:', error);
      }
    }

    fetchFriends();
  }, []);

  


  const context = useContext(SocketContext);

  if (!context) {
    return null;
  }

  const { me, name, setName, callUser } = context;
  const [idToCall, setIdToCall] = useState('');




  
  const callHandler = () => {
    
    // const idToCall = "1";
    // setIdToCall(idToCall);


    // const name = "gabriel";
    // setName(name);


    // callUser(idToCall);


    if (context) {
      console.log('Valor de me:', context.me);
    }

    // window.location.href = '/videocall';
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
