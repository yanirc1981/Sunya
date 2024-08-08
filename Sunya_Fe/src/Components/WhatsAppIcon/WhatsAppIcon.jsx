import React from 'react';
import './WhatsAppIcon.css';
import {wlogo} from '../Image/Image';

function WhatsAppIcon() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=573125187204&text=Hola%20vengo%20de%20la%20Web.%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos"
      className="whatsapp-icon"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={wlogo} alt="WhatsApp" className="whatsapp-logo" />
    </a>
  );
}

export default WhatsAppIcon;
