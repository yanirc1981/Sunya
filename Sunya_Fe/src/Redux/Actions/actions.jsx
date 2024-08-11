import axios from 'axios';
import {
  CLEAN_PRODUCT,
  CLEAN_PRODUCTS,
  CLEAN_DETAIL_USER,
  CLEAN_USERS_ADMIN,
  CLEAN_USERS_ORDERS,
  CREATE_USER,
  GET_PRODUCT_BY_ID,
  EDIT_USER,
  EDIT_USER_ADMIN,
  GET_USERS_ADMIN,
  GET_USERS_ORDERS,
  INFO_PRODUCTS,
  SIGNIN_USER,
  ADD_PRODUCT_CART,
  GET_CART_ITEMS,
  CLEAN_CART_ITEMS,
  REMOVE_PRODUCT_CART,
  DELETE_PRODUCT_CART,
  UPDATE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  CREATE_ORDER,
  CLEAN_SHIPPING_ADDRESS,
  CLEAN_PAYMENT_METHOD,
  CLEAN_ORDER,
  DELETE_CART_USER,
  GET_ORDERS_USER,
  GET_ORDER_BY_ID,
  CLEAN_ORDERS_USER,
  EDIT_PRODUCT_ADMIN,
  PUT_STATUS_PRODUCT,
  GET_PRODUCTS_ADMIN,
  CLEAN_PRODUCTS_ADMIN,
  POST_NEW_PRODUCT,
  INFO_STORES,
  ASSIGN_STOCK_STORE,
  CLEAN_INFO_STORES,
  ASSIGN_CASHER_STORE,
  PUT_ORDER_PAYMENTRESULT,
  PUT_ORDER_DELIVERY,
  GET_PARTNERS,
  CLEAN_PARTNERS,
  GET_PARTNERS_ADMIN,
  CLEAN_PARTNERS_ADMIN,
  PUT_STATUS_PARTNER,
  EDIT_PARTNER_ADMIN,
  POST_NEW_PARTNER,
  GET_CUSTOMERS_ADMIN,
  CLEAN_CUSTOMERS_ADMIN,
} from './actions-types';


const BASE_URL = 'http://localhost:3001';

export const createUser = (input) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/auth/signup`;
    const { data } = await axios.post(url, input);
    dispatch({ type: CREATE_USER, payload: data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const postUserInfo = (input) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/auth/login`;
    const { data } = await axios.post(url, input);
    dispatch({ type: SIGNIN_USER, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getProductById = (id_product) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/product/${id_product}`;
    const { data } = await axios.get(url);
    dispatch({ type: GET_PRODUCT_BY_ID, payload: data.data });
    return { success: true }; 
    } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    const url = `${BASE_URL}/product/products`;
    const { data } = await axios.get(url);
    dispatch({ type: INFO_PRODUCTS, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getPartners = () => async (dispatch) => {
  try {
    const url = `${BASE_URL}/partner/`;
    const { data } = await axios.get(url);
    dispatch({ type: GET_PARTNERS, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getStores = () => async (dispatch) => {
  try {
    const url = `${BASE_URL}/store/stores`;
    const { data } = await axios.get(url);
    dispatch({ type: INFO_STORES, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const editUser =
  ({ headers, updatedData }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/user/edit`;
      const { data } = await axios.put(url, updatedData, { headers });
      dispatch({ type: EDIT_USER, payload: data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const getCartItems =
  ({ headers, id }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/cart/${id}`;
      const { data } = await axios.get(url, { headers });
      dispatch({ type: GET_CART_ITEMS, payload: data.data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const postAddToCart =
  ({ headers, id, quantity, productId }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/cart?id=${id}&quantity=${quantity}&productId=${productId}`;
      await axios.post(url, {}, { headers });
      dispatch({ type: ADD_PRODUCT_CART });

      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const removeProductToCart =
  ({ headers, id, productId }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/cart?id=${id}&productId=${productId}`;
      await axios.delete(url, { headers });
      dispatch({ type: REMOVE_PRODUCT_CART });

      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const deleteProductToCart =
  ({ headers, id, productId }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/cart/delete?id=${id}&productId=${productId}`;
      await axios.delete(url, { headers });
      dispatch({ type: DELETE_PRODUCT_CART });

      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const getOrdersUser =
  ({ headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/order/mine`;
      const { data } = await axios.get(url, { headers });

      dispatch({ type: GET_ORDERS_USER, payload: data.data });

      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const updateShippingAddress = (shippingData) => ({
  type: UPDATE_SHIPPING_ADDRESS,
  payload: shippingData,
});

export const saveMethodPayment = (input) => ({
  type: SAVE_PAYMENT_METHOD,
  payload: input,
});

export const postOrder =
  ({ info, headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/order`;
      const { data } = await axios.post(url, info, { headers });
      const orderId = data.data.id;
      dispatch({ type: CREATE_ORDER, payload: data.data });
      return { success: true, orderId }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const getOrderById =
  ({ orderId, headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/order/${orderId}`;
      const { data } = await axios.get(url, { headers });

      dispatch({ type: GET_ORDER_BY_ID, payload: data.data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const deleteCartUser =
  ({ headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/cart/cart`;
      await axios.delete(url, { headers });
      dispatch({ type: DELETE_CART_USER });

      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const getUsersAdmin =
  ({ headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/users`;
      const { data } = await axios.get(url, { headers });
      dispatch({ type: GET_USERS_ADMIN, payload: data.data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const getCustomersAdmin =
  ({ headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/customers`;
      const { data } = await axios.get(url, { headers });
      dispatch({ type: GET_CUSTOMERS_ADMIN, payload: data.data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const editUserInfoAdmin =
  ({ headers, updatedData }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/user`;
      const { data } = await axios.put(url, updatedData, { headers });
      dispatch({ type: EDIT_USER_ADMIN, payload: data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const getOrdersUsers =
  ({ headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/orders`;
      const { data } = await axios.get(url, { headers });
      dispatch({ type: GET_USERS_ORDERS, payload: data.data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const editProductInfoAdmin =
  ({ headers, updatedData }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/product`;
      const { data } = await axios.put(url, updatedData, { headers });
      dispatch({ type: EDIT_PRODUCT_ADMIN, payload: data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const editPartnerInfoAdmin =
  ({ headers, updatedData }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/partner`;
      const { data } = await axios.put(url, updatedData, { headers });
      dispatch({ type: EDIT_PARTNER_ADMIN, payload: data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const updateProductStatus =
  ({ headers, updatedData }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/product/status`;
      const { data } = await axios.put(url, updatedData, { headers });
      dispatch({ type: PUT_STATUS_PRODUCT, payload: data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const updatePartnerStatus =
  ({ headers, updatedData }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/partner/status`;
      const { data } = await axios.put(url, updatedData, { headers });
      dispatch({ type: PUT_STATUS_PARTNER, payload: data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const getProductsAdmin =
  ({ headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/products`;
      const { data } = await axios.get(url, { headers });
      dispatch({ type: GET_PRODUCTS_ADMIN, payload: data.data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const getPartnersAdmin =
  ({ headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/partners`;
      const { data } = await axios.get(url, { headers });
      dispatch({ type: GET_PARTNERS_ADMIN, payload: data.data });
      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const postNewProduct = (headers, data) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/admin/products`;
    await axios.post(url, data, { headers });
    dispatch({ type: POST_NEW_PRODUCT });

    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const postNewPartner =
  ({ headers, data }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/partners`;
      await axios.post(url, data, { headers });
      dispatch({ type: POST_NEW_PARTNER });

      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const postAssignStockStore =
  ({ headers, data }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/assign_stock`;
      await axios.post(url, data, { headers });
      dispatch({ type: ASSIGN_STOCK_STORE });

      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const postAssignCasherStore =
  ({ headers, data }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/admin/assign_casher`;
      await axios.post(url, data, { headers });
      dispatch({ type: ASSIGN_CASHER_STORE });

      return { success: true }; // Indica que la solicitud fue exitosa
    } catch (error) {
      return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
    }
  };

export const putOrderPaymentResult =
  ({ orderId, data, headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/order/paymentResult`;
      // Realiza la solicitud PUT
      await axios.put(url, { id: orderId, data }, { headers });

      // Despacha la acción de éxito
      dispatch({ type: PUT_ORDER_PAYMENTRESULT });

      // Retorna que la solicitud fue exitosa
      return { success: true };
    } catch (error) {
      // Retorna que hubo un error con un mensaje específico
      return { success: false, errorMessage: error.message };
    }
  };

export const putOrderDelivery =
  ({ orderId, data, headers }) =>
  async (dispatch) => {
    try {
      const url = `${BASE_URL}/order/delivery`;
      // Realiza la solicitud PUT
      await axios.put(url, { id: orderId, data }, { headers });

      // Despacha la acción de éxito
      dispatch({ type: PUT_ORDER_DELIVERY });

      // Retorna que la solicitud fue exitosa
      return { success: true };
    } catch (error) {
      // Retorna que hubo un error con un mensaje específico
      return { success: false, errorMessage: error.message };
    }
  };

export const cleanDetailUser = () => {
  try {
    return {
      type: CLEAN_DETAIL_USER,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanProducts = () => {
  try {
    return {
      type: CLEAN_PRODUCTS,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanPartners = () => {
  try {
    return {
      type: CLEAN_PARTNERS,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanProductsAdmin = () => {
  try {
    return {
      type: CLEAN_PRODUCTS_ADMIN,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanPartnersAdmin = () => {
  try {
    return {
      type: CLEAN_PARTNERS_ADMIN,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanProduct = () => {
  try {
    return {
      type: CLEAN_PRODUCT,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanCartItems = () => {
  try {
    return {
      type: CLEAN_CART_ITEMS,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanShippingAddress = () => {
  try {
    return {
      type: CLEAN_SHIPPING_ADDRESS,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanPaymentMethod = () => {
  try {
    return {
      type: CLEAN_PAYMENT_METHOD,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanOrder = () => {
  try {
    return {
      type: CLEAN_ORDER,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanOrdersUser = () => {
  try {
    return {
      type: CLEAN_ORDERS_USER,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanUsersAdmin = () => {
  try {
    return {
      type: CLEAN_USERS_ADMIN,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanCustomersAdmin = () => {
  try {
    return {
      type: CLEAN_CUSTOMERS_ADMIN,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanUsersOrders = () => {
  try {
    return {
      type: CLEAN_USERS_ORDERS,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanInfoStores = () => {
  try {
    return {
      type: CLEAN_INFO_STORES,
    };
  } catch (error) {
    throw new Error(error);
  }
};
/*-------------------------------------------------------------------------------------------------------------------*/
