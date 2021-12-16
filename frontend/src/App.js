import React from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Cart from "./pages/Cart";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import PlaceOrder from "./pages/PlaceOrder";
import OrderPage from "./pages/OrderPage";
import {
  useHistory,
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import { useSelector } from "react-redux";
import Services from "./pages/Services";

function App() {
  let history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/menu">
            <Menu history={history} />
          </Route>

          <Route path="/about">
            <About />
          </Route>
          <Route path="/about/:id">
            <About />
          </Route>
          {console.log()}
          <Route path="/userpage">
            {userInfo ? (
              !userInfo.isAdmin ? (
                <UserPage />
              ) : (
                <Redirect to="/adminpage" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/adminpage">
            {userInfo ? (
              !userInfo.isAdmin ? (
                <Redirect to="/userpage" />
              ) : (
                <AdminPage />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/login" history={history}>
            <LoginPage />
          </Route>

          <Route path="/signup">
            <SignupPage />
          </Route>

          <Route path="/services">
            <Services />
          </Route>
          <Route path="/placeorder">
            <PlaceOrder />
          </Route>
          <Route path="/orderpage/:id" component={OrderPage} />

          {/* <Route path="*">
            <Error />
          </Route> */}
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
