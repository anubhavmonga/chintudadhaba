import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";

function Cart() {
  const cart1 = useSelector((state) => state.cart);
  const { cartItems } = cart1;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div className="main-cart">
      {cartItems.length > 0 ? (
        <section className="cart-section">
          {cartItems.map((item) => {
            return (
              <CartItem
                name={item.name}
                price={item.price}
                count={item.qty}
                key={item.product}
                _id={item.product}
              />
            );
          })}

          <div className="cart-total">
            <div className="main-cart-total">
              <div className="total">
                Total Items:{" "}
                <span className="cart-total-items">{cartItems.length}</span>
              </div>
              <div className="total-price">
                Total Cost:{" "}
                <span className="cart-total-price">₹{itemsPrice}</span>
              </div>
            </div>
          </div>
          {userInfo ? (
            <Link to="/placeorder">
              <button className="checkout-btn" onClick>
                Checkout
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="checkout-btn" onClick>
                Login
              </button>
            </Link>
          )}
        </section>
      ) : (
        <div className="cart-empty">
          <div className="cart-empty-heading">Cart is Empty</div>
          <div className="cart-empty-desc">
            Looks Like Cart Is empty Add some of the best meals from the menu
          </div>
          <Link to="/menu" className="cart-empty-btn">
            Go To Menu
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
