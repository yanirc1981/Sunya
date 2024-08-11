import axios from 'axios';

import {
  CLEAN_ACCOUNT_GROUP,
  CLEAN_COST_CENTER_SIIGO,
  CLEAN_CUSTOMERS_SIIGO,
  CLEAN_CUSTOMER_BY_ID,
  CLEAN_CUSTOMER_DETAIL,
  CLEAN_INVOICE_BY_ID,
  CLEAN_PAYMENTS_TYPE_SIIGO,
  CLEAN_PRODUCTS_SIIGO,
  CLEAN_PRODUCT_BY_ID,
  CLEAN_TAXES,
  CLEAN_TYPE_INVOICE,
  CLEAN_USERS_SIIGO,
  CREATE_CUSTOMER_SIIGO,
  CREATE_PRODUCT_SIIGO,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  DELETE_PRODUCT_BY_ID,
  GET_ACCOUNT_GROUP,
  GET_COST_CENTER_SIIGO,
  GET_CUSTOMERS_SIIGO,
  GET_CUSTOMER_BY_ID,
  GET_INVOICE_BY_ID,
  GET_PAYMENTS_TYPE_SIIGO,
  GET_PRODUCTS_SIIGO,
  GET_PRODUCT_SIIGO_BY_ID,
  GET_TAXES,
  GET_TYPE_INVOICE,
  GET_USERS_SIIGO,
  POST_GENERATE_INVOICE,
  PUT_CUSTOMER_SIIGO,
  PUT_PRODUCT_SIIGO,
} from './actions-types-siigo';


const BASE_URL = 'http://localhost:3001';

export const createCustomerSiigo = (input) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/createCustomers`;

    const { data } = await axios.post(url, input);
    dispatch({ type: CREATE_CUSTOMER_SIIGO, payload: data.data });
    return { success: true };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};

export const getCustomersSiigo = (/*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/customers`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_CUSTOMERS_SIIGO, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getCustomerById = (id /*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/customer/${id}`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_CUSTOMER_BY_ID, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const updateCustomerSiigo = (id, newData) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/customer/${id}`;
    // Pasa newData como el segundo argumento de axios.put
    const { data } = await axios.put(url, newData);

    dispatch({ type: PUT_CUSTOMER_SIIGO, payload: data }); // Actualiza el estado con los datos actualizados
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getAccountGroup = (/*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/account-group`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_ACCOUNT_GROUP, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getTaxes = (/*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/taxes`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_TAXES, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getCostCenters = (/*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/costCenters`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_COST_CENTER_SIIGO, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};


export const getUsersSiigo = (/*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/users`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_USERS_SIIGO, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const createProductSiigo = (headers, input) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/createProducts`;
    const { data } = await axios.post(url, input, { headers });
    dispatch({ type: CREATE_PRODUCT_SIIGO, payload: data.data });
    if (data.data && data.data.id) {
      return { success: true, id: data.data.id };
    }
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
};

export const getProductById = (id /*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/product/${id}`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_PRODUCT_SIIGO_BY_ID, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const deleteProductById = (id /*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/product/${id}`;
    await axios.delete(url /*{ headers }*/);

    dispatch({ type: DELETE_PRODUCT_BY_ID });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getProductsSiigo = (/*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/products`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_PRODUCTS_SIIGO, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getCustomerDetailsByIdentification =
  (identification) => async (dispatch) => {
    try {
      dispatch({ type: CUSTOMER_DETAILS_REQUEST });
      const { data } = await axios.get(
        `${BASE_URL}/siigo/customers/${identification}`
      );
      dispatch({
        type: CUSTOMER_DETAILS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_DETAILS_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

export const updateProductSiigo = (id, newData) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/product/${id}`;
    // Pasa newData como el segundo argumento de axios.put
    const { data } = await axios.put(url, newData);

    dispatch({ type: PUT_PRODUCT_SIIGO, payload: data }); // Actualiza el estado con los datos actualizados
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getTypeInvoiceSiigo = (/*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/invoice/type`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_TYPE_INVOICE, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getPaymentsTypeSiigo = (/*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/invoice/payments_type`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_PAYMENTS_TYPE_SIIGO, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const getInvoiceById = (id /*{ headers }*/) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/siigo/invoice/${id}`;
    const { data } = await axios.get(url /*{ headers }*/);

    dispatch({ type: GET_INVOICE_BY_ID, payload: data.data });
    return { success: true }; // Indica que la solicitud fue exitosa
  } catch (error) {
    return { success: false, errorMessage: error.message }; // Indica que hubo un error con un mensaje específico
  }
};

export const postGenerateInvoice =
  ( info, headers ) =>
    
  async (dispatch) => {
    
    try {
      const url = `${BASE_URL}/siigo/invoice`;
      await axios.post(url, info, { headers });

      dispatch({ type: POST_GENERATE_INVOICE });
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: error.message };
    }
  };

export const cleanCustomersSiigo = () => {
  try {
    return {
      type: CLEAN_CUSTOMERS_SIIGO,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanCustomerById = () => {
  try {
    return {
      type: CLEAN_CUSTOMER_BY_ID,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanAccountGroup = () => {
  try {
    return {
      type: CLEAN_ACCOUNT_GROUP,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanTaxes = () => {
  try {
    return {
      type: CLEAN_TAXES,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanCostCenters = () => {
  try {
    return {
      type: CLEAN_COST_CENTER_SIIGO,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanUsers = () => {
  try {
    return {
      type: CLEAN_USERS_SIIGO,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanProductById = () => {
  try {
    return {
      type: CLEAN_PRODUCT_BY_ID,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanProductsSiigo = () => {
  try {
    return {
      type: CLEAN_PRODUCTS_SIIGO,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanTypeInvoiceSiigo = () => {
  try {
    return {
      type: CLEAN_TYPE_INVOICE,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanPaymentsTypeSiigo = () => {
  try {
    return {
      type: CLEAN_PAYMENTS_TYPE_SIIGO,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanInvoiceById = () => {
  try {
    return {
      type: CLEAN_INVOICE_BY_ID,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const cleanCustomerDetails = () => {
  try {
    return {
      type: CLEAN_CUSTOMER_DETAIL,
    };
  } catch (error) {
    throw new Error(error);
  }
};
