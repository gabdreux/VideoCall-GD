import React from 'react';


const UserAera: React.FC = () => {
  return (

  <div className="container text-center">
    <div className="row align-items-start containerDiv">

      <div className="col-3 no-mobile">
        One of three columns
      </div>





    <div className="col-6">
        
      < div className="containerDiv">
        <form className="loginForm" data-bitwarden-watching="1">

            

            <div className='containerDiv'>
              <a href="/" className="navbar-brand">
                <img className='userAvatar' src='imgs/logo4.png'/>
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


            <button className="btn btn-primary w-100 py-2" type="submit">INICIAR CHAMADA ALEATÓRIA</button>


        </form>
      </div>

    </div>






      <div className="col-3 no-mobile">
        One of three columns
      </div>


    </div>
  </div>


  );
};

export default UserAera;