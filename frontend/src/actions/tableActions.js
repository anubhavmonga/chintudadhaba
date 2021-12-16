import axios from "axios";

import {
  TABLE_FIND_FAIL,
  TABLE_FIND_REQUEST,
  TABLE_FIND_SUCCESS,
  TABLE_LIST_ALL_FAIL,
  TABLE_LIST_ALL_REQUEST,
  TABLE_LIST_ALL_RESET,
  TABLE_LIST_ALL_SUCCESS,
  TABLE_LIST_FAIL,
  TABLE_LIST_REQUEST,
  TABLE_LIST_SUCCESS,
  TABLE_REMOVE_FAIL,
  TABLE_REMOVE_REQUEST,
  TABLE_REMOVE_SUCCESS,
  TABLE_UPDATE_FAIL,
  TABLE_UPDATE_REQUEST,
  TABLE_UPDATE_SUCCESS,
} from "../constants/tableConstants";

export const listTables = () => async (dispatch) => {
  try {
    dispatch({ type: TABLE_LIST_REQUEST });

    const { data } = await axios.get("/api/tables/");

    dispatch({ type: TABLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TABLE_LIST_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.respose.data.message
          : error.message,
    });
  }
};
export const listTablesAll = () => async (dispatch) => {
  try {
    dispatch({ type: TABLE_LIST_ALL_REQUEST });

    const { data } = await axios.get("/api/tables/all/");

    dispatch({ type: TABLE_LIST_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TABLE_LIST_ALL_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.respose.data.message
          : error.message,
    });
  }
};
export const findTable = (id) => async (dispatch) => {
  try {
    dispatch({ type: TABLE_FIND_REQUEST });

    const { data } = await axios.get(`/api/tables/${id}`);

    dispatch({ type: TABLE_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TABLE_FIND_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.respose.data.message
          : error.message,
    });
  }
};
export const updateTables = (table) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TABLE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/tables`, table, config);
    dispatch({
      type: TABLE_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: TABLE_LIST_ALL_RESET });
  } catch (error) {
    dispatch({
      type: TABLE_UPDATE_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.respose.data.message
          : error.message,
    });
  }
};
export const removeTables = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TABLE_REMOVE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    if (userInfo.isAdmin) {
      const { data } = await axios.put(`/api/tables/remove/${id}`);
      dispatch({
        type: TABLE_REMOVE_SUCCESS,
        payload: data,
      });
    } else {
      throw Error("Not Authorised");
    }
  } catch (error) {
    dispatch({
      type: TABLE_REMOVE_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.respose.data.message
          : error.message,
    });
  }
};
