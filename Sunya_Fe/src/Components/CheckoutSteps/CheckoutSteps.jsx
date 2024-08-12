/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './checkoutsteps.css';

export default function CheckoutSteps(props) {
  return (
    <div className="flex gap-4 items-center mb-6 mt-4">
      <div className={`flex-1 text-center tx-xl py-2 ${props.step1 ? 'bg-botonVerde text-white' : 'bg-gray-200 text-gray-600'}`}>
        Login
      </div>
      <div className={`flex-1 text-center tx-xl py-2 ${props.step2 ? 'bg-botonVerde text-white' : 'bg-gray-200 text-gray-600'}`}>
        Datos
      </div>
      <div className={`flex-1 text-center tx-xl py-2 ${props.step3 ? 'bg-botonVerde text-white' : 'bg-gray-200 text-gray-600'}`}>
        Metodo pago
      </div>
      <div className={`flex-1 text-center tx-xl py-2 ${props.step4 ? 'bg-botonVerde text-white' : 'bg-gray-200 text-gray-600'}`}>
        Generar pedido
      </div>
    </div>
  );
}

