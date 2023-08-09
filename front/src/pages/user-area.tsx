import React from 'react';


const UserAera: React.FC = () => {


  const handleChamadaClick = () => {
    window.location.href = '/videocall';
  };



  return (

  <div className="container text-center">
    <div className="row align-items-start containerDiv">



      <div className="col-sm-12 col-md-5 col-lg-3">


        <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style={{ width: '100%' }}>



          <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
            <svg className="bi pe-none me-2" width="30" height="24"><use href="#bootstrap"></use></svg>
            <h4>Amigos:</h4>
          </a>



          <div className="container text-center">
            <div className="row align-items-start cards">


              <div className="col-3">

                <div className='containerDiv card'>
                  <a href="/" className="navbar-brand">
                    <img className='userAvatarCard' src='imgs/userAvatar.png'/>
                  </a>
                </div>

              </div>



              <div className="col-9">
                
              <div className='cardInfos'>
                <p>Nome e Sobrenome</p>
                <p>e-mail@seumail.com</p>

                <div className="container text-center card">
                  <div className="row align-items-start">

                    <div className="col">
                      <i className='fas fa-phone'><use href="#"></use></i>
                    </div>

                    <div className="col">
                      <i className='fas fa-trash-alt'><use href="#"></use></i>
                    </div>

                  </div>
                </div>

              </div>

              </div>


            </div>
          </div>




          <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
            <svg className="bi pe-none me-2" width="30" height="24"><use href="#bootstrap"></use></svg>
            <h4>Pedidos pendentes:</h4>
          </a>
          



          <div className="container text-center">
            <div className="row align-items-start cards">


              <div className="col-3">

                <div className='containerDiv card'>
                  <a href="/" className="navbar-brand">
                    <img className='userAvatarCard' src='imgs/userAvatar.png'/>
                  </a>
                </div>

              </div>



              <div className="col-9">
                
              <div className='cardInfos'>
                <p>Nome e Sobrenome</p>
                <p>e-mail@seumail.com</p>

                <div className="container text-center card">
                  <div className="row align-items-start">

                    <div className="col">
                      <i className='fas fa-check'><use href="#"></use></i>
                    </div>

                    <div className="col">
                      <i className='fas fa-close'><use href="#"></use></i>
                    </div>

                  </div>
                </div>

              </div>

              </div>


            </div>
          </div>



        </div>


      </div>




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


  );
};

export default UserAera;