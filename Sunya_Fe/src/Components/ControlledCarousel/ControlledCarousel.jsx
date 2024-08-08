import './controlledcarousel.css';
import { vacas3 } from '../Image/Image'; 
import {logoA} from '../Image/Image'; 

function ControlledCarousel() {
  return (
    <div className="video-container">
      <video className="background-video" autoPlay loop muted>
        <source src={vacas3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay"></div>

      <div className="watermark">
        <img
          src={logoA}
          alt="Logo de la empresa"
          className="watermark-logo"
        />
      </div>
      <div className="container_scroll">
      <div className="scroll-text">
          <span>Desliza</span>
          <span>hacia</span>
          <span>abajo</span>
        </div>
        <div className="field">
          <div className="mouse"></div>
        </div>
      </div>
    </div>
  );
}

export default ControlledCarousel;
