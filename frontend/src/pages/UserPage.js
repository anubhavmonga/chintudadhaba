import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  logout,
  getUserDetails,
  updateUserProfile,
} from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
export default function UserPage() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders } = orderListMy;
  const [newOrders, setNewOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listMyOrders());

      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address);
        setPhone(user.phone);
      }
    }
    // eslint-disable-next-line
  }, [history, userInfo, dispatch, user, success]);

  useEffect(() => {
    if (orders) {
      let test;
      if (test !== orders.reverse()) {
        test = orders.reverse();
        setNewOrders(test);
      }
    }
  }, [orders]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords Do Not Match");
    } else if (phone.length !== 10) {
      setMessage("Phone Number incorrect");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
          address,
          phone,
        })
      );
      setPassword("");
      setPhone("");
      setAddress("");
      setConfirmPassword("");
      setMessage("Updated");
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="main-userpage">
      {!loading ? (
        <>
          <div style={{ background: "var(--bs-red)", color: "black" }}>
            {message}
          </div>
          <div className="userpage-heading">{`Hello, ${userInfo.name}`}</div>
          <div className="userpage-body">
            <div className="userpage-past-order">
              <span className="recent-orders">Recent Orders</span>
              <section>
                <div className="userpage-order-sr">Sr. No.</div>
                <div className="userpage-order-id">Order Id</div>
                <div className="userpage-order-status">Order Status</div>
                {newOrders
                  ? newOrders.map((item, index) => {
                      return (
                        <>
                          <div className="order-entry1">{index + 1}</div>
                          <Link
                            className="order-entry1"
                            to={`/orderpage/${item._id}`}
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                            }}
                          >
                            {item._id}
                          </Link>
                          <div className="order-entry1">
                            {item.isDelivered ? "Delivered" : "In Progress"}
                          </div>
                        </>
                      );
                    })
                  : "Loading...."}
              </section>
            </div>
            <div className="userpage-update-info">
              <form className="userpage-form" onSubmit={submitHandler}>
                <label>Name: </label> <br />
                <input
                  type="text"
                  name="name"
                  align="middle"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br /> <br />
                <label>Email: </label> <br />
                <input
                  type="email"
                  name="email"
                  align="middle"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
                <br /> <br />
                <label>Phone Number:</label> <br />
                <input
                  type="number"
                  name="phone"
                  align="middle"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <br /> <br />
                <label>Address:</label> <br />
                <input
                  type="text"
                  name="email"
                  align="middle"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <br /> <br />
                <label>Password:</label> <br />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br /> <br />
                <label>Confirm Password:</label> <br />
                <input
                  type="password"
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br /> <br />
                <button>Update</button>
              </form>
            </div>
            <div className="userpage-logout">
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        </>
      ) : (
        "loading"
      )}
    </div>
  );
}
