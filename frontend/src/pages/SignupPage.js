import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

function SignupPage() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const phone1 = phone.toString();
    if (password !== confirmPassword) {
      setMessage("Passwords Do not Match");
    } else if (phone1.length !== 10) {
      setMessage("Phone Num not of appropriate size");
    } else {
      dispatch(register(name, email, password, address, phone));
      setMessage(null);
    }
  };
  return (
    <div className="login-page">
      <div className="signup-page-container">
        {message && <h1>{message}</h1>}
        <div>
          <form onSubmit={submitHandler}>
            <div className="name-container">
              <label>Name</label>
              <input
                type="text"
                name="name"
                align="middle"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="phone-container">
              <label>Phone Number</label>
              <input
                type="number"
                name="phone"
                align="middle"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="address-container">
              <label>Address</label>
              <input
                type="text"
                name="email"
                align="middle"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="email-container">
              <label>Email</label>
              <input
                type="email"
                name="email"
                align="middle"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password-container">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="password-container">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="login-submit">Sign Up</button>
            <div className="login-signup">
              Have An Account,
              <span>
                <Link
                  to="/login"
                  className="login-signup-btn"
                  style={{ color: "#3e8e41" }}
                >
                  Log In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
