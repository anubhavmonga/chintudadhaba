import React from "react";

import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

const MenuItem = ({ menuItem, inCart, count }) => {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <img src={menuItem.img} alt="Avatar" />
      <div className="container">
        <center>
          <h2 className="dish-name">
            <b>{menuItem.name}</b>
          </h2>
          <p className="dish-price">₹{menuItem.price}</p>
          <div className="dish-buttons">
            <button
              className={`dish-addtocart ${!inCart ? " " : " hidden"}`}
              onClick={() => dispatch(addToCart(menuItem._id))}
            >
              Add to cart
            </button>

            <button
              className={`dish-increase ${inCart ? " " : " hidden"}`}
              onClick={() => dispatch(addToCart(menuItem._id))}
            >
              <i className="fas fa-plus"></i>
            </button>
            <div className={`dish-count ${inCart ? " " : "hidden"}`}>
              {count}
            </div>
            <button
              className={`dish-decrease ${inCart ? " " : " hidden"}`}
              onClick={() => dispatch(removeFromCart(menuItem._id))}
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default MenuItem;
