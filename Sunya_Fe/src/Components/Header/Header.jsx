import { Link, NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cleanDetailUser } from '../../Redux/Actions/actions';
import { adminLinks2, cashierLinks, clientLinks } from '../../Links/Links';
import logo from '../../assets/img/logoSunya.png';
import './header.css';
import React, { useState, useRef, useEffect } from 'react';

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const isClient = userInfo?.user?.id_role === 1;
  const isAdmin = userInfo?.user?.id_role === 3;
  const isCashier = userInfo?.user?.id_role === 2;
  const isSuperAdmin = userInfo?.user?.id_role === 4;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(cleanDetailUser());
    history.push('/');
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-yellow-200">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex space-x-7">
            <Link to="/" className="items-center flex-shrink-0 h-32 w-32 sm:block hidden mt-6">
              <img src={logo} alt="Company Logo" className="h-full w-full object-contain" />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6 ">
            {/* <NavLink to="/carousel_products" className="py-3 px-2 text-gray-700  hover:text-white hover:bg-green-500 rounded-md  text-sm font-medium">
              PRODUCTOS
            </NavLink> */}
            {/* <NavLink to="/partner" className="py-4 px-2 text-gray-500 hover:text-green-500">
              ALIADOS
            </NavLink> */}
            <NavLink to="/company" className="py-3 px-2 text-gray-500  hover:text-white hover:bg-green-500 rounded-md  text-sm font-medium">
              Quienes Somos?
            </NavLink>
            <NavLink to="/social" className="py-3 px-2 text-gray-500  hover:text-white hover:bg-green-500 rounded-md  text-sm font-medium">
              Contáctanos
            </NavLink>

            {isAdmin || isSuperAdmin || isClient || isCashier ? (
              <div className="relative inline-block text-left" ref={dropdownRef}>
                <div>
                  <button onClick={handleToggleDropdown} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {userInfo.user.name || userInfo.user.nameCompany}
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {isAdmin || isSuperAdmin ? adminLinks2.map((link, index) => (
                        <NavLink key={index} to={link.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                           {link.text}
                        </NavLink>
                      )) : isClient ? clientLinks.map((link, index) => (
                        <NavLink key={index} to={link.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                           {link.text}
                        </NavLink>
                      )) : isCashier && cashierLinks.map((link, index) => (
                        <NavLink key={index} to={link.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                           {link.text}
                        </NavLink>
                      ))}
                      <div className="border-t border-gray-100"></div>
                      <NavLink to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Inicio
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative inline-block text-left" ref={dropdownRef}>
                <div>
                  <button onClick={handleToggleDropdown} type="button" className=" inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-botonVerde text-sm font-medium text-white hover:bg-green-600">
                    Ingresar
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <NavLink to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Iniciar Sesión
                      </NavLink>
                      <NavLink to="/registrar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Crear Cuenta
                      </NavLink>
                      <div className="border-t border-gray-100"></div>
                      <NavLink to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                         Inicio
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

