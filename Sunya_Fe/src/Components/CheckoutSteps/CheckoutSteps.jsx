import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./checkoutsteps.css"

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Login</Col>
      <Col className={props.step2 ? 'active' : ''}>Datos</Col>
      <Col className={props.step3 ? 'active' : ''}>Metodo pago</Col>
      <Col className={props.step4 ? 'active' : ''}>Generar pedido</Col>
    </Row>
  );
}
