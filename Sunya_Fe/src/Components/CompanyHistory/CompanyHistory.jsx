import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { playButton, vacas3 } from '../Image/Image';
import './CompanyHistory.css';

const CompanyHistory = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="history-section">
      <video className="background-video" autoPlay loop muted>
        <source src={vacas3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="content-box">
        <h2 className="tittle-mision-vision">Historia</h2>
        <p>
          Lácteos 7 Maravillas, la mejor empresa láctea de Restrepo y Cumaral.
          Nuestra empresa, con años de experiencia, se ha convertido en la
          elección predilecta para los amantes del queso y yogur. En el corazón
          de nuestros productos yace el compromiso con la calidad, desde la
          cuidadosa selección de materias primas locales hasta el proceso
          artesanal que garantiza un sabor inigualable. Transformamos la leche
          fresca de la región en exquisitos quesos, fusionando tradición con
          innovación. Cada bocado es un viaje sensorial, una explosión de
          texturas y sabores que capturan la esencia misma de la tierra.
          Nuestros yogures, cremosos y nutritivos, reflejan nuestro compromiso
          con la salud y el bienestar.
        </p>
      </div>
      <div className="play-button-container" onClick={handleShow}>
      
        <div className="play-button">
       
          <img className="image-5" src={playButton} alt="Play Button" />
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body>
          <Button type="button" className="close" onClick={handleClose}>
            &times;
          </Button>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/VIDEO_ID"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CompanyHistory;
