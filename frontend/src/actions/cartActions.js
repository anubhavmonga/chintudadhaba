import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart =
  (id, qty = 1) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/data/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.img,
        price: data.price,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
export const removeFromCart =
  (id, qty = 1) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/data/${id}`);
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.img,
        price: data.price,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
