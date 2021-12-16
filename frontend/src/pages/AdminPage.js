import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import {
  useLocation,
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from "react-router-dom";
import UpdatePassword from "../components/UpdatePassword";
import PastOrders from "../components/PastOrders";
import UpdateMenu from "../components/UpdateMenu";
import ManageTables from "../components/ManageTables";
function AdminPage() {
  const location = useLocation();
  const activeWebsite = location.pathname.split("adminpage")[1];
  const [isRecentOrder, setIsRecentOrder] = useState(
    activeWebsite === "" || activeWebsite === "/" ? true : false
  );
  const [isUpdatePassword, setIsUpdatePassword] = useState(
    activeWebsite === "/updatepassword" ? true : false
  );
  const [isUpdateMenu, setIsUpdateMenu] = useState(
    activeWebsite === "/updatemenu" ? true : false
  );
  const [isManageTable, setIsManageTable] = useState(
    activeWebsite === "/managetables" ? true : false
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading } = userLogin;

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Router>
      <div className="main-userpage" style={{ color: "black" }}>
        {!loading ? (
          <>
            <div className="userpage-heading">{`Hello, ${userInfo.name}`}</div>
            <div className="admin-mini-nav">
              <Link
                to="/adminpage/"
                style={{ color: "black" }}
                className={isRecentOrder ? "selected-a" : ""}
                onClick={() => {
                  setIsRecentOrder(true);

                  setIsManageTable(false);
                  setIsUpdateMenu(false);
                  setIsUpdatePassword(false);
                }}
              >
                Recent Orders
              </Link>
              <Link
                to="/adminpage/updatepassword"
                style={{ color: "black" }}
                className={isUpdatePassword ? "selected-b" : ""}
                onClick={() => {
                  setIsRecentOrder(false);

                  setIsManageTable(false);
                  setIsUpdateMenu(false);
                  setIsUpdatePassword(true);
                }}
              >
                Update Password
              </Link>
              <Link
                to="/adminpage/updatemenu"
                style={{ color: "black" }}
                className={isUpdateMenu ? "selected-a" : ""}
                onClick={() => {
                  setIsRecentOrder(false);

                  setIsManageTable(false);
                  setIsUpdateMenu(true);
                  setIsUpdatePassword(false);
                }}
              >
                Update Menu
              </Link>
              <Link
                to="/adminpage/managetables"
                style={{ color: "black" }}
                className={isManageTable ? "selected-c" : ""}
                onClick={() => {
                  setIsRecentOrder(false);
                  setIsManageTable(true);
                  setIsUpdateMenu(false);
                  setIsUpdatePassword(false);
                }}
              >
                Manage Tables
              </Link>
            </div>
            <div className="admin-switch-area">
              <Switch>
                <Route exact path="/adminpage">
                  <PastOrders />
                </Route>
                <Route exact path="/adminpage/updatepassword">
                  <UpdatePassword />
                </Route>
                <Route exact path="/adminpage/updatemenu">
                  <UpdateMenu />
                </Route>
                <Route exact path="/adminpage/managetables">
                  <ManageTables />
                </Route>
              </Switch>
            </div>
            <div
              className="userpage-logout"
              style={{ margin: "0", marginTop: "2rem" }}
            >
              <button onClick={logoutHandler} style={{ width: "100%" }}>
                Logout
              </button>
            </div>
          </>
        ) : (
          "loading"
        )}
      </div>
    </Router>
  );
}

export default AdminPage;
