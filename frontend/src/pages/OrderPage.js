import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import { findTable } from "../actions/tableActions";
import { ORDER_DETAILS_RESET } from "../constants/orderConstants";
import OrderCartItem from "../components/OrderCartItem";
import SafetySeal from "../images/safety_seal_update.png";

const OrderPage = () => {
  const [date, setDate] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(true);
  const [success, setSuccess] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading } = orderDetails;

  useEffect(() => {
    return () => dispatch({ type: ORDER_DETAILS_RESET });
  }, [dispatch]);
  useEffect(() => {
    if (!order) {
      dispatch(getOrderDetails(id));
    } else {
      const date = new Date(order.createdAt);
      const [month, day, year] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
      ];
      setDate(`${day}-${month + 1}-${year}`);
      if (order.orderWay === "dinein") dispatch(findTable(order.tableReserved));
      setLoadingState(false);
    }
    if (success) {
      setSuccess(false);
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  }, [id, order, dispatch, success]);
  const tableFind = useSelector((state) => state.tableFind);
  const { table } = tableFind;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    !loadingState && (
      <div className="main-place-order">
        {loading ? (
          "Loading..."
        ) : (
          <>
            <div className="place-order-cart-items">
              {order.orderItems.map((item) => {
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
            <div
              className="place-order-method"
              style={{
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={SafetySeal}
                alt="Covid Safe"
                style={{ height: "18rem" }}
              />
            </div>
            <div className="place-order-price-total">
              <div className="order-side-bar-intial">
                <div className="place-order-price-total-final">
                  Order ID :
                  <span style={{ marginLeft: "1.5rem" }}>{order._id}</span>
                </div>
                <div className="place-order-price-total-final">
                  Date :<span style={{ marginLeft: "1.5rem" }}>{date}</span>
                </div>
                <div className="place-order-price-total-final">
                  Total Price :
                  <span style={{ marginLeft: "1.5rem" }}>
                    ₹{order.totalPrice}
                  </span>
                </div>
                <div className="place-order-price-total-final">
                  Order Type :
                  <span style={{ marginLeft: "1.5rem" }}>
                    {order.orderWay.charAt(0).toUpperCase() +
                      order.orderWay.slice(1).toLowerCase()}
                  </span>
                </div>
                {order.orderWay === "dinein" ? (
                  <div className="place-order-price-total-final">
                    Table Reserved :
                    <span style={{ marginLeft: "1.5rem" }}>{table.name}</span>
                  </div>
                ) : (
                  ""
                )}
                <div className="place-order-price-total-final">
                  Shipping Address :
                  <span style={{ marginLeft: "1.5rem" }}>{order.address}</span>
                </div>
                <div className="place-order-price-total-final">
                  Payment Method :
                  <span style={{ marginLeft: "1.5rem" }}>
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="place-order-price-total-final">
                  Payment Status :
                  <span style={{ marginLeft: "1.5rem" }}>
                    {order.isPaid ? "Complete" : "In Progress"}
                  </span>
                </div>
                <div className="place-order-price-total-final">
                  Delivery Status :
                  <span style={{ marginLeft: "1.5rem" }}>
                    {order.isDelivered ? "Complete" : "In Progress"}
                  </span>
                </div>
                {console.log(userInfo.isAdmin)}
                {userInfo.isAdmin && !order.isPaid ? (
                  <div style={{ marginTop: "1rem" }}>
                    <button
                      style={{
                        display: "block",
                        width: "100%",
                        height: "2rem",
                        fontSize: "large",
                      }}
                      onClick={() => {
                        dispatch(payOrder(order._id));
                        setSuccess(true);
                      }}
                    >
                      Paid
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {userInfo.isAdmin && !order.isDelivered ? (
                  <div style={{ marginTop: "1rem" }}>
                    <button
                      style={{
                        display: "block",
                        width: "100%",
                        height: "2rem",
                        fontSize: "large",
                      }}
                      onClick={() => {
                        dispatch(deliverOrder(order._id));
                        setSuccess(true);
                      }}
                    >
                      Delivered
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
        ;
      </div>
    )
  );
};

export default OrderPage;
