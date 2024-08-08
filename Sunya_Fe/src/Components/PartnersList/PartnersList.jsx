import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import {
  cleanPartnersAdmin,
  getPartnersAdmin,
  updatePartnerStatus,
} from '../../Redux/Actions/actions';
import { Image, Modal, Spinner, Table } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import ToggleButton from '../ToggleButton';
import EditPartner from '../EditPartner/EditPartner';
import NewPartner from '../NewPartner/NewPartner';



export default function PartnersList() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [createdPartner, setCreatedPartner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalA, setShowModalA] = useState(false);
  const [error, setError] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const partners = useSelector((state) => state.partnersAdmin);

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };
    dispatch(getPartnersAdmin({ headers }))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

    return () => {
      dispatch(cleanPartnersAdmin());
    };
  }, [dispatch, userInfo]);

  const handleEdit = (partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPartner(null);
    setShowModal(false);
  };

  const createHandler = async () => {
    setCreatedPartner(true);
    setShowModalA(true);
  };

  const handleCloseModalA = () => {
    setCreatedPartner(false);
    setShowModalA(false);
  };

  const upDateHandler = async (partner) => {
    const updatedData = {
      active: !partner.active,
      id: partner.id,
    };

    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };
    const response = await dispatch(
      updatePartnerStatus({ headers, updatedData })
    );
    if (response.success) {
      await dispatch(cleanPartnersAdmin());
      await dispatch(getPartnersAdmin({ headers }));
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h2>Nuestros Aliados</h2>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              <MdAddCircle /> Crear nuevo aliado
            </Button>
          </div>
        </Col>
      </Row>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Table responsive className="table table-hover table-striped">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>IMAGEN</th>
                <th>NOMBRE</th>
                <th>DIRECCION</th>
                <th>MUNICIPIO</th>
                <th>DEPARTAMENTO</th>
                <th>TELEFONO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td>{partner.id}</td>
                  <td>
                    <Image
                      src={partner.image}
                      roundedCircle
                      className="image_product"
                    />
                  </td>
                  <td>{partner.name}</td>
                  <td>{partner.address}</td>
                  <td>{partner.city}</td>
                  <td>{partner.country}</td>
                  <td>{partner.phone}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      title="Editar"
                      onClick={() => handleEdit(partner)}
                    >
                      <FaEdit className="icon_edit" />
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => upDateHandler(partner)}
                    >
                      <ToggleButton status={partner.active} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {selectedPartner && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {' '}
              <h2>
                Editar información de la tienda aliada con ID:{' '}
                {selectedPartner.id}
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditPartner
              partner={selectedPartner}
              setShowModal={setShowModal}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {createdPartner && (
        <Modal show={showModalA} onHide={handleCloseModalA}>
          <Modal.Header closeButton>
            <Modal.Title>
              {' '}
              <h2>Formulario nueva tienda aliada</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewPartner setShowModalA={setShowModalA} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalA}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
