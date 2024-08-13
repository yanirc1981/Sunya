import {
  FaRegCalendarCheck,
  FaShoppingCart,
  FaShoppingBag,
  FaClipboardList,
  
} from 'react-icons/fa';



export const clientLinks = [
  {
    path: '/cart',
    icon: <FaShoppingCart />,
    text: 'Carrito de compras',
  },
  {
    path: '/orderhistory',
    icon: <FaShoppingBag />,
    text: 'Mis pedidos',
  },
  // {
  //   path: '/',
  //   icon: <FaHome />,
  //   text: 'Inicio',
  // },
];

export const adminLinks = [
  { path: '/admin/users', text: 'USUARIOS' },
  { path: '/admin/customers',  text: 'CLIENTES' },
  { path: '/admin/products',  text: 'PRODUCTOS' },
 
  { path: '/admin/orders',  text: 'PEDIDOS' },
  { path: '/admin/deliverys',  text: 'ENVIOS' },
  { path: '/admin/pays',  text: 'CAJA' },

  
  { path: '/admin/invoice', text: 'FACTURAR' },
  { path: '/admin/invoice_type', text: 'CONSULTAR TIPOS DE FACTURAS' },

];

export const adminLinks2 = [
  {
    path: '/admin/dashboard',
    icon: <FaRegCalendarCheck />,
    text: 'Panel',
  },
  {
    path: '/cart',
    icon: <FaShoppingCart />,
    text: 'Carrito',
  },
  {
    path: '/orderhistory',
    icon: <FaShoppingBag />,
    text: 'Ordenes',
  },
];

export const cashierLinks = [
  {
    path: '/cart',
    icon: <FaShoppingCart />,
    text: 'Carrito de compras',
  },
  {
    path: '/orderhistory',
    icon: <FaShoppingBag />,
    text: 'Pedidos Tienda',
  },
  {
    path: '/products',
    icon: <FaClipboardList />,
    text: 'Tienda',
  },
];
