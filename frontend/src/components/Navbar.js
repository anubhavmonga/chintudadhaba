import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../images/logo-white.png";

export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // const qty = cartItem.length;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const location = useLocation();
  const activeWebsite = location.pathname.split("/")[1];
  let isHomeActive,
    isMenuActive,
    isServicesActive,
    isAboutUsActive,
    isCartActive,
    isLoginActive;
  switch (activeWebsite) {
    case "/home":
      isHomeActive = true;
      isMenuActive = false;
      isServicesActive = false;
      isAboutUsActive = false;
      isCartActive = false;
      isLoginActive = false;
      break;
    case "menu":
      isHomeActive = false;
      isMenuActive = true;
      isServicesActive = false;
      isAboutUsActive = false;
      isCartActive = false;
      isLoginActive = false;
      break;
    case "services":
      isHomeActive = false;
      isMenuActive = false;
      isServicesActive = true;
      isAboutUsActive = false;
      isCartActive = false;
      isLoginActive = false;
      break;
    case "about":
      isHomeActive = false;
      isMenuActive = false;
      isServicesActive = false;
      isAboutUsActive = true;
      isCartActive = false;
      isLoginActive = false;
      break;
    case "cart":
      isHomeActive = false;
      isMenuActive = false;
      isServicesActive = false;
      isAboutUsActive = false;
      isCartActive = true;
      isLoginActive = false;
      break;
    case "login":
      isHomeActive = false;
      isMenuActive = false;
      isServicesActive = false;
      isAboutUsActive = false;
      isCartActive = false;
      isLoginActive = true;
      break;
    case "signup":
      isHomeActive = false;
      isMenuActive = false;
      isServicesActive = false;
      isAboutUsActive = false;
      isCartActive = false;
      isLoginActive = true;
      break;
    case "userpage":
      isHomeActive = false;
      isMenuActive = false;
      isServicesActive = false;
      isAboutUsActive = false;
      isCartActive = false;
      isLoginActive = true;
      break;

    case "adminpage":
      isHomeActive = false;
      isMenuActive = false;
      isServicesActive = false;
      isAboutUsActive = false;
      isCartActive = false;
      isLoginActive = true;
      break;

    default:
      isHomeActive = false;
      isMenuActive = false;
      isServicesActive = false;
      isAboutUsActive = false;
      isCartActive = false;
      isLoginActive = false;
      break;
  }
  return (
    <nav>
      <div className="nav-name">
        <a href="/">
          <img src={logo} alt="logo" className="logo" />
        </a>
      </div>
      <div className="links">
        <Link to="/">
          <button className={`nav-btn ${isHomeActive ? " active-site" : " "}`}>
            Home
          </button>
        </Link>
        <Link to="/menu">
          <button className={`nav-btn ${isMenuActive ? " active-site" : " "}`}>
            Menu
          </button>
        </Link>
        <Link to="/services">
          <button
            className={`nav-btn ${isServicesActive ? " active-site" : " "}`}
          >
            Services
          </button>
        </Link>
        <Link to="/about">
          <button
            className={`nav-btn ${isAboutUsActive ? " active-site" : " "}`}
          >
            AboutUs
          </button>
        </Link>
        <Link to="/cart">
          <button
            className={`nav-btn ${isCartActive ? " active-site" : " "} ${
              cartItems.length > 0 ? " nav-cart" : " "
            }`}
          >
            <i className="fas fa-shopping-cart"></i>
            {cartItems.length > 0 && (
              <sup>
                <span className="badge">{cartItems.length}</span>
              </sup>
            )}
          </button>
        </Link>
        {!userInfo ? (
          <Link to="/login">
            <button
              className={`nav-btn ${isLoginActive ? " active-site" : " "}`}
            >
              Login
            </button>
          </Link>
        ) : (
          <Link to="/userpage">
            <button
              className={`nav-btn ${isLoginActive ? " active-site" : " "}`}
            >
              {userInfo.name.split(" ")[0]}
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
