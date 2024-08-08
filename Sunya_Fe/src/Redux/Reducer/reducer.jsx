import {
  CLEAN_PRODUCT,
  CLEAN_PRODUCTS,
  CLEAN_DETAIL_USER,
  CLEAN_TOTAL_ORDERS,
  CLEAN_USERS_ADMIN,
  CLEAN_USERS_ORDERS,
  CLEAN_USERS_PAYS,
  CLEAN_USER_PAYS,
  ADD_PRODUCT_CART,
  CREATE_USER,
  GET_PRODUCT_BY_ID,
  EDIT_USER,
  EDIT_USER_ADMIN,
  GET_PAYS,
  GET_USERS_ADMIN,
  GET_USERS_ORDERS,
  GET_USERS_PAYS,
  INCREASE_ORDERS,
  INFO_PRODUCTS,
  SIGNIN_USER,
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
  POST_NEW_PARTNER,
  CLEAN_CUSTOMERS_ADMIN,
  GET_CUSTOMERS_ADMIN,
} from '../Actions/actions-types';

import {
  CLEAN_ACCOUNT_GROUP,
  CLEAN_COST_CENTER_SIIGO,
  CLEAN_CUSTOMERS_SIIGO, //
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
} from '../ActionsSiigo/actions-types-siigo';

const initialState = {
  userInfo: {},
  products: [],
  partners: [],
  stores: [],
  productsAdmin: [],
  partnersAdmin: [],
  product: {},
  cartItems: [],
  shippingAddress: {},
  paymentMethod: '',
  order: {},
  orders: [],
  userPays: [],
  users: [],
  customersDataBase: [],
  usersOrders: [],
  usersPays: [],
  totalOrders: 0,
  //------------------------------------------SIIGO---------------------------------------------------------//
  customers: [], //
  accounts: [], //
  taxes: [], //
  costCenters: [],
  productId: {}, //
  products_siigo: [], //
  customerId: {}, //
  typeInvoices: [], //
  usersSiigo: [], //
  paymentsType: [], //
  invoiceId: {},
  customer: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
      };
    case SIGNIN_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
    case INFO_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PARTNERS:
      return {
        ...state,
        partners: action.payload,
      };
    case INFO_STORES:
      return {
        ...state,
        stores: action.payload,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
      };
    case ADD_PRODUCT_CART:
      return {
        ...state,
      };
    case REMOVE_PRODUCT_CART:
      return {
        ...state,
      };
    case DELETE_PRODUCT_CART:
      return {
        ...state,
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case UPDATE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case DELETE_CART_USER:
      return {
        ...state,
        cartItems: [],
      };
    case CREATE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case GET_ORDER_BY_ID:
      return {
        ...state,
        order: action.payload,
      };
    case GET_ORDERS_USER:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_PAYS:
      return {
        ...state,
        userPays: action.payload,
      };
    case GET_USERS_ADMIN:
      return {
        ...state,
        users: action.payload,
      };
    case GET_CUSTOMERS_ADMIN:
      return {
        ...state,
        customersDataBase: action.payload,
      };
    case GET_USERS_ORDERS:
      return {
        ...state,
        usersOrders: action.payload,
      };
    case GET_USERS_PAYS:
      return {
        ...state,
        usersPays: action.payload,
      };
    case GET_PRODUCTS_ADMIN:
      return {
        ...state,
        productsAdmin: action.payload,
      };
    case GET_PARTNERS_ADMIN:
      return {
        ...state,
        partnersAdmin: action.payload,
      };
    case EDIT_USER_ADMIN:
      return {
        ...state,
      };
    case EDIT_PRODUCT_ADMIN:
      return {
        ...state,
      };
    case EDIT_USER:
      return {
        ...state,
      };
    case PUT_STATUS_PRODUCT:
      return {
        ...state,
      };
    case PUT_STATUS_PARTNER:
      return {
        ...state,
      };
    case PUT_ORDER_PAYMENTRESULT:
      return {
        ...state,
      };
    case PUT_ORDER_DELIVERY:
      return {
        ...state,
      };
    case POST_NEW_PRODUCT:
      return {
        ...state,
      };
    case POST_NEW_PARTNER:
      return {
        ...state,
      };

    case INCREASE_ORDERS:
      return {
        ...state,
        totalOrders: state.totalOrders + 1,
      };

    case ASSIGN_STOCK_STORE:
      return {
        ...state,
      };
    case ASSIGN_CASHER_STORE:
      return {
        ...state,
      };
    case CLEAN_PRODUCTS: //
      return {
        ...state,
        products: [],
      };
    case CLEAN_PARTNERS:
      return {
        ...state,
        partners: [],
      };
    case CLEAN_PRODUCTS_ADMIN: //
      return {
        ...state,
        productsAdmin: [],
      };
    case CLEAN_PARTNERS_ADMIN: //
      return {
        ...state,
        partnersAdmin: [],
      };
    case CLEAN_DETAIL_USER: //
      return {
        ...state,
        userInfo: {},
      };
    case CLEAN_PRODUCT: //
      return {
        ...state,
        product: {},
      };
    case CLEAN_CART_ITEMS: //
      return {
        ...state,
        cartItems: [],
      };
    case CLEAN_SHIPPING_ADDRESS: //
      return {
        ...state,
        shippingAddress: null,
      };
    case CLEAN_PAYMENT_METHOD: //
      return {
        ...state,
        paymentMethod: null,
      };
    case CLEAN_ORDER: //
      return {
        ...state,
        order: {},
      };
    case CLEAN_INFO_STORES:
      return {
        ...state,
        stores: [],
      };
    case CLEAN_ORDERS_USER:
      return {
        ...state,
        orders: [],
      };
    case CLEAN_USER_PAYS:
      return {
        ...state,
        userPays: [],
      };
    case CLEAN_USERS_ADMIN:
      return {
        ...state,
        users: [],
      };
    case CLEAN_CUSTOMERS_ADMIN:
      return {
        ...state,
        customersDataBase: [],
      };
    case CLEAN_USERS_ORDERS:
      return {
        ...state,
        usersOrders: [],
      };
    case CLEAN_USERS_PAYS:
      return {
        ...state,
        usersPays: [],
      };

    case CLEAN_TOTAL_ORDERS:
      return {
        ...state,
        totalOrders: 0,
      };

    //-------------------------------SIIGO --------------------------//
    case CREATE_CUSTOMER_SIIGO:
      return {
        ...state,
      };
    case GET_CUSTOMERS_SIIGO:
      return {
        ...state,
        customers: action.payload,
      };
    case GET_CUSTOMER_BY_ID:
      return {
        ...state,
        customerId: action.payload,
      };
    case CUSTOMER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };
    case CUSTOMER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload || 'An error occurred',
      };
    case PUT_CUSTOMER_SIIGO:
      return {
        ...state,
      };
    case GET_ACCOUNT_GROUP:
      return {
        ...state,
        accounts: action.payload,
      };
    case GET_TAXES:
      return {
        ...state,
        taxes: action.payload,
      };
      case GET_COST_CENTER_SIIGO:
        return {
          ...state,
          costCenters: action.payload,
        };
    case GET_USERS_SIIGO:
      return {
        ...state,
        usersSiigo: action.payload,
      };
    case CREATE_PRODUCT_SIIGO:
      return {
        ...state,
      };
    case GET_PRODUCT_SIIGO_BY_ID:
      return {
        ...state,
        productId: action.payload,
      };
    case GET_PRODUCTS_SIIGO:
      return {
        ...state,
        products_siigo: action.payload,
      };
    case PUT_PRODUCT_SIIGO:
      return {
        ...state,
      };
    case DELETE_PRODUCT_BY_ID:
      return {
        ...state,
      };
    case GET_TYPE_INVOICE:
      return {
        ...state,
        typeInvoices: action.payload,
      };
    case GET_PAYMENTS_TYPE_SIIGO:
      return {
        ...state,
        paymentsType: action.payload,
      };
    case GET_INVOICE_BY_ID:
      return {
        ...state,
        invoiceId: action.payload,
      };
    case POST_GENERATE_INVOICE:
      return {
        ...state,
      };
    case CLEAN_CUSTOMERS_SIIGO:
      return {
        ...state,
        customers: [],
      };
    case CLEAN_CUSTOMER_BY_ID:
      return {
        ...state,
        customerId: {},
      };
    case CLEAN_ACCOUNT_GROUP:
      return {
        ...state,
        accounts: [],
      };
    case CLEAN_TAXES:
      return {
        ...state,
        taxes: [],
      };
      case CLEAN_COST_CENTER_SIIGO:
      return {
        ...state,
        costCenters: [],
      };
    case CLEAN_USERS_SIIGO:
      return {
        ...state,
        usersSiigo: [],
      };
    case CLEAN_PRODUCT_BY_ID:
      return {
        ...state,
        productId: {},
      };
    case CLEAN_PRODUCTS_SIIGO:
      return {
        ...state,
        products_siigo: [],
      };
    case CLEAN_TYPE_INVOICE:
      return {
        ...state,
        typeInvoices: [],
      };
    case CLEAN_PAYMENTS_TYPE_SIIGO:
      return {
        ...state,
        paymentsType: [],
      };
    case CLEAN_INVOICE_BY_ID:
      return {
        ...state,
        invoiceId: {},
      };
    case CLEAN_CUSTOMER_DETAIL:
      return {
        ...state,
        customer: {},
      };
    default:
      return state;
  }
};

export default rootReducer;
