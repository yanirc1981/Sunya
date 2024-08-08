import { escudo, restrepo, sena, emprender } from '../Image/Image';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-overlay">
          <div className="container d-flex flex-column flex-md-row  align-items-center container_footer">
            
              <img className="footer-image image-1" src={escudo} alt="Escudo" />
              <img
                className="footer-image image-2"
                src={restrepo}
                alt="Restrepo"
              />
              <img
                className="footer-image image-2"
                src={emprender}
                alt="Fondo emprender"
              />
              <img className="footer-image image-3" src={sena} alt="Sena" />
           
          </div>
          <span className="mb-2 mb-md-0">
            Copyright &copy; All rights reserved.
          </span>
          <span>By CodeDesarrolladores</span>
        </div>
      </footer>
    </div>
  );
}
