import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listAllOrders } from "../actions/orderActions";
function PastOrders() {
  const dispatch = useDispatch();
  const orderListAll = useSelector((state) => state.orderListAll);
  const { orders } = orderListAll;
  const [newOrders, setNewOrders] = useState([]);
  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(listAllOrders());
    }
    if (orders) {
      setNewOrders(orders.reverse());
    }
  }, [dispatch, orders]);
  return (
    <section
      className="admin-past-orders"
      style={{ maxHeight: "100%", maxWidth: "100%", marginLeft: "2.5rem" }}
    >
      <div className="userpage-order-sr">Sr. No.</div>
      <div className="userpage-order-id">Order Id</div>
      <div className="userpage-order-id">Date[DD-MM-YYYY]</div>
      <div className="userpage-order-status">Order Status</div>
      {newOrders.length > 0
        ? orders.map((item, index) => {
            let abc = new Date(item.createdAt);
            const [month, day, year] = [
              abc.getMonth(),
              abc.getDate(),
              abc.getFullYear(),
            ];
            return (
              <React.Fragment key={item._id}>
                <div className="order-entry1">{index + 1}</div>
                <Link
                  target="_blank"
                  className="order-entry1"
                  to={`/orderpage/${item._id}`}
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                  }}
                >
                  {item._id}
                </Link>
                <div className="order-entry1">{`${day}-${
                  month + 1
                }-${year}`}</div>
                <div className="order-entry1">
                  {item.isDelivered ? "Delivered" : "In Progress"}
                </div>
              </React.Fragment>
            );
          })
        : "Loading...."}
    </section>
  );
}

export default PastOrders;
