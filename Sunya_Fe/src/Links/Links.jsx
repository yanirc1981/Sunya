import {
  FaRegCalendarCheck,
  FaShoppingCart,
  FaShoppingBag,
  FaClipboardList,
  
} from 'react-icons/fa';

import {
  FcConferenceCall,
  FcShipped,
  FcCurrencyExchange,
  FcDocument,
  FcShop,
  FcTodoList,
  FcDebt,
  FcList,
  FcViewDetails,
  FcBusinessman,
} from 'react-icons/fc';

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
  { path: '/admin/users', icon: <FcConferenceCall />, text: 'Usuarios' },
  { path: '/admin/customers', icon: <FcBusinessman />, text: 'Clientes' },
  { path: '/admin/products', icon: <FcViewDetails />, text: 'Productos' },
  { path: '/admin/partners', icon: <FcShop />, text: 'Tiendas aliadas' },
  { path: '/admin/orders', icon: <FcList />, text: 'Pedidos' },
  { path: '/admin/deliverys', icon: <FcShipped />, text: 'Despachos' },
  { path: '/admin/pays', icon: <FcCurrencyExchange />, text: 'Caja' },
  {
    path: '/admin/stockStores',
    icon: <FcTodoList />,
    text: 'Asignación stock tiendas',
  },
  {
    path: '/admin/casherStore',
    icon: <FcDebt />,
    text: 'Asignación cajero tienda',
  },
  { path: '/admin/invoice', icon: <FcDocument />, text: 'Generar factura' },
  { path: '/admin/invoice_type', icon: <FcDocument />, text: 'Tipos de facturas creadas en SIIGO' },
  { path: '/admin/invoices_list', icon: <FcDocument />, text: 'Listar facturas generadas en SIIGO' },
];

export const adminLinks2 = [
  {
    path: '/admin/dashboard',
    icon: <FaRegCalendarCheck />,
    text: 'Tablero Administrador',
  },
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
    text: 'Productos Tienda',
  },
];
