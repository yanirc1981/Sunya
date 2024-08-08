import React from 'react';
import './tablelistinvoices.css';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TableListInvoices = () => {
  return (
    <>
     <Link
       to="/admin/dashboard"
        className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover text-black"
      >
        <FaArrowAltCircleLeft /> Regresar a tablero dashboard administrador
      </Link>{' '}
      <div className="container  div_container_table">
        Hola estoy en construcción
      </div>
    </>
  );
};

export default TableListInvoices;
