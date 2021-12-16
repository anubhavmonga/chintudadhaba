import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  if (action.type === CART_ADD_ITEM) {
    const item = action.payload;
    const existItem = state.cartItems.find((x) => x.product === item.product);
    if (existItem) {
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.product === item.product
            ? { ...existItem, qty: existItem.qty + 1 }
            : x
        ),
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }
  } else if (action.type === CART_REMOVE_ITEM) {
    const item = action.payload;
    const existItem = state.cartItems.find((x) => x.product === item.product);
    if (existItem.qty === 1)
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload.product
        ),
      };
    else {
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.product === item.product
            ? { ...existItem, qty: existItem.qty - 1 }
            : x
        ),
      };
    }
  } else {
    return state;
  }
};
