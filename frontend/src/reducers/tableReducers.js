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

export const tableListReducer = (state = { tables: [] }, action) => {
  switch (action.type) {
    case TABLE_LIST_REQUEST:
      return { loading: true, tables: [] };
    case TABLE_LIST_SUCCESS:
      return { loading: false, tables: action.payload };
    case TABLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const tableListAllReducer = (state = { tables: [] }, action) => {
  switch (action.type) {
    case TABLE_LIST_ALL_REQUEST:
      return { loading: true, tables: [] };
    case TABLE_LIST_ALL_SUCCESS:
      return { loading: false, tables: action.payload };
    case TABLE_LIST_ALL_FAIL:
      return { loading: false, error: action.payload };
    case TABLE_LIST_ALL_RESET:
      return {};
    default:
      return state;
  }
};
export const tableFindReducer = (state = { table: {} }, action) => {
  switch (action.type) {
    case TABLE_FIND_REQUEST:
      return { ...state, loading: true };
    case TABLE_FIND_SUCCESS:
      return { loading: false, table: action.payload };
    case TABLE_FIND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const tableUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_UPDATE_REQUEST:
      return { loading: true, tables: [] };
    case TABLE_UPDATE_SUCCESS:
      return { loading: false, tables: action.payload };
    case TABLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const tableRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_REMOVE_REQUEST:
      return { loading: true, tables: [] };
    case TABLE_REMOVE_SUCCESS:
      return { loading: false, tables: action.payload };
    case TABLE_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
