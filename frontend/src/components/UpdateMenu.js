import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  addProducts,
  deleteProducts,
} from "../actions/productActions";
import { PRODUCT_LIST_RESET } from "../constants/productConstants";
function UpdateMenu() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [img, setImg] = useState("");
  const [type, setType] = useState("");
  const [cuisine, setCuisine] = useState("Italian");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (products.length === 0 || success) {
      dispatch({ type: PRODUCT_LIST_RESET });
      dispatch(listProducts());
      setSuccess(false);
    }
  }, [dispatch, success, products.length]);
  const handleCuisineChange = (e) => {
    setCuisine(e.target.value);
  };
  const handleClick = () => {
    if (name && price && img && type && cuisine) {
      console.log("Radha");
      dispatch(
        addProducts({
          name: name,
          price: price,
          img: img,
          category: type,
          cuisine: cuisine,
        })
      );
      setCuisine("");
      setImg("");
      setName("");
      setPrice("");
      setType("");
      setMessage("Updated");

      setSuccess(true);
    } else {
      setMessage("Error", error);
    }
  };
  const handleDelete = (id) => {
    dispatch(deleteProducts(id));
    setSuccess(true);
  };
  return (
    <div className="admin-update-menu">
      <div>{message}</div>
      <div className="add-update-menu">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          ₹
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="img">Image Source:</label>
          <input
            type="text"
            name="img"
            id="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div>
          <label>Type:</label>
          <label htmlFor="veg">Veg:</label>
          <input
            type="radio"
            name="type"
            value="veg"
            id="veg"
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="nonveg">Non Veg:</label>
          <input
            type="radio"
            name="type"
            value="nonveg"
            id="nonveg"
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <label>Cuisine: </label>
          <select value={cuisine} onChange={handleCuisineChange}>
            <option name="cuisine" value="Italian">
              Italian
            </option>
            <option name="cuisine" value="Indian">
              Indian
            </option>
            <option name="cuisine" value="Chinese">
              Chinese
            </option>
            <option name="cuisine" value="Bread">
              Bread
            </option>
            <option name="cuisine" value="Beverages">
              Beverages
            </option>
          </select>
        </div>
        <div>
          <button onClick={handleClick}>Add To Menu</button>
        </div>
      </div>
      <div className="update-menu-heading" style={{ marginTop: "0.5rem" }}>
        <div>Sr. No.</div>
        <div>Name</div>
        <div>Price</div>
        <div>Type</div>
        <div>Cuisine</div>
        <div>Action</div>
      </div>
      <div className="update-menu-list" style={{ marginTop: "0.5rem" }}>
        {!loading
          ? products.map((item, index) => {
              return (
                <React.Fragment key={item._id}>
                  <div>{index + 1}</div>
                  <div>{item.name}</div>
                  <div>₹{item.price}</div>
                  <div>{item.category}</div>
                  <div>{item.cuisine}</div>
                  <div>
                    <button onClick={() => handleDelete(item._id)}>
                      delete
                    </button>
                  </div>
                </React.Fragment>
              );
            })
          : "loading..."}
      </div>
    </div>
  );
}

export default UpdateMenu;
