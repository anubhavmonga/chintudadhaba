import React from "react";

function OrderCartItem({ name, count, price, _id }) {
  return (
    <div
      className="cart-item"
      style={{ marginLeft: "1rem", marginRight: "1rem" }}
    >
      <div className="cart-name">{name}</div>x
      <div className="cart-item-qty">
        <div className="item-count" style={{ border: 0 }}>
          {count}
        </div>
      </div>
      =<div className="cart-item-total">₹{price * count}</div>
    </div>
  );
}

export default OrderCartItem;
