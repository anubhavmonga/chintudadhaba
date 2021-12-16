import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../actions/userActions";

function UpdatePassword() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords Do Not Match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          password,
        })
      );
      setPassword("");
      setConfirmPassword("");
      setMessage("Updated");
    }
  };

  return (
    <div>
      {message.length > 0 && (
        <div style={{ background: "var(--bs-red)", color: "black" }}>
          {message}
        </div>
      )}
      <form className="userpage-form" onSubmit={submitHandler}>
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
  );
}

export default UpdatePassword;
