import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { logo } from '../Image/Image';
import { NavLink } from 'react-router-dom';
import { FaSignOutAlt, FaLock, FaUserPlus, FaHome } from 'react-icons/fa';
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cleanDetailUser } from '../../Redux/Actions/actions';
import { adminLinks2, cashierLinks, clientLinks } from '../../Links/Links';

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const isClient = userInfo?.user?.id_role === 1;
  const isAdmin = userInfo?.user?.id_role === 3;
  const isCashier = userInfo?.user?.id_role === 2;
  const isSuperAdmin = userInfo?.user?.id_role === 4;
  const handleLogout = () => {
    dispatch(cleanDetailUser());

    history.push('/');
  };

  return (
    <>
      <Navbar expand="lg" className="container_navbar">
        <Container className="container_navbar">
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt="Logo de la empresa"
              width="150px"
              height="auto"
              className="d-inline-block align-top icon_logo_navbar"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/carousel_products"
                className="link_header"
              >
                PRODUCTOS
              </Nav.Link>
              <Nav.Link as={Link} to="/partner" className="link_header">
                ALIADOS
              </Nav.Link>
              <Nav.Link as={Link} to="/company" className="link_header">
                EMPRESA
              </Nav.Link>
              <Nav.Link as={Link} to="/social" className="link_header">
                NOTICIAS
              </Nav.Link>

              {isAdmin || isSuperAdmin ? (
                // Menú del administrador
                <NavDropdown
                  title={<><strong>Bienvenido!, {userInfo.user.name || userInfo.user.nameCompany}. </strong></>}
                  id="collapsible-nav-dropdown"
                >
                  {adminLinks2.map((link, index) => (
                    <NavDropdown.Item key={index} as={NavLink} to={link.path}>
                      {link.icon} {link.text}
                    </NavDropdown.Item>
                  ))}

                  <NavDropdown.Divider />
                  <NavLink to="/">
                    <NavDropdown.Item href="#home">
                      <FaHome /> Inicio
                    </NavDropdown.Item>
                  </NavLink>
                  <NavDropdown.Item href="#home" onClick={handleLogout}>
                    <FaSignOutAlt /> Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : // Menú del cliente
              isClient ? (
                <NavDropdown
                title={<><strong>Bienvenido!, {userInfo.user.name}. </strong></>}
                  id="collapsible-nav-dropdown"
                >
                  {clientLinks.map((link, index) => (
                    <NavDropdown.Item key={index} as={NavLink} to={link.path}>
                      {link.icon} {link.text}
                    </NavDropdown.Item>
                  ))}
                  <NavLink to="/">
                    <NavDropdown.Item href="#home">
                      <FaHome /> Inicio
                    </NavDropdown.Item>
                  </NavLink>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#home" onClick={handleLogout}>
                    <FaSignOutAlt /> Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : isCashier ? (
                <NavDropdown
                title={<><strong>Bienvenido!, {userInfo.user.name}. </strong></>}
                  id="collapsible-nav-dropdown"
                >
                  {cashierLinks.map((link, index) => (
                    <NavDropdown.Item key={index} as={NavLink} to={link.path}>
                      {link.icon} {link.text}
                    </NavDropdown.Item>
                  ))}
                  <NavLink to="/">
                    <NavDropdown.Item href="#home">
                      <FaHome /> Inicio
                    </NavDropdown.Item>
                  </NavLink>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#home" onClick={handleLogout}>
                    <FaSignOutAlt /> Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title="CONECTAR" id="basic-nav-dropdown">
                  <NavLink to="/login">
                    <NavDropdown.Item href="#ingresar">
                      <FaLock /> Iniciar sesión
                    </NavDropdown.Item>
                  </NavLink>
                  <NavLink to="/registrar">
                    <NavDropdown.Item href="#SignUp">
                      <FaUserPlus /> Crear cuenta
                    </NavDropdown.Item>
                  </NavLink>
                  <NavDropdown.Divider />
                  <NavLink to="/">
                    <NavDropdown.Item href="#home">
                      <FaHome /> Inicio
                    </NavDropdown.Item>
                  </NavLink>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
