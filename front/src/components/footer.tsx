import React, { useEffect } from 'react';




const Footer: React.FC = () => {


  useEffect(() => {
    if (window.location.pathname === '/videocall') {
      console.log('videocall page');
      const footer = document.getElementById('footer');
  
      if (footer) {
        footer.classList.add('hidden');
        console.log("classe adicioanda!");
      }
    }
  }, []);
  

  return (

    <footer id="footer" className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">

        <p className="col-md-4 mb-0 text-body-secondary">© 2023 Company, Inc</p>

        <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none navbar-brand">
            <img src='imgs/logo1.png'/>
        </a>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3"><a className="text-body-secondary" href="#"><i className='fab fa-whatsapp'><use href="#"></use></i></a></li>
            <li className="ms-3"><a className="text-body-secondary" href="#"><i className='fab fa-instagram'><use href="#"></use></i></a></li>
            <li className="ms-3"><a className="text-body-secondary" href="#"><i className='fab fa-facebook'><use href="#"></use></i></a></li>
        </ul>

  </footer>


  );
};

export default Footer;









