import { Container, Row, Col } from 'react-bootstrap';
import './SocialMediaBanner.css';
import { flogo, ilogo } from '../Image/Image';

const SocialMediaBanner = () => {
  return (
    <div className="social-media-banner">
      <Container className="content">
        <Row className="justify-content-center align-items-center text-center">
          <Col md={12}>
            <p className="p_banner">
              Entérate de novedades siguiéndonos en nuestras redes sociales:
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center text-center">
          <Col md={4}>
            <a
              href="https://www.facebook.com/lacteos7maravillas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={flogo} alt="Facebook" className="social-logo" />
            </a>
          </Col>
          <Col md={4}>
            <a
              href="https://www.instagram.com/lacteos_7_maravillas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ilogo} alt="Instagram" className="social-logo" />
            </a>
           
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SocialMediaBanner;
