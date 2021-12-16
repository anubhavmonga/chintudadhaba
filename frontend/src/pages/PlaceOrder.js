import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector, useDispatch } from "react-redux";
import OrderCartItem from "../components/OrderCartItem";
import { createOrder, payOrder } from "../actions/orderActions";
import { useHistory } from "react-router-dom";
import { listTables, updateTables } from "../actions/tableActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

function PlaceOrder() {
  const [successPayState, setSuccessPayState] = useState(false);
  const [paymentResult1, setPaymentResult1] = useState({ test: "test" });
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);
  useEffect(() => {
    dispatch(listTables());
  }, [dispatch]);

  const history = useHistory();

  const [orderMethod, setOrderMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedTableName, setSelectedTableName] = useState("");

  const cart1 = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const tableList = useSelector((state) => state.tableList);
  const { tables } = tableList;
  const { userInfo } = userLogin;
  const { cartItems } = cart1;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  let userAddress = userInfo.address;
  userAddress = userAddress.split(",").join(",<br/>");
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;
  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  useEffect(() => {
    if (successPay) {
      setSuccessPayState(true);
    }
    if (success && successPayState) {
      history.push(`/orderpage/${order._id}`);
      localStorage.removeItem("cartItems");
      window.location.reload();
    }
    if (success) {
      successPaymentHandler(paymentResult1, order);
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (paymentMethod === "PayPal") {
      addPayPalScript();
    }
    // eslint-disable-next-line
  }, [
    history,
    success,
    paymentMethod,
    order,
    successPayState,
    paymentResult1,
    successPay,
  ]);

  const handleClick = (paymentResult) => {
    setPaymentResult1({ ...paymentResult });
    if (orderMethod.length > 0 && paymentMethod.length > 0) {
      if (paymentMethod === "PayPal") {
        if (orderMethod === "dinein") {
          dispatch(
            createOrder({
              orderItems: cartItems,
              address: "SCO 1 & 2, Sector 5, Panchkula, Haryana 134108",
              paymentMethod: paymentMethod,
              itemsPrice: itemsPrice,
              totalPrice: itemsPrice,
              orderWay: orderMethod,
              tableReserved: selectedTableName,
            })
          );
          dispatch(
            updateTables({
              name: selectedTableName,
              userName: userInfo.name,
            })
          );
        } else {
          dispatch(
            createOrder({
              orderItems: cartItems,
              address:
                orderMethod === "delivery"
                  ? userInfo.address
                  : "SCO 1 & 2, Sector 5, Panchkula, Haryana 134108",
              paymentMethod: paymentMethod,
              itemsPrice: itemsPrice,
              totalPrice: itemsPrice,
              orderWay: orderMethod,
              tableReserved: null,
            })
          );
        }
      } else {
        if (orderMethod === "dinein") {
          dispatch(
            createOrder({
              orderItems: cartItems,
              address: "SCO 1 & 2, Sector 5, Panchkula, Haryana 134108",
              paymentMethod: paymentMethod,
              itemsPrice: itemsPrice,
              totalPrice: itemsPrice,
              orderWay: orderMethod,
              tableReserved: selectedTableName,
            })
          );
          dispatch(
            updateTables({
              name: selectedTableName,
              userName: userInfo.name,
            })
          );
        } else {
          dispatch(
            createOrder({
              orderItems: cartItems,
              address:
                orderMethod === "delivery"
                  ? userInfo.address
                  : "SCO 1 & 2, Sector 5, Panchkula, Haryana 134108",
              paymentMethod: paymentMethod,
              itemsPrice: itemsPrice,
              totalPrice: itemsPrice,
              orderWay: orderMethod,
              tableReserved: null,
            })
          );
        }
        setSuccessPayState(true);
      }
    }
  };

  const successPaymentHandler = (paymentResult, order) => {
    dispatch(payOrder(order._id, paymentResult));

    dispatch({ type: ORDER_PAY_RESET });
    setSuccessPayState(true);
  };

  return (
    <div className="main-place-order">
      <div className="place-order-cart-items">
        {cartItems.map((item) => {
          return (
            <OrderCartItem
              name={item.name}
              price={item.price}
              count={item.qty}
              key={item.product}
              _id={item.product}
            />
          );
        })}
      </div>
      <div className="place-order-method">
        <div className="order-method-heading">Method Of Order</div>
        <div className="order-methods">
          <span className="order-method">
            <label htmlFor="dinein">Dine In: </label>
            <input
              type="radio"
              name="ordermethod"
              id="dinein"
              onChange={() => setOrderMethod("dinein")}
            />
          </span>
          <span className="order-method">
            <label htmlFor="takeaway">Takeaway: </label>
            <input
              type="radio"
              name="ordermethod"
              id="takeaway"
              onChange={() => setOrderMethod("takeaway")}
            />
          </span>
          <span className="order-method">
            <label htmlFor="delivery">Delivery: </label>
            <input
              type="radio"
              name="ordermethod"
              id="delivery"
              onChange={() => setOrderMethod("delivery")}
            />
          </span>
        </div>
        {orderMethod === "delivery" ? (
          <div className="order-method-body">
            To Address:
            <br />
            <br />
            <div dangerouslySetInnerHTML={{ __html: userAddress }} />
          </div>
        ) : orderMethod === "dinein" ? (
          <div className="order-method-body">
            {tables.map((table) => {
              return (
                <div key={table._id}>
                  <label htmlFor={table._id} style={{ cursor: "pointer" }}>
                    {table.name}
                  </label>
                  <input
                    id={table._id}
                    type="radio"
                    name="tablenum"
                    value={table.name}
                    onChange={(e) => {
                      setSelectedTableName(e.target.value);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              );
            })}
          </div>
        ) : orderMethod === "takeaway" ? (
          <div className="order-method-body">
            From Address: <br />
            <br />
            SCO 1 & 2,
            <br />
            Sector 5,
            <br />
            Panchkula,
            <br />
            Haryana 134108
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="place-order-price-total">
        <div className="order-side-bar-intial">
          <div className="place-order-price-total-final">
            Date :
            <span style={{ marginLeft: "1.5rem" }}>
              {`${day}-${month + 1}-${year}`}
            </span>
          </div>
          <div className="place-order-price-total-final">
            Total Price :
            <span style={{ marginLeft: "1.5rem" }}>₹{itemsPrice}</span>
          </div>
          <div className="place-order-price-total-final">
            Order Type :
            <span style={{ marginLeft: "1.5rem" }}>
              {orderMethod.charAt(0).toUpperCase() +
                orderMethod.slice(1).toLowerCase()}
            </span>
          </div>
          {orderMethod === "dinein" ? (
            <div className="place-order-price-total-final">
              Table :
              <span style={{ marginLeft: "1.5rem" }}>
                {selectedTableName.charAt(0).toUpperCase() +
                  selectedTableName.slice(1).toLowerCase()}
              </span>
            </div>
          ) : (
            ""
          )}
          <div className="place-order-price-total-final">
            Payment Method :
            <span style={{ marginLeft: "1.5rem" }}>{paymentMethod}</span>
          </div>
        </div>
        {orderMethod.length > 0 ? (
          <>
            <h3 className="payment-method-heading">Payment Method</h3>
            <div className="payment-methods">
              <div>
                <label htmlFor="paypalOpt">PayPal</label>
                <input
                  type="radio"
                  value="PayPal"
                  name="payment-method"
                  id="paypalOpt"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <label htmlFor="cash">Cash</label>
                <input
                  type="radio"
                  value="Cash"
                  name="payment-method"
                  id="cash"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              {paymentMethod !== "PayPal" ? (
                <button className="place-order-button" onClick={handleClick}>
                  Checkout
                </button>
              ) : !sdkReady ? (
                "loading"
              ) : (
                <PayPalButton amount={itemsPrice} onSuccess={handleClick} />
              )}
            </div>
          </>
        ) : (
          <h3 className="payment-method-heading">Select Method Of Order</h3>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;
