import axios from "axios";

import {
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_FILTER_FAIL,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/data/");

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.respose.data.message
          : error.message,
    });
  }
};

export const addProducts = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const newProduct = { user: userInfo._id, ...product };
    const { data } = await axios.post("/api/data/", newProduct);

    dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.respose.data.message
          : error.message,
    });
  }
};
export const deleteProducts = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    if (userInfo.isAdmin) {
      const { data } = await axios.delete(`/api/data/${id}`);

      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
    } else {
      throw Error("No Authorisation");
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.respose.data.message
          : error.message,
    });
  }
};

export const listProductsFilter = (cuisine, category) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_FILTER_REQUEST });
    let totalData;
    let url = "/api/data/filter/?";
    category.forEach((item) => {
      url = url + "category=" + item + "&";
    });
    cuisine.forEach((item) => {
      url = url + "cuisine=" + item + "&";
    });
    if (url !== "/api/data/filter/?") {
      const { data } = await axios.get(url);
      totalData = data;
    } else {
      const { data } = await axios.get("/api/data/");
      totalData = data;
    }

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: totalData });
  } catch (error) {
    dispatch({
      type: PRODUCT_FILTER_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.respose.data.message
          : error.message,
    });
  }
};
