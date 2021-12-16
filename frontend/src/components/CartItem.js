import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartItem({ name, count, price, _id }) {
  const dispatch = useDispatch();
  return (
    <div className="cart-item">
      <div className="cart-name">{name}</div>
      <div className="cart-item-qty">
        <button
          className="cart-decrease"
          onClick={() => dispatch(removeFromCart(_id))}
        >
          <i className="fas fa-minus"></i>
        </button>
        <div className="item-count">{count} </div>
        <button
          className="cart-increase"
          onClick={() => dispatch(addToCart(_id))}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="cart-price">₹{price}</div>
      <div className="cart-item-total">₹{price * count}</div>
    </div>
  );
}

export default CartItem;
