import React, { useEffect } from "react";
import FilterSection from "../components/FilterSection";
import MenuItem from "../components/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function Menu({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const cart1 = useSelector((state) => state.cart);
  const { cartItems } = cart1;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <main className="main-menu">
      <FilterSection />
      <div className="dish-section">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          products.map((item) => {
            item = { ...item, inCart: false, qty: 0 };
            cartItems.forEach((element) => {
              if (element.product === item._id) {
                item.inCart = true;
                item.qty = element.qty;
              }
            });
            return (
              <MenuItem
                menuItem={item}
                key={item._id}
                history={history}
                inCart={item.inCart}
                count={item.qty}
              />
            );
          })
        )}
      </div>
    </main>
  );
}
