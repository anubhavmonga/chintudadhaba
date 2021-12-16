import {
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_FILTER_FAIL,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_RESET:
      return { products: [] };
    default:
      return state;
  }
};

export const productAddReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_ADD_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productFilterReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_FILTER_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_FILTER_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
