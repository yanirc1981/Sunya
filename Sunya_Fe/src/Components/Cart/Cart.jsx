// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanCartItems,
  deleteProductToCart,
  getCartItems,
  getProducts,
  postAddToCart,
  removeProductToCart,
} from '../../Redux/Actions/actions';
import { SlTrash, SlMinus, SlPlus } from "react-icons/sl";

export default function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  
  const cartItems = useSelector((state) => state.cartItems);
  const id = userInfo?.user?.id;
  const role = userInfo?.user?.id_role;
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);



  useEffect(() => {
    if (userInfo.token) {
      dispatch(getCartItems({ headers, id }));
      dispatch(getProducts());
    }
    return () => {
      dispatch(cleanCartItems());
    };
  }, [dispatch, userInfo.token, headers, id]);

  const updateCartHandler = async (productId, quantity) => {
    try {
      const response = await dispatch(
        postAddToCart({ headers, id, quantity, productId })
      );

      if (response.success) {
        dispatch(cleanCartItems());
        dispatch(getCartItems({ headers, id }));
      }
    } catch (error) {
      console.error('Hubo un error al agregar el producto al carrito:', error);
    }
  };

  const updateCartHandlerRemove = async (productId) => {
    try {
      const response = await dispatch(
        removeProductToCart({ headers, id, productId })
      );
      if (response.success) {
        dispatch(cleanCartItems());
        dispatch(getCartItems({ headers, id }));
      }
    } catch (error) {
      console.error('Hubo un error al remover el producto del carrito:', error);
    }
  };

  const removeItemHandler = async (productId) => {
    try {
      const response = await dispatch(deleteProductToCart({ headers, id, productId }));
      if (response.success) {
        dispatch(cleanCartItems());
        dispatch(getCartItems({ headers, id }));
      }
    } catch (error) {
      console.error('Hubo un error al eliminar el producto del carrito:', error);
    }
  };

  const checkoutHandler = () => {
    if (role === 3 || role === 2) {
      history.push('/shipping2');
    } else {
      history.push("/shipping");
    }
  };

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-600">PRODUCTOS SELECCIONADOS</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          {cartItems.length === 0 ? (
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              Carrito está vacío. <Link to="/products" className="text-blue-500">Ir tienda en línea</Link>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                <li className="bg-gray-100 p-4 rounded-lg text-center">
                  Continuar comprando <Link to="/products" className="text-blue-500"> Ir tienda en línea</Link>
                </li>
                {cartItems.map((item) => (
                  <li key={item.id_product} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-1/3">
                        <img
                          src={item.Product.image}
                          alt={item.Product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <Link to={`/product/${item.id_product}`} className="text-blue-500">{item.Product.name}</Link>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => updateCartHandlerRemove(item.id_product)}
                          disabled={item.quantity === 1}
                        >
                          <SlMinus />
                        </button>
                        <span className="cart-span">{item.quantity}</span>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                          onClick={() => updateCartHandler(item.id_product, 1)}
                          disabled={item.Product.countInStock === 0}
                        >
                          <SlPlus />
                        </button>
                      </div>
                      <div className="ml-4">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                          onClick={() => removeItemHandler(item.id_product)}
                        >
                          <SlTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Resumen</h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cartItems.map((item) => (
             <li key={item.id_product} className="py-2 flex justify-between">
             <span>{item.Product.name}</span>
             <span>{item.quantity} x ${Number(item.Product.price).toFixed(2)}</span>
           </li>
           
            ))}
          </ul>
          <div className="flex justify-between mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">${cartItems.reduce((acc, item) => acc + item.quantity * item.Product.price, 0).toFixed(2)}</span>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
          >
            Continuar con el proceso de pago
          </button>
        </div>
      </div>
    </div>
  );
}
