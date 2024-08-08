import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form, Spinner } from 'react-bootstrap';
import {
  FaSearch,
  FaRedoAlt,
  FaArrowAltCircleLeft /*FaInfoCircle*/,
} from 'react-icons/fa';
import {
  cleanTypeInvoiceSiigo,
  getTypeInvoiceSiigo,
} from '../../../../Redux/ActionsSiigo/actionsSiigo';
import { Link } from 'react-router-dom';

const TypeInvoices = () => {
  const dispatch = useDispatch();
  //const userInfo = useSelector((state) => state.userInfo);
  //const token = userInfo.token;
  //const headers = { Authorization: `Bearer ${token}` };

  const typeInvoices = useSelector((state) => state.typeInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Activar isLoading al comenzar la carga

    dispatch(getTypeInvoiceSiigo(/*headers*/))
      .then(() => setIsLoading(false)) // Desactivar isLoading cuando la carga está completa
      .catch(() => setIsLoading(false));

    return () => {
      dispatch(cleanTypeInvoiceSiigo());
    };
  }, [dispatch /*userInfo*/]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtra los tipos de facturas basados en el término de búsqueda
    const filtered = typeInvoices.filter(
      (type) => type.id.includes(term) || type.electronic_type.includes(term)
    );
    setFilteredInvoices(filtered);
  };

  return (
    <div className="container_tableUsers">
      <Link
        to="/"
        className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
      >
        <FaArrowAltCircleLeft /> Regresar a modulo contable siigo
      </Link>{' '}
      <div className="search-container">
        <FaSearch className="icon_search_1" />
        <Form.Group controlId="searchTerm" className="mb-2">
          <Form.Control
            type="text"
            placeholder="Buscar por ID ó nombre producto"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </Form.Group>
        <FaRedoAlt
          variant="secondary"
          onClick={() => setSearchTerm('')}
          className="icon_search"
        />
      </div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Up...</span>
        </Spinner>
      ) : (
        <Table responsive className="table-info table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>CODIGO</th>
              <th>NOMBRE</th>
              <th>DESCRIPCION</th>
              <th>TIPO</th>
              <th>ACTIVA</th>
              <th>VENDEDOR POR ITEM</th>
              <th>MANEJA CENTRO DE COSTOS</th>
              <th>MANEJA NUMERACIÓN AUTOMATICA</th>
              <th>NUMERO DEL PROXIMO CONSECUTIVO DE FACTURA</th>
              <th>DESCUENTO</th>
              <th>MANEJA DECIMALES</th>
              <th>MANEJA ANTICIPOS</th>
              <th>MANEJA RETEICA</th>
              <th>MANEJA RETEIVA</th>
              <th>MANEJA AUTORETENCION</th>
              <th>VALOR MINIMO AUTORETENCION</th>
              <th>FACTURA ELECTRONICA</th>
              <th>MANEJA INGRESOS PARA TERCEROS</th>
            </tr>
          </thead>
          <tbody>
            {searchTerm === ''
              ? // Si el término de búsqueda está vacío, renderizar todos los productos
                typeInvoices.map((type) => {
                  const active = type.active ? 'SI' : 'NO';
                  const seller_by_item = type.seller_by_item ? 'SI' : 'NO';
                  const cost_center = type.cost_center ? 'SI' : 'NO';
                  const automatic_number = type.automatic_number ? 'SI' : 'NO';
                  const decimals = type.decimals ? 'SI' : 'NO';
                  const advance_payment = type.advance_payment ? 'SI' : 'NO';
                  const reteiva = type.reteiva ? 'SI' : 'NO';
                  const reteica = type.reteica ? 'SI' : 'NO';
                  const self_withholding = type.self_withholding ? 'SI' : 'NO';
                  const customer_by_item = type.customer_by_item ? 'SI' : 'NO';
                  return (
                    <tr key={type.id}>
                      <td>{type.id}</td>
                      <td>{type.code}</td>
                      <td>{type.name}</td>
                      <td>{type.description}</td>
                      <td>{type.type}</td>
                      <td>{active}</td>
                      <td>{seller_by_item}</td>
                      <td>{cost_center}</td>
                      <td>{automatic_number}</td>
                      <td>{type.consecutive}</td>
                      <td>{type.discount_type}</td>
                      <td>{decimals}</td>
                      <td>{advance_payment}</td>
                      <td>{reteiva}</td>
                      <td>{reteica}</td>
                      <td>{self_withholding}</td>
                      <td>{type.self_withholding_limit}</td>
                      <td>{type.electronic_type}</td>
                      <td>{customer_by_item}</td>
                    </tr>
                  );
                })
              : // Si hay un término de búsqueda, renderizar los usuarios filtrados
                filteredInvoices.map((type) => {
                  const active = type.active ? 'SI' : 'NO';
                  const seller_by_item = type.seller_by_item ? 'SI' : 'NO';
                  const cost_center = type.cost_center ? 'SI' : 'NO';
                  const automatic_number = type.automatic_number ? 'SI' : 'NO';
                  const decimals = type.decimals ? 'SI' : 'NO';
                  const advance_payment = type.advance_payment ? 'SI' : 'NO';
                  const reteiva = type.reteiva ? 'SI' : 'NO';
                  const reteica = type.reteica ? 'SI' : 'NO';
                  const self_withholding = type.self_withholding ? 'SI' : 'NO';
                  const customer_by_item = type.customer_by_item ? 'SI' : 'NO';
                  return (
                    <tr key={type.id}>
                      <td>{type.id}</td>
                      <td>{type.code}</td>
                      <td>{type.name}</td>
                      <td>{type.description}</td>
                      <td>{type.type}</td>
                      <td>{active}</td>
                      <td>{seller_by_item}</td>
                      <td>{cost_center}</td>
                      <td>{automatic_number}</td>
                      <td>{type.consecutive}</td>
                      <td>{type.discount_type}</td>
                      <td>{decimals}</td>
                      <td>{advance_payment}</td>
                      <td>{reteiva}</td>
                      <td>{reteica}</td>
                      <td>{self_withholding}</td>
                      <td>{type.self_withholding_limit}</td>
                      <td>{type.electronic_type}</td>
                      <td>{customer_by_item}</td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TypeInvoices;
